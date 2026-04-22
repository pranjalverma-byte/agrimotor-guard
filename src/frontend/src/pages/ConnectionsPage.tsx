import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeviceStore } from "@/store/deviceStore";
import { RefreshCw, Signal, Wifi, WifiOff } from "lucide-react";
import { motion } from "motion/react";

function SignalBars({ strength }: { strength: number }) {
  const bars = [25, 50, 75, 100];
  return (
    <div
      className="flex items-end gap-0.5 h-4"
      aria-label={`Signal: ${strength}%`}
    >
      {bars.map((threshold, barIdx) => (
        <div
          key={threshold}
          className={cn(
            "w-1.5 rounded-sm transition-smooth",
            strength >= threshold ? "bg-secondary" : "bg-muted",
          )}
          style={{ height: `${40 + barIdx * 20}%` }}
        />
      ))}
    </div>
  );
}

export default function ConnectionsPage() {
  const { devices, isScanning, lastRefreshed, refreshDevices } =
    useDeviceStore();
  const connectedCount = devices.filter((d) => d.connected).length;

  const formattedTime = lastRefreshed
    ? new Date(lastRefreshed).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "—";

  return (
    <div className="space-y-6" data-ocid="connections.page">
      {/* Page header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground tracking-tight">
            Connected Devices
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {connectedCount} of {devices.length} ESP devices online
            {lastRefreshed && (
              <span className="ml-2 text-xs">· Last scan {formattedTime}</span>
            )}
          </p>
        </div>
        <Button
          onClick={refreshDevices}
          disabled={isScanning}
          variant="outline"
          className="gap-2 rounded-xl"
          data-ocid="connections.refresh_button"
        >
          <RefreshCw className={cn("w-4 h-4", isScanning && "animate-spin")} />
          {isScanning ? "Scanning…" : "Refresh Scan"}
        </Button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          {
            label: "Total Devices",
            value: devices.length,
            icon: Signal,
            color: "text-primary",
          },
          {
            label: "Online",
            value: connectedCount,
            icon: Wifi,
            color: "text-secondary",
          },
          {
            label: "Offline",
            value: devices.length - connectedCount,
            icon: WifiOff,
            color: "text-destructive",
          },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <div
            key={label}
            className="bg-card rounded-xl border border-border px-4 py-3 shadow-card"
            data-ocid={`connections.summary.item.${i + 1}`}
          >
            <div className="flex items-center gap-2">
              <Icon className={cn("w-4 h-4", color)} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <p className={cn("text-2xl font-display font-bold mt-1", color)}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Device grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        data-ocid="connections.device_list"
      >
        {devices.map((device, i) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={cn(
              "bg-card rounded-2xl border p-4 shadow-card transition-smooth",
              device.connected
                ? "border-border hover:border-secondary/40 hover:shadow-elevated"
                : "border-border opacity-70",
            )}
            data-ocid={`connections.device.item.${i + 1}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center",
                    device.connected ? "bg-secondary/15" : "bg-muted/60",
                  )}
                >
                  {device.connected ? (
                    <Wifi className="w-4 h-4 text-secondary" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {device.name.split(" — ")[0]}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {device.name.split(" — ")[1] ?? device.id}
                  </p>
                </div>
              </div>
              <Badge
                variant={device.connected ? "secondary" : "outline"}
                className={cn(
                  "text-[10px] font-semibold shrink-0",
                  device.connected
                    ? "bg-secondary/15 text-secondary-foreground border-secondary/25"
                    : "text-muted-foreground",
                )}
              >
                {device.connected ? "Online" : "Offline"}
              </Badge>
            </div>

            {/* Signal */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <SignalBars strength={device.signalStrength} />
                <span className="text-xs text-muted-foreground">
                  {device.connected ? `${device.signalStrength}%` : "No signal"}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                {device.id.toUpperCase()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scanning overlay */}
      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none"
          data-ocid="connections.loading_state"
        >
          <div className="bg-card rounded-2xl border border-border shadow-elevated px-8 py-6 text-center">
            <RefreshCw className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
            <p className="font-semibold text-foreground text-sm">
              Scanning for devices…
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Broadcasting discovery signal
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
