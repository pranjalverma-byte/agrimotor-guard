module {
  /// Unique identifier for a motor (1 or 2)
  public type MotorId = Nat;

  /// Unique identifier for an ESP device
  public type DeviceId = Text;

  /// Temperature in Celsius
  public type TempCelsius = Float;

  /// Time horizon in minutes for temperature prediction
  public type PredictionHorizon = Nat; // 15, 30, 60, or 120
};
