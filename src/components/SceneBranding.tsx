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

// Industrial Alabuga factory platform
export function BrandedPlatform() {
  // Create industrial concrete texture with markings
  const canvas = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Base green ground texture
    ctx.fillStyle = '#2D5C2D';
    ctx.fillRect(0, 0, 1024, 1024);
    
    // Add grass texture pattern
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 3 + 1;
      ctx.fillStyle = `rgba(${50 + Math.random() * 30}, ${120 + Math.random() * 40}, ${50 + Math.random() * 30}, 0.4)`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add yellow warehouse zone markings
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 8;
    
    // Warehouse grid lines
    for (let i = 1; i < 4; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo((1024 / 4) * i, 100);
      ctx.lineTo((1024 / 4) * i, 924);
      ctx.stroke();
    }
    
    for (let i = 1; i < 4; i++) {
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(100, (1024 / 4) * i);
      ctx.lineTo(924, (1024 / 4) * i);
      ctx.stroke();
    }
    
    // Landing zone circle in center
    ctx.beginPath();
    ctx.arc(512, 512, 80, 0, Math.PI * 2);
    ctx.stroke();
    
    // Inner circle
    ctx.beginPath();
    ctx.arc(512, 512, 60, 0, Math.PI * 2);
    ctx.stroke();
    
    // Add "ALABUGA" text at bottom
    ctx.fillStyle = '#1E3A8A';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('АЛАБУГА', 512, 900);
    
    // Add zone numbers
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('A1', 256, 256);
    ctx.fillText('A2', 768, 256);
    ctx.fillText('B1', 256, 768);
    ctx.fillText('B2', 768, 768);
    
    // Add safety markings
    ctx.strokeStyle = '#FF4444';
    ctx.lineWidth = 4;
    ctx.setLineDash([20, 20]);
    
    // Safety perimeter
    ctx.beginPath();
    ctx.rect(50, 50, 924, 924);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    return canvas;
  }, []);

  const texture = React.useMemo(() => {
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [canvas]);

  return (
    <mesh receiveShadow position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[16, 16]} />
      <meshStandardMaterial 
        map={texture}
        roughness={0.9}
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