import List "mo:core/List";
import MotorLib "lib/motor";
import DeviceLib "lib/device";
import MotorApi "mixins/motor-api";
import DeviceApi "mixins/device-api";

actor {
  // --- Motor state: Motor 1 starts ON (~45°C), Motor 2 starts OFF (~30°C) ---
  let motors : List.List<MotorLib.MotorState> = List.fromArray([
    MotorLib.newMotor(1, true, 45.0),
    MotorLib.newMotor(2, false, 30.0),
  ]);

  // --- Device state: 3 simulated ESP32 devices ---
  let devices : List.List<DeviceLib.DeviceState> = List.fromArray([
    DeviceLib.newDevice("esp32-1", "ESP32-1", true, 87),
    DeviceLib.newDevice("esp32-2", "ESP32-2", true, 63),
    DeviceLib.newDevice("esp32-3", "ESP32-3", false, 0),
  ]);

  // --- Include mixins ---
  include MotorApi(motors);
  include DeviceApi(devices);
};
