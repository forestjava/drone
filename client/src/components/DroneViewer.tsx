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
    
    console.log('Loading Battle Drone FBX model...');
    
    loader.load(
      '/models/battle_drone.fbx',
      (object) => {
        console.log('Battle Drone FBX model loaded successfully:', object);
        
        // Scale and position the model appropriately for a drone
        object.scale.setScalar(0.1); // Increased scale to make it more visible
        object.position.set(0, 0, 0);
        
        // Enable shadows and configure materials
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Apply PBR materials with the drone textures
            if (child.material) {
              const material = new THREE.MeshStandardMaterial({
                map: null, // Will be loaded dynamically
                normalMap: null,
                roughnessMap: null,
                metalnessMap: null,
                aoMap: null,
                emissiveMap: null
              });
              
              // Load textures
              const textureLoader = new THREE.TextureLoader();
              
              textureLoader.load('/textures/Battle_Drone_albedo.png', (texture) => {
                material.map = texture;
                material.needsUpdate = true;
              });
              
              textureLoader.load('/textures/Battle_Drone_normal.png', (texture) => {
                material.normalMap = texture;
                material.needsUpdate = true;
              });
              
              textureLoader.load('/textures/Battle_Drone_roughness.png', (texture) => {
                material.roughnessMap = texture;
                material.needsUpdate = true;
              });
              
              textureLoader.load('/textures/Battle_Drone_metallic.png', (texture) => {
                material.metalnessMap = texture;
                material.needsUpdate = true;
              });
              
              textureLoader.load('/textures/Battle_Drone_ao.png', (texture) => {
                material.aoMap = texture;
                material.needsUpdate = true;
              });
              
              textureLoader.load('/textures/Battle_Drone_emit.png', (texture) => {
                material.emissiveMap = texture;
                material.emissive = new THREE.Color(0x444444);
                material.needsUpdate = true;
              });
              
              child.material = material;
            }
          }
        });

        setDroneModel(object);
        setIsLoading(false);
        setError(null);
      },
      (progress) => {
        const percent = (progress.loaded / progress.total * 100);
        console.log('Loading progress:', percent + '% loaded');
      },
      (error) => {
        console.error('Error loading Battle Drone FBX model:', error);
        setError('Failed to load Battle Drone FBX model');
        setIsLoading(false);
        // Don't create fallback - just show error
      }
    );
  }, []);


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
  });

  if (isLoading) {
    return (
      <mesh>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    );
  }

  if (error) {
    return (
      <mesh>
        <boxGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
    );
  }

  return (
    <group ref={groupRef}>
      {droneModel && <primitive object={droneModel} />}
    </group>
  );
}
