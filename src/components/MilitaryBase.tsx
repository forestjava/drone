import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Radar dish component
function RadarDish({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const radarRef = React.useRef<THREE.Group>(null);

  // Rotating radar animation
  useFrame(() => {
    if (radarRef.current) {
      radarRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Radar base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 2, 1, 8]} />
        <meshLambertMaterial color="#4a4a4a" />
      </mesh>
      
      {/* Radar dish */}
      <group ref={radarRef} position={[0, 1, 0]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <sphereGeometry args={[2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshLambertMaterial color="#e0e0e0" side={THREE.DoubleSide} />
        </mesh>
        
        {/* Radar support arm */}
        <mesh position={[0, -0.5, 1]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[0.2, 2, 0.2]} />
          <meshLambertMaterial color="#666666" />
        </mesh>
      </group>
    </group>
  );
}

// Military vehicle component
function MilitaryVehicle({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Vehicle body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshLambertMaterial color="#2d4a2d" />
      </mesh>
      
      {/* Vehicle cabin */}
      <mesh position={[1.2, 1.2, 0]}>
        <boxGeometry args={[1.5, 0.8, 1.8]} />
        <meshLambertMaterial color="#1a3a1a" />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[1.5, 0, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshLambertMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[1.5, 0, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshLambertMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-1.5, 0, 1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshLambertMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-1.5, 0, -1.2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshLambertMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// Military building component
function MilitaryBuilding({ position, size = [8, 4, 6] }: { position: [number, number, number], size?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main building */}
      <mesh position={[0, size[1] / 2, 0]}>
        <boxGeometry args={size} />
        <meshLambertMaterial color="#3a3a3a" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, size[1] + 0.2, 0]}>
        <boxGeometry args={[size[0] + 0.5, 0.4, size[2] + 0.5]} />
        <meshLambertMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Entrance */}
      <mesh position={[size[0] / 2 - 0.1, 1, 0]}>
        <boxGeometry args={[0.2, 2, 1.5]} />
        <meshLambertMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// Communication tower component
function CommTower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tower base */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 2]} />
        <meshLambertMaterial color="#4a4a4a" />
      </mesh>
      
      {/* Tower structure */}
      <mesh position={[0, 8, 0]}>
        <cylinderGeometry args={[0.1, 0.3, 15]} />
        <meshLambertMaterial color="#666666" />
      </mesh>
      
      {/* Antennas */}
      <mesh position={[0, 15, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3]} />
        <meshLambertMaterial color="#888888" />
      </mesh>
      <mesh position={[0.8, 12, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.03, 0.03, 2]} />
        <meshLambertMaterial color="#888888" />
      </mesh>
      <mesh position={[-0.8, 12, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.03, 0.03, 2]} />
        <meshLambertMaterial color="#888888" />
      </mesh>
    </group>
  );
}

// Military base ground with runway markings
function MilitaryGround() {
  return (
    <group>
      {/* Main concrete ground */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[80, 0.2, 80]} />
        <meshLambertMaterial color="#6a6a6a" />
      </mesh>
      
      {/* Runway markings */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      
      {/* Center line */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 0.3]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      
      {/* Side boundaries */}
      <mesh position={[0, 0.01, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 0.2]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      <mesh position={[0, 0.01, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 0.2]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
    </group>
  );
}

// Complete military base scene
export function MilitaryBaseScene() {
  return (
    <group>
      {/* Ground */}
      <MilitaryGround />
      
      {/* Radar installations */}
      <RadarDish position={[-20, 0, -15]} scale={1.2} />
      <RadarDish position={[25, 0, -20]} scale={0.8} />
      <RadarDish position={[15, 0, 25]} scale={1.0} />
      
      {/* Military buildings */}
      <MilitaryBuilding position={[-15, 0, 20]} size={[12, 5, 8]} />
      <MilitaryBuilding position={[20, 0, 15]} size={[8, 4, 6]} />
      <MilitaryBuilding position={[-25, 0, -5]} size={[10, 6, 10]} />
      
      {/* Communication towers */}
      <CommTower position={[30, 0, -10]} />
      <CommTower position={[-30, 0, 10]} />
      
      {/* Military vehicles */}
      <MilitaryVehicle position={[8, 0, -12]} rotation={[0, Math.PI / 4, 0]} />
      <MilitaryVehicle position={[-10, 0, -18]} rotation={[0, -Math.PI / 6, 0]} />
      <MilitaryVehicle position={[18, 0, 8]} rotation={[0, Math.PI / 2, 0]} />
      <MilitaryVehicle position={[-8, 0, 15]} rotation={[0, Math.PI, 0]} />
      <MilitaryVehicle position={[12, 0, -25]} rotation={[0, Math.PI / 3, 0]} />
      
      {/* Perimeter fence posts */}
      {Array.from({ length: 16 }, (_, i) => (
        <mesh key={`fence-${i}`} position={[35 * Math.cos(i * Math.PI / 8), 1.5, 35 * Math.sin(i * Math.PI / 8)]}>
          <boxGeometry args={[0.2, 3, 0.2]} />
          <meshLambertMaterial color="#333333" />
        </mesh>
      ))}
    </group>
  );
}