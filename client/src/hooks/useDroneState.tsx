import { useState, useCallback } from 'react';

export interface DroneState {
  throttle: number;
  yaw: number;
  pitch: number;
  roll: number;
  setThrottle: (value: number) => void;
  setYaw: (value: number) => void;
  setPitch: (value: number) => void;
  setRoll: (value: number) => void;
  reset: () => void;
}

export function useDroneState(): DroneState {
  const [throttle, setThrottleState] = useState(25); // Start with some throttle
  const [yaw, setYawState] = useState(0);
  const [pitch, setPitchState] = useState(0);
  const [roll, setRollState] = useState(0);

  const setThrottle = useCallback((value: number) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    setThrottleState(clampedValue);
    console.log('Throttle set to:', clampedValue);
  }, []);

  const setYaw = useCallback((value: number) => {
    const clampedValue = Math.max(-180, Math.min(180, value));
    setYawState(clampedValue);
    console.log('Yaw set to:', clampedValue);
  }, []);

  const setPitch = useCallback((value: number) => {
    const clampedValue = Math.max(-45, Math.min(45, value));
    setPitchState(clampedValue);
    console.log('Pitch set to:', clampedValue);
  }, []);

  const setRoll = useCallback((value: number) => {
    const clampedValue = Math.max(-45, Math.min(45, value));
    setRollState(clampedValue);
    console.log('Roll set to:', clampedValue);
  }, []);

  const reset = useCallback(() => {
    setThrottleState(25);
    setYawState(0);
    setPitchState(0);
    setRollState(0);
    console.log('Drone controls reset to default position');
  }, []);

  return {
    throttle,
    yaw,
    pitch,
    roll,
    setThrottle,
    setYaw,
    setPitch,
    setRoll,
    reset
  };
}
