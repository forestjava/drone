import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import "@fontsource/inter";
import { ControllerProvider, useController } from "@greact/controller";
import DroneViewer from "./components/DroneViewer";
import DroneControls from "./components/DroneControls";
import ControllerIntegration from "./components/ControllerIntegration";
import { SkyBackground, BrandedPlatform, UIBranding } from "./components/SceneBranding";
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
              {/* Sky background and lighting */}
              <SkyBackground />

              <Suspense fallback={null}>
                <DroneViewer droneState={droneState} />
              </Suspense>

              {/* Branded platform with Russian flag */}
              <BrandedPlatform />
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

            {/* Branding elements */}
            <UIBranding />
          </>
        )}
      </div>
    </ControllerProvider>
  );
}

export default App;
