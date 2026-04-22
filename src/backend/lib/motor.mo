import Types "../types/motor";
import List "mo:core/List";
import Array "mo:core/Array";

module {
  public type MotorState = Types.MotorState;
  public type MotorStatus = Types.MotorStatus;
  public type TempPrediction = Types.TempPrediction;
  public type TemperatureAlert = Types.TemperatureAlert;

  /// Create default initial state for a motor
  public func newMotor(id : Nat, isOn : Bool, temp : Float) : MotorState {
    { id; var isOn; var temperature = temp };
  };

  /// Convert internal mutable state to shared public type
  public func toStatus(self : MotorState) : MotorStatus {
    { id = self.id; isOn = self.isOn; temperature = self.temperature };
  };

  /// Switch the active motor: whichever is ON turns OFF, the other turns ON
  public func switchMotor(motors : List.List<MotorState>) : () {
    motors.forEach(func(m) {
      m.isOn := not m.isOn;
    });
  };

  /// Return predicted temperature data points for a given motor over the horizon
  public func predictTemperature(self : MotorState, horizon : Nat) : TempPrediction {
    // Generate data points at regular intervals within the horizon
    // Running motors rise gradually; idle motors cool toward ambient (~28°C)
    let steps : Nat = 6;
    let intervalMinutes : Nat = if (horizon <= steps) 1 else horizon / steps;
    let fSteps : Float = steps.toInt().toFloat();

    let dataPoints = Array.tabulate(
      steps + 1,
      func(i) {
        let minutesFromNow = i * intervalMinutes;
        let fI : Float = i.toInt().toFloat();
        let progress : Float = if (fSteps == 0.0) 0.0 else fI / fSteps;

        let predictedTemp : Float = if (self.isOn) {
          // Running motor: temperature rises toward a peak (~72°C) with diminishing returns
          let target : Float = 72.0;
          let rise : Float = (target - self.temperature) * (1.0 - Float.exp(-progress * 1.5));
          self.temperature + rise;
        } else {
          // Idle motor: temperature cools toward ambient (~28°C)
          let ambient : Float = 28.0;
          let drop : Float = (self.temperature - ambient) * (1.0 - Float.exp(-progress * 1.2));
          self.temperature - drop;
        };
        { minutesFromNow; temperature = predictedTemp };
      }
    );

    { motorId = self.id; horizon; dataPoints };
  };

  /// Check if the motor temperature exceeds the given threshold
  public func checkOverheat(self : MotorState, threshold : Float) : ?TemperatureAlert {
    if (self.temperature > threshold) {
      ?{
        motorId = self.id;
        temperature = self.temperature;
        threshold;
        message = "Overheating detected – switching motor";
      };
    } else {
      null;
    };
  };
};
