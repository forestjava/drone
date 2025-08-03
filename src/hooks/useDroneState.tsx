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
    setThrottleState(value);
    console.log('Throttle set to:', value);
  }, []);

  const setYaw = useCallback((value: number) => {
    setYawState(value);
    console.log('Yaw set to:', value);
  }, []);

  const setPitch = useCallback((value: number) => {
    setPitchState(value);
    console.log('Pitch set to:', value);
  }, []);

  const setRoll = useCallback((value: number) => {
    setRollState(value);
    console.log('Roll set to:', value);
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
