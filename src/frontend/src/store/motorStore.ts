import type { Alert, MotorStatus } from "@/types";
import { create } from "zustand";

interface MotorState {
  motor1: MotorStatus;
  motor2: MotorStatus;
  alerts: Alert[];
  isSwitching: boolean;
  activeMotorId: number;
  setMotor1: (update: Partial<MotorStatus>) => void;
  setMotor2: (update: Partial<MotorStatus>) => void;
  addAlert: (alert: Alert) => void;
  clearAlert: (id: string) => void;
  switchMotors: () => void;
  setIsSwitching: (val: boolean) => void;
}

export const useMotorStore = create<MotorState>((set) => ({
  motor1: {
    id: 1,
    isOn: true,
    temperature: 42.1,
    current: 4.8,
    rpm: 1750,
    runtimeHours: 142,
    name: "Motor 1 — Pivot Irrigation",
  },
  motor2: {
    id: 2,
    isOn: false,
    temperature: 28.3,
    current: 0,
    rpm: 0,
    runtimeHours: 98,
    name: "Motor 2 — Perimeter Fence",
  },
  alerts: [],
  isSwitching: false,
  activeMotorId: 1,

  setMotor1: (update) =>
    set((state) => ({ motor1: { ...state.motor1, ...update } })),

  setMotor2: (update) =>
    set((state) => ({ motor2: { ...state.motor2, ...update } })),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts].slice(0, 10),
    })),

  clearAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),

  switchMotors: () =>
    set((state) => {
      const wasMotor1On = state.motor1.isOn;
      return {
        motor1: { ...state.motor1, isOn: !wasMotor1On },
        motor2: { ...state.motor2, isOn: wasMotor1On },
        activeMotorId: wasMotor1On ? 2 : 1,
        isSwitching: false,
      };
    }),

  setIsSwitching: (val) => set({ isSwitching: val }),
}));
