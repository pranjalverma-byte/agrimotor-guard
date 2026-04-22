import type { DeviceInfo } from "@/types";
import { create } from "zustand";

const MOCK_DEVICES: DeviceInfo[] = [
  {
    id: "esp32-1",
    name: "ESP32-1 — North Gate",
    connected: true,
    signalStrength: 92,
  },
  {
    id: "esp32-2",
    name: "ESP32-2 — South Perimeter",
    connected: true,
    signalStrength: 78,
  },
  {
    id: "esp32-3",
    name: "ESP32-3 — East Field",
    connected: false,
    signalStrength: 15,
  },
  {
    id: "esp32-4",
    name: "ESP32-4 — Motor Control Hub",
    connected: true,
    signalStrength: 88,
  },
  {
    id: "esp32-5",
    name: "ESP32-5 — Irrigation Zone A",
    connected: true,
    signalStrength: 65,
  },
  {
    id: "esp32-6",
    name: "ESP32-6 — West Fence",
    connected: false,
    signalStrength: 0,
  },
];

interface DeviceState {
  devices: DeviceInfo[];
  isScanning: boolean;
  lastRefreshed: number | null;
  setDevices: (devices: DeviceInfo[]) => void;
  setIsScanning: (val: boolean) => void;
  refreshDevices: () => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: MOCK_DEVICES,
  isScanning: false,
  lastRefreshed: Date.now(),

  setDevices: (devices) => set({ devices }),
  setIsScanning: (val) => set({ isScanning: val }),

  refreshDevices: () => {
    set({ isScanning: true });
    setTimeout(() => {
      set({
        isScanning: false,
        lastRefreshed: Date.now(),
        devices: MOCK_DEVICES.map((d) => ({
          ...d,
          signalStrength: d.connected
            ? Math.min(
                100,
                d.signalStrength + Math.floor(Math.random() * 6 - 3),
              )
            : d.signalStrength,
        })),
      });
    }, 1800);
  },
}));
