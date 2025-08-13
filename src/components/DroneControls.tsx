import { useState } from 'react';
import { DroneState } from '../hooks/useDroneState';

interface DroneControlsProps {
  droneState: DroneState;
  isControllerConnected: boolean;
}

export default function DroneControls({ droneState, isControllerConnected }: DroneControlsProps) {
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

  const statusStyle = {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold' as const,
    marginBottom: '12px'
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
          Показать управление
        </button>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      {/* Controller Status */}
      <div style={{
        ...statusStyle,
        backgroundColor: isControllerConnected ? '#00ff00' : '#ff0000',
        color: isControllerConnected ? '#000000' : '#ffffff'
      }}>
        {isControllerConnected ? '🎮 Контроллер подключен' : '❌ Нет контроллера'}
      </div>

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
          Управление дроном
        </h3>
        <button
          style={{ ...buttonStyle, padding: '4px 8px', fontSize: '10px' }}
          onClick={() => setIsMinimized(true)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#444444'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#333333'}
        >
          Скрыть
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
          min="-1"
          max="1"
          step="0.01"
          value={(throttle / 100) * 2 - 1}
          onChange={(e) => setThrottle(((Number(e.target.value) + 1) / 2) * 100)}
          style={sliderStyle}
          disabled={isControllerConnected}
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
          min="-1"
          max="1"
          step="0.01"
          value={-yaw / 180}
          onChange={(e) => setYaw(-Number(e.target.value) * 180)}
          style={sliderStyle}
          disabled={isControllerConnected}
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
          min="-1"
          max="1"
          step="0.01"
          value={-pitch / 45}
          onChange={(e) => setPitch(-Number(e.target.value) * 45)}
          style={sliderStyle}
          disabled={isControllerConnected}
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
          min="-1"
          max="1"
          step="0.01"
          value={-roll / 45}
          onChange={(e) => setRoll(-Number(e.target.value) * 45)}
          style={sliderStyle}
          disabled={isControllerConnected}
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
          Сбросить позицию
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
        <strong>Управление:</strong><br />
        • Throttle: Вертикальное движение<br />
        • Yaw: Поворот вокруг вертикальной оси<br />
        • Pitch: Наклон вперед/назад<br />
        • Roll: Наклон влево/вправо
      </div>
    </div >
  );
}
