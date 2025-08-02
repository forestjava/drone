import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import "@fontsource/inter";
import DroneViewer from "./components/DroneViewer";
import DroneControls from "./components/DroneControls";
import { useDroneState } from "./hooks/useDroneState";

// Main App component
function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const droneState = useDroneState();

  // Show the canvas once everything is loaded
  useEffect(() => {
    setShowCanvas(true);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {showCanvas && (
        <>
          {/* 3D Canvas */}
          <Canvas
            shadows
            camera={{
              position: [0, 5, 10],
              fov: 45,
              near: 0.1,
              far: 1000
            }}
            gl={{
              antialias: true,
              powerPreference: "high-performance"
            }}
          >
            <color attach="background" args={["#1a1a1a"]} />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />

            <Suspense fallback={null}>
              <DroneViewer droneState={droneState} />
            </Suspense>

            {/* Ground plane for reference */}
            <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          </Canvas>

          {/* Control Panel */}
          <DroneControls droneState={droneState} />

          {/* Loading indicator */}
          <div 
            className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Battle Drone Simulator
          </div>
        </>
      )}
    </div>
  );
}

export default App;
