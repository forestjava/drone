import { useEffect } from 'react';
import { useController } from '@greact/controller';
import { DroneState } from '../hooks/useDroneState';

interface ControllerIntegrationProps {
  droneState: DroneState;
}

export default function ControllerIntegration({ droneState }: ControllerIntegrationProps) {
  const { controller, axes } = useController();

  // Автоматически обновляем значения на основе контроллера
  useEffect(() => {
    if (controller?.connected) {
      // Преобразуем значения контроллера (-1 до 1) в нужные диапазоны
      // Throttle: от -1 до 1 -> от 0 до 100
      const newThrottle = Math.round(((axes.throttle + 1) / 2) * 100);
      // Yaw: от -1 до 1 -> от +180 до -180
      const newYaw = Math.round(-axes.yaw * 180);
      // Pitch: от -1 до 1 -> от +45 до -45 (инвертирование)
      const newPitch = Math.round(-axes.pitch * 45);
      // Roll: от -1 до 1 -> от +45 до -45 (инвертирование)
      const newRoll = Math.round(-axes.roll * 45);

      droneState.setThrottle(newThrottle);
      droneState.setYaw(newYaw);
      droneState.setPitch(newPitch);
      droneState.setRoll(newRoll);
    }
  }, [axes.throttle, axes.yaw, axes.pitch, axes.roll, controller?.connected, droneState]);

  // Этот компонент не рендерит ничего, только обрабатывает контроллер
  return null;
} 