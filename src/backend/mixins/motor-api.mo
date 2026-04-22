import Types "../types/motor";
import MotorLib "../lib/motor";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";

mixin (motors : List.List<MotorLib.MotorState>) {

  /// Return current status of all motors, with slight temperature variation to simulate live sensor data
  public func getMotors() : async [Types.MotorStatus] {
    // Simulate real-time temperature fluctuation using time-based pseudo-randomness
    let seed : Int = Time.now();
    var counter : Int = 0;

    motors.forEach(func(m) {
      counter := counter + 1;
      let hash : Int = seed + counter * 6_271;
      let posHash : Nat = Int.abs(hash);
      // Fluctuate by ±0.0 to ±1.5°C
      let fluctuation : Float = ((posHash % 30).toInt().toFloat() / 10.0) - 1.5;
      m.temperature := m.temperature + fluctuation;
      // Clamp to sensible range: running 38-75, idle 25-40
      if (m.isOn) {
        if (m.temperature < 38.0) { m.temperature := 38.0 };
        if (m.temperature > 75.0) { m.temperature := 75.0 };
      } else {
        if (m.temperature < 25.0) { m.temperature := 25.0 };
        if (m.temperature > 40.0) { m.temperature := 40.0 };
      };
    });

    motors.map<MotorLib.MotorState, Types.MotorStatus>(MotorLib.toStatus).toArray();
  };

  /// Switch the active motor (Motor 1 ON → Motor 2 ON, vice versa)
  public func switchMotor() : async () {
    MotorLib.switchMotor(motors);
  };

  /// Get temperature prediction for a specific motor over given horizon (minutes)
  public query func getTempPrediction(motorId : Nat, horizon : Nat) : async Types.TempPrediction {
    let motor = switch (motors.find(func(m : MotorLib.MotorState) : Bool { m.id == motorId })) {
      case (?m) m;
      case null Runtime.trap("Motor not found: " # debug_show(motorId));
    };
    motor.predictTemperature(horizon);
  };

  /// Return alerts for any motors exceeding the 60°C threshold
  public query func getTemperatureAlerts() : async [Types.TemperatureAlert] {
    let threshold : Float = 60.0;
    motors.filterMap<MotorLib.MotorState, Types.TemperatureAlert>(
      func(m) { m.checkOverheat(threshold) }
    ).toArray();
  };
};
