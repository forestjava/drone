import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';
import { DroneState } from '../hooks/useDroneState';

interface DroneViewerProps {
  droneState: DroneState;
}

export default function DroneViewer({ droneState }: DroneViewerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [droneModel, setDroneModel] = useState<THREE.Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Current rotation states for smooth interpolation
  const currentRotation = useRef({
    yaw: 0,
    pitch: 0,
    roll: 0
  });

  // Load the FBX model
  useEffect(() => {
    const loader = new FBXLoader();
    
    // Try to load the battle drone model
    const modelPaths = [
      '/models/battle_drone.fbx',
      '/attached_assets/uploads_files_3654680_Battle+Drone_1754177328485.fbx',
      '/attached_assets/uploads_files_3654680_Battle+Drone_1754177504862.fbx'
    ];

    const loadModel = async (paths: string[]) => {
      for (const path of paths) {
        try {
          console.log(`Attempting to load model from: ${path}`);
          
          const model = await new Promise<THREE.Group>((resolve, reject) => {
            loader.load(
              path,
              (object) => {
                console.log('Model loaded successfully:', object);
                resolve(object);
              },
              (progress) => {
                console.log('Loading progress:', (progress.loaded / progress.total * 100) + '% loaded');
              },
              (error) => {
                console.log(`Failed to load from ${path}:`, error);
                reject(error);
              }
            );
          });

          // Scale and position the model
          model.scale.setScalar(0.01); // Adjust scale as needed
          model.position.set(0, 0, 0);
          
          // Enable shadows
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              // Ensure materials are properly lit
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(mat => {
                    if (mat instanceof THREE.MeshStandardMaterial) {
                      mat.needsUpdate = true;
                    }
                  });
                } else if (child.material instanceof THREE.MeshStandardMaterial) {
                  child.material.needsUpdate = true;
                }
              }
            }
          });

          setDroneModel(model);
          setIsLoading(false);
          setError(null);
          return;
          
        } catch (err) {
          console.log(`Could not load model from ${path}`);
          continue;
        }
      }
      
      // If all paths fail, create a fallback drone
      console.log('All model paths failed, creating fallback drone');
      createFallbackDrone();
    };

    loadModel(modelPaths);
  }, []);

  // Create a fallback drone if FBX loading fails
  const createFallbackDrone = () => {
    const fallbackGroup = new THREE.Group();
    
    // Main body
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.5, 0.2, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: '#333333' });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    fallbackGroup.add(body);

    // Arms and propellers
    const armPositions = [
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1]
    ];

    armPositions.forEach(([x, y, z]) => {
      // Arm
      const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8);
      const armMaterial = new THREE.MeshStandardMaterial({ color: '#666666' });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.set(x * 0.6, y, z * 0.6);
      arm.rotation.z = x > 0 ? Math.PI / 4 : -Math.PI / 4;
      arm.castShadow = true;
      fallbackGroup.add(arm);

      // Propeller
      const propGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.02, 3);
      const propMaterial = new THREE.MeshStandardMaterial({ color: '#999999' });
      const prop = new THREE.Mesh(propGeometry, propMaterial);
      prop.position.set(x, 0.3, z);
      prop.castShadow = true;
      fallbackGroup.add(prop);
    });

    setDroneModel(fallbackGroup);
    setIsLoading(false);
    setError('Using fallback drone model - FBX file could not be loaded');
  };

  // Animation loop
  useFrame((state, delta) => {
    if (!groupRef.current || !droneModel) return;

    // Smooth interpolation of rotations
    const lerpFactor = delta * 5; // Adjust for smoother/faster transitions

    currentRotation.current.yaw = THREE.MathUtils.lerp(
      currentRotation.current.yaw,
      droneState.yaw * Math.PI / 180,
      lerpFactor
    );
    currentRotation.current.pitch = THREE.MathUtils.lerp(
      currentRotation.current.pitch,
      droneState.pitch * Math.PI / 180,
      lerpFactor
    );
    currentRotation.current.roll = THREE.MathUtils.lerp(
      currentRotation.current.roll,
      droneState.roll * Math.PI / 180,
      lerpFactor
    );

    // Apply rotations using quaternion for proper drone movement
    const quaternion = new THREE.Quaternion();
    const euler = new THREE.Euler(
      currentRotation.current.pitch,
      currentRotation.current.yaw,
      currentRotation.current.roll,
      'YXZ'
    );
    quaternion.setFromEuler(euler);
    
    groupRef.current.quaternion.copy(quaternion);

    // Apply throttle as vertical movement
    const targetY = (droneState.throttle / 100) * 3; // Scale throttle to reasonable height
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      delta * 2
    );

    // Add subtle hovering animation
    const hoverOffset = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    groupRef.current.position.y += hoverOffset;

    // Rotate propellers if using fallback drone
    if (error) {
      groupRef.current.children.forEach((child, index) => {
        if (index > 4) { // Propellers are the last 4 children
          child.rotation.y += delta * 20 * (droneState.throttle / 100 + 0.1);
        }
      });
    }
  });

  if (isLoading) {
    return (
      <mesh>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    );
  }

  return (
    <group ref={groupRef}>
      {droneModel && <primitive object={droneModel} />}
    </group>
  );
}
