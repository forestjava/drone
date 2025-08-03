import { useState } from 'react';
import { DroneState } from '../hooks/useDroneState';

interface DroneControlsProps {
  droneState: DroneState;
}

export default function DroneControls({ droneState }: DroneControlsProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const {
    throttle, yaw, pitch, roll,
    setThrottle, setYaw, setPitch, setRoll,
    reset
  } = droneState;

  const controlStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    marginBottom: '16px'
  };

  const sliderStyle = {
    width: '200px',
    height: '6px',
    borderRadius: '3px',
    background: '#333',
    outline: 'none',
    appearance: 'none' as const,
    cursor: 'pointer'
  };

  const labelStyle = {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'bold' as const,
    fontFamily: 'Inter, sans-serif',
    marginBottom: '4px',
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const
  };

  const valueStyle = {
    color: '#00ff00',
    fontSize: '12px',
    fontFamily: 'monospace'
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#333333',
    color: '#ffffff',
    border: '1px solid #555555',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    transition: 'background-color 0.2s'
  };

  const panelStyle = {
    position: 'absolute' as const,
    top: '20px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: isMinimized ? '16px' : '24px',
    borderRadius: '8px',
    border: '1px solid #333333',
    backdropFilter: 'blur(10px)',
    minWidth: isMinimized ? 'auto' : '280px',
    transition: 'all 0.3s ease'
  };

  if (isMinimized) {
    return (
      <div style={panelStyle}>
        <button
          style={buttonStyle}
          onClick={() => setIsMinimized(false)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444444'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333333'}
        >
          Show Controls
        </button>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{ 
          color: '#ffffff', 
          margin: 0, 
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px'
        }}>
          Drone Controls
        </h3>
        <button
          style={{...buttonStyle, padding: '4px 8px', fontSize: '10px'}}
          onClick={() => setIsMinimized(true)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444444'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333333'}
        >
          Hide
        </button>
      </div>

      {/* Throttle Control */}
      <div style={controlStyle}>
        <div style={labelStyle}>
          <span>Throttle</span>
          <span style={valueStyle}>{throttle.toFixed(0)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={throttle}
          onChange={(e) => setThrottle(Number(e.target.value))}
          style={sliderStyle}
        />
      </div>

      {/* Yaw Control */}
      <div style={controlStyle}>
        <div style={labelStyle}>
          <span>Yaw</span>
          <span style={valueStyle}>{yaw.toFixed(0)}°</span>
        </div>
        <input
          type="range"
          min="-180"
          max="180"
          value={yaw}
          onChange={(e) => setYaw(Number(e.target.value))}
          style={sliderStyle}
        />
      </div>

      {/* Pitch Control */}
      <div style={controlStyle}>
        <div style={labelStyle}>
          <span>Pitch</span>
          <span style={valueStyle}>{pitch.toFixed(0)}°</span>
        </div>
        <input
          type="range"
          min="-45"
          max="45"
          value={pitch}
          onChange={(e) => setPitch(Number(e.target.value))}
          style={sliderStyle}
        />
      </div>

      {/* Roll Control */}
      <div style={controlStyle}>
        <div style={labelStyle}>
          <span>Roll</span>
          <span style={valueStyle}>{roll.toFixed(0)}°</span>
        </div>
        <input
          type="range"
          min="-45"
          max="45"
          value={roll}
          onChange={(e) => setRoll(Number(e.target.value))}
          style={sliderStyle}
        />
      </div>

      {/* Control Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '20px'
      }}>
        <button
          style={buttonStyle}
          onClick={reset}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444444'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333333'}
        >
          Reset Position
        </button>
      </div>

      {/* Instructions */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '4px',
        fontSize: '11px',
        color: '#cccccc',
        fontFamily: 'Inter, sans-serif',
        lineHeight: '1.4'
      }}>
        <strong>Controls:</strong><br />
        • Throttle: Vertical movement (0-100%)<br />
        • Yaw: Rotation around vertical axis<br />
        • Pitch: Forward/backward tilt<br />
        • Roll: Left/right tilt
      </div>
    </div>
  );
}
