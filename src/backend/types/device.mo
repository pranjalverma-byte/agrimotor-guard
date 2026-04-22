import Common "common";

module {
  public type DeviceId = Common.DeviceId;

  /// Public-facing ESP device info (shared type)
  public type DeviceInfo = {
    id : DeviceId;
    name : Text;
    connected : Bool;
    signalStrength : Nat; // 0-100
  };

  /// Internal mutable device state
  public type DeviceState = {
    id : DeviceId;
    name : Text;
    var connected : Bool;
    var signalStrength : Nat;
  };
};
