import Types "../types/device";
import List "mo:core/List";
import Int "mo:core/Int";
import Time "mo:core/Time";

module {
  public type DeviceState = Types.DeviceState;
  public type DeviceInfo = Types.DeviceInfo;

  /// Create a new device state entry
  public func newDevice(id : Text, name : Text, connected : Bool, signal : Nat) : DeviceState {
    { id; name; var connected; var signalStrength = signal };
  };

  /// Convert internal mutable state to shared public type
  public func toInfo(self : DeviceState) : DeviceInfo {
    { id = self.id; name = self.name; connected = self.connected; signalStrength = self.signalStrength };
  };

  /// Simulate a device rescan: pseudo-randomise connected status and signal strength
  public func rescanDevices(devices : List.List<DeviceState>) : () {
    // Use current time as a pseudo-random seed
    let seed : Int = Time.now();
    var counter : Int = 0;

    devices.forEach(func(d) {
      counter := counter + 1;
      // Mix seed with device counter for variety
      let hash : Int = seed + counter * 7_919 + counter * 3_571;
      let posHash : Nat = Int.abs(hash);

      // ~75% chance of being connected
      d.connected := (posHash % 4) != 0;

      // Signal strength 45-100 if connected, 0-20 if disconnected
      if (d.connected) {
        d.signalStrength := 45 + (posHash % 56);
      } else {
        d.signalStrength := posHash % 21;
      };
    });
  };
};
