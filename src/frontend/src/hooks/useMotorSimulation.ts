import { useMotorStore } from "@/store/motorStore";
import type { Alert } from "@/types";
import { useEffect, useRef } from "react";

const OVERHEAT_THRESHOLD = 60;
const RUNNING_BASE_TEMP = 38;
const IDLE_BASE_TEMP = 24;
const TEMP_VARIANCE = 2.5;

function nextTemp(current: number, isOn: boolean): number {
  const target = isOn ? RUNNING_BASE_TEMP : IDLE_BASE_TEMP;
  const drift = (target - current) * 0.06;
  const noise = (Math.random() - 0.5) * TEMP_VARIANCE;
  return Math.round((current + drift + noise) * 10) / 10;
}

export function useMotorSimulation() {
  const store = useMotorStore();
  const storeRef = useRef(store);
  storeRef.current = store;

  const alertCooldown = useRef<Set<number>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      const { motor1, motor2, setMotor1, setMotor2, addAlert } =
        storeRef.current;

      const newTemp1 = nextTemp(motor1.temperature, motor1.isOn);
      const newTemp2 = nextTemp(motor2.temperature, motor2.isOn);

      setMotor1({
        temperature: newTemp1,
        current: motor1.isOn ? 4.8 + (Math.random() - 0.5) * 0.4 : 0,
        rpm: motor1.isOn ? 1750 + Math.floor((Math.random() - 0.5) * 50) : 0,
        runtimeHours: motor1.isOn
          ? Math.round((motor1.runtimeHours ?? 0) * 10 + 1 / 360) / 10
          : motor1.runtimeHours,
      });

      setMotor2({
        temperature: newTemp2,
        current: motor2.isOn ? 4.8 + (Math.random() - 0.5) * 0.4 : 0,
        rpm: motor2.isOn ? 1750 + Math.floor((Math.random() - 0.5) * 50) : 0,
        runtimeHours: motor2.isOn
          ? Math.round((motor2.runtimeHours ?? 0) * 10 + 1 / 360) / 10
          : motor2.runtimeHours,
      });

      // Alert if overheating
      const motorChecks = [
        { id: 1, temp: newTemp1, isOn: motor1.isOn, name: "Motor 1" },
        { id: 2, temp: newTemp2, isOn: motor2.isOn, name: "Motor 2" },
      ];
      for (const { id, temp, isOn, name } of motorChecks) {
        if (
          isOn &&
          temp > OVERHEAT_THRESHOLD &&
          !alertCooldown.current.has(id)
        ) {
          alertCooldown.current.add(id);
          const alert: Alert = {
            id: `alert-${id}-${Date.now()}`,
            motorId: id,
            motorName: name,
            severity: "critical",
            message: `Overheating detected — ${temp.toFixed(1)}°C exceeds ${OVERHEAT_THRESHOLD}°C limit`,
            timestamp: Date.now(),
          };
          addAlert(alert);
          setTimeout(() => alertCooldown.current.delete(id), 15000);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []); // stable — reads latest state via storeRef
}
