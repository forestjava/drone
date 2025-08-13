import React from 'react';

// Sky background component
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
      {/* Russian Flag in top right corner */}
      <div
        className="absolute top-4 right-4"
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