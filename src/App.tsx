import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import "@fontsource/inter";
import { ControllerProvider, useController } from "@greact/controller";
import DroneViewer from "./components/DroneViewer";
import DroneControls from "./components/DroneControls";
import ControllerIntegration from "./components/ControllerIntegration";
import { useDroneState } from "./hooks/useDroneState";

// Компонент для получения статуса контроллера
function ControllerStatus({ droneState }: { droneState: any }) {
  const { controller } = useController();

  return (
    <>
      <ControllerIntegration droneState={droneState} />
      <DroneControls droneState={droneState} isControllerConnected={controller?.connected || false} />
    </>
  );
}

// Main App component
function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const droneState = useDroneState();

  // Show the canvas once everything is loaded
  useEffect(() => {
    setShowCanvas(true);
  }, []);

  return (
    <ControllerProvider>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        {showCanvas && (
          <>
            {/* 3D Canvas */}
            <Canvas
              shadows
              camera={{
                position: [0, 5, 10],
                fov: 30,
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
              <ambientLight intensity={0.8} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[-10, -10, -5]} intensity={0.8} />
              <pointLight position={[10, -10, 5]} intensity={0.6} />

              <Suspense fallback={null}>
                <DroneViewer droneState={droneState} />
              </Suspense>

              {/* Ground plane for reference */}
              <mesh receiveShadow position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#333333" />
              </mesh>
            </Canvas>

            {/* Controller Integration and Controls */}
            <ControllerStatus droneState={droneState} />

            {/* Loading indicator */}
            <div
              className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Симулятор боевого дрона
            </div>
          </>
        )}
      </div>
    </ControllerProvider>
  );
}

export default App;
