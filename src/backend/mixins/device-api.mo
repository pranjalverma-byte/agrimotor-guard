import Types "../types/device";
import DeviceLib "../lib/device";
import List "mo:core/List";

mixin (devices : List.List<DeviceLib.DeviceState>) {

  /// Return the current list of ESP devices
  public query func getDevices() : async [Types.DeviceInfo] {
    devices.map<DeviceLib.DeviceState, Types.DeviceInfo>(DeviceLib.toInfo).toArray();
  };

  /// Trigger a device rescan and return updated device list
  public func refreshDevices() : async [Types.DeviceInfo] {
    DeviceLib.rescanDevices(devices);
    devices.map<DeviceLib.DeviceState, Types.DeviceInfo>(DeviceLib.toInfo).toArray();
  };
};
