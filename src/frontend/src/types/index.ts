export interface MotorStatus {
  id: number;
  isOn: boolean;
  temperature: number;
  current?: number;
  rpm?: number;
  runtimeHours?: number;
  name?: string;
}

export interface DeviceInfo {
  id: string;
  name: string;
  connected: boolean;
  signalStrength: number;
}

export interface TempDataPoint {
  minutesFromNow: number;
  temperature: number;
}

export interface TempPrediction {
  motorId: number;
  horizon: number;
  dataPoints: TempDataPoint[];
}

export interface TemperatureAlert {
  motorId: number;
  temperature: number;
  threshold: number;
  message: string;
}

export type TempHorizon = 15 | 30 | 60 | 120;

export type AlertSeverity = "critical" | "warning" | "info";

export interface Alert {
  id: string;
  motorId: number;
  motorName: string;
  severity: AlertSeverity;
  message: string;
  timestamp: number;
}
