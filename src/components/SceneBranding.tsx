import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Cloud component
function Cloud({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const cloudRef = React.useRef<THREE.Group>(null);

  // Gentle rotation animation using useFrame
  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={cloudRef} position={position} scale={scale}>
      {/* Multiple spheres to create cloud shape */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshLambertMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      <mesh position={[1.2, 0.3, 0.5]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshLambertMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-1, 0.2, -0.3]}>
        <sphereGeometry args={[1.0, 16, 16]} />
        <meshLambertMaterial color="#ffffff" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0.5, -0.5, 0.8]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshLambertMaterial color="#f8f8f8" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-0.8, -0.3, -0.6]}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshLambertMaterial color="#ffffff" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

// Sky background component with clouds
export function SkyBackground() {
  return (
    <>
      {/* Clear sky background */}
      <color attach="background" args={['#87CEEB']} />
      
      {/* Additional lighting for bright day scene */}
      <ambientLight intensity={1.2} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={2.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#FFFFEE"
      />
      <directionalLight
        position={[-10, 15, -5]}
        intensity={0.8}
        color="#CCE7FF"
      />

      {/* Test visible cloud - close to camera */}
      <mesh position={[0, 8, -8]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshLambertMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>

      {/* More test clouds */}
      <Cloud position={[8, 8, -12]} scale={2.0} />
      <Cloud position={[-10, 10, -15]} scale={1.5} />
      <Cloud position={[12, 12, -18]} scale={1.8} />
      <Cloud position={[-15, 15, -10]} scale={2.2} />
      <Cloud position={[5, 18, -20]} scale={1.3} />
      <Cloud position={[-8, 6, -14]} scale={1.7} />
    </>
  );
}

// Clean platform 
export function BrandedPlatform() {
  return (
    <mesh receiveShadow position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial 
        color="#f0f0f0"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

// UI Branding components
export function UIBranding() {
  return (
    <>
      {/* Russian Flag in bottom left corner */}
      <div
        className="absolute bottom-4 left-4"
        style={{
          width: '80px',
          height: '53px',
          backgroundImage: 'url(/textures/russian_flag.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          border: '2px solid rgba(255,255,255,0.8)'
        }}
      />

      {/* Alabuga Logo in bottom right corner */}
      <div
        className="absolute bottom-4 right-4"
        style={{
          width: '120px',
          height: '40px',
          backgroundImage: 'url(/textures/alabuga_logo.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '6px',
          padding: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      />
    </>
  );
}