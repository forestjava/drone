import React from 'react';
import * as THREE from 'three';

// Realistic sky background component
export function SkyBackground() {
  // Create a gradient texture for cloudy sky
  const canvas = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create gradient from light blue to white
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#E6F3FF');    // Light blue at top
    gradient.addColorStop(0.3, '#B8E0FF');  // Medium blue
    gradient.addColorStop(0.7, '#87CEEB');  // Sky blue
    gradient.addColorStop(1, '#FFFFFF');    // White at bottom (horizon)
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add some cloud patterns
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 300; // Only in upper part
      const radius = 20 + Math.random() * 40;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return canvas;
  }, []);

  const texture = React.useMemo(() => {
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [canvas]);

  return (
    <>
      {/* Sky background with gradient and clouds */}
      <color attach="background" args={['#87CEEB']} />
      
      {/* Large sky sphere with cloudy texture */}
      <mesh position={[0, 0, 0]} scale={[200, 200, 200]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshBasicMaterial 
          map={texture}
          side={THREE.BackSide}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Lighting for bright day scene */}
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