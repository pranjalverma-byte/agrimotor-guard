import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TemperatureAlert {
    motorId: MotorId;
    threshold: TempCelsius;
    temperature: TempCelsius;
    message: string;
}
export type DeviceId = string;
export interface DeviceInfo {
    id: DeviceId;
    signalStrength: bigint;
    name: string;
    connected: boolean;
}
export type TempCelsius = number;
export interface MotorStatus {
    id: MotorId;
    temperature: TempCelsius;
    isOn: boolean;
}
export interface TempPrediction {
    motorId: MotorId;
    horizon: bigint;
    dataPoints: Array<TempDataPoint>;
}
export type MotorId = bigint;
export interface TempDataPoint {
    temperature: TempCelsius;
    minutesFromNow: bigint;
}
export interface backendInterface {
    getDevices(): Promise<Array<DeviceInfo>>;
    getMotors(): Promise<Array<MotorStatus>>;
    getTempPrediction(motorId: bigint, horizon: bigint): Promise<TempPrediction>;
    getTemperatureAlerts(): Promise<Array<TemperatureAlert>>;
    refreshDevices(): Promise<Array<DeviceInfo>>;
    switchMotor(): Promise<void>;
}
