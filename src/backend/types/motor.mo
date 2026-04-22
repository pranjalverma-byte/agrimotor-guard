import Common "common";

module {
  public type MotorId = Common.MotorId;
  public type TempCelsius = Common.TempCelsius;

  /// Public-facing motor status (shared type)
  public type MotorStatus = {
    id : MotorId;
    isOn : Bool;
    temperature : TempCelsius;
  };

  /// Internal mutable motor state
  public type MotorState = {
    id : MotorId;
    var isOn : Bool;
    var temperature : TempCelsius;
  };

  /// A single predicted temperature data point
  public type TempDataPoint = {
    minutesFromNow : Nat;
    temperature : TempCelsius;
  };

  /// Response for temperature prediction query
  public type TempPrediction = {
    motorId : MotorId;
    horizon : Nat; // minutes
    dataPoints : [TempDataPoint];
  };

  /// Alert status when a motor exceeds safe temperature
  public type TemperatureAlert = {
    motorId : MotorId;
    temperature : TempCelsius;
    threshold : TempCelsius;
    message : Text;
  };
};
