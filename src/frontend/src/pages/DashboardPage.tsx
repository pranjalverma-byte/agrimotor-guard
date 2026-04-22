import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMotorStore } from "@/store/motorStore";
import type { TempHorizon } from "@/types";
import {
  Activity,
  AlertTriangle,
  ArrowLeftRight,
  Thermometer,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// Sparkline SVG mini-chart
function Sparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 200;
  const h = 40;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-10 text-primary"
      aria-hidden="true"
      role="presentation"
    >
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

// Temperature prediction mini chart
function PredictionChart({
  data,
  label,
}: {
  data: { time: string; temp: number }[];
  label: string;
}) {
  const temps = data.map((d) => d.temp);
  const min = Math.min(...temps) - 2;
  const max = Math.max(...temps) + 2;
  const range = max - min;
  const w = 300;
  const h = 80;

  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((d.temp - min) / range) * (h - 10) - 5;
      return `${x},${y}`;
    })
    .join(" ");

  const area = `0,${h} ${pts} ${w},${h}`;

  return (
    <div className="mt-3">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-20 text-primary"
        aria-label={label}
        role="img"
      >
        <title>{label}</title>
        <defs>
          <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-primary)"
              stopOpacity="0.2"
            />
            <stop
              offset="100%"
              stopColor="var(--color-primary)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#tempGrad)" />
        <polyline
          points={pts}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {data.map((d) => {
          const idx = data.indexOf(d);
          const x = (idx / (data.length - 1)) * w;
          const y = h - ((d.temp - min) / range) * (h - 10) - 5;
          return (
            <circle
              key={d.time}
              cx={x}
              cy={y}
              r="3"
              fill="currentColor"
              className="opacity-80"
            />
          );
        })}
      </svg>
      <div className="flex justify-between mt-1">
        {data.map((d) => (
          <div key={d.time} className="text-center">
            <p className="text-xs font-semibold text-foreground">{d.temp}°</p>
            <p className="text-[10px] text-muted-foreground">{d.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function generatePrediction(baseTemp: number, horizon: TempHorizon) {
  const steps: Record<TempHorizon, { time: string; mins: number }[]> = {
    15: [
      { time: "5m", mins: 5 },
      { time: "10m", mins: 10 },
      { time: "15m", mins: 15 },
    ],
    30: [
      { time: "10m", mins: 10 },
      { time: "20m", mins: 20 },
      { time: "30m", mins: 30 },
    ],
    60: [
      { time: "15m", mins: 15 },
      { time: "30m", mins: 30 },
      { time: "45m", mins: 45 },
      { time: "1hr", mins: 60 },
    ],
    120: [
      { time: "30m", mins: 30 },
      { time: "1hr", mins: 60 },
      { time: "1.5hr", mins: 90 },
      { time: "2hr", mins: 120 },
    ],
  };
  return steps[horizon].map(({ time, mins }) => ({
    time,
    temp:
      Math.round(
        (baseTemp + (mins / 60) * 4.2 + (Math.random() - 0.3) * 1.5) * 10,
      ) / 10,
  }));
}

interface MotorCardProps {
  motorId: 1 | 2;
}

function MotorCard({ motorId }: MotorCardProps) {
  const motor = useMotorStore((s) => (motorId === 1 ? s.motor1 : s.motor2));
  const isOverheat = motor.temperature > 55;
  const isWarming = motor.temperature > 48;

  // Generate sparkline history data
  const sparkData = Array.from(
    { length: 20 },
    (_, i) =>
      Math.round(
        (motor.temperature - 5 + i * 0.3 + (Math.random() - 0.5) * 2) * 10,
      ) / 10,
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (motorId - 1) * 0.1 }}
      className={cn(
        "bg-card rounded-2xl border p-5 shadow-card transition-smooth",
        isOverheat
          ? "border-destructive/50 ring-1 ring-destructive/20"
          : isWarming
            ? "border-accent/40"
            : "border-border",
      )}
      data-ocid={`motor.card.${motorId}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            {motorId === 1 ? "Motor 1" : "Motor 2"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[160px]">
            {motor.name}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {motor.isOn && (
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="inline-block w-2 h-2 rounded-full bg-secondary"
            />
          )}
          <Badge
            variant={motor.isOn ? "secondary" : "outline"}
            className={cn(
              "text-[10px] font-semibold px-2 py-0.5",
              motor.isOn
                ? "bg-secondary/20 text-secondary-foreground border-secondary/30"
                : "text-muted-foreground",
            )}
          >
            {motor.isOn ? "RUNNING" : "STANDBY"}
          </Badge>
        </div>
      </div>

      {/* Temperature */}
      <div className="mb-3">
        <div className="flex items-end gap-1">
          <span
            className={cn(
              "text-4xl font-display font-bold tracking-tight",
              isOverheat
                ? "text-destructive"
                : isWarming
                  ? "text-accent"
                  : "text-foreground",
            )}
          >
            {motor.temperature.toFixed(1)}
          </span>
          <span className="text-lg font-medium text-muted-foreground mb-1">
            °C
          </span>
        </div>
        {isOverheat && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-1.5 mt-1 text-xs text-destructive font-medium"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Overheating detected
          </motion.div>
        )}
      </div>

      {/* Sparkline */}
      <div className="mb-3">
        <p className="text-[10px] text-muted-foreground mb-1">Last hour</p>
        <Sparkline data={sparkData} />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {motor.isOn ? (motor.current ?? 0).toFixed(1) : "0.0"} A
          </p>
          <p className="text-[10px] text-muted-foreground">Current</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {motor.isOn ? (motor.rpm ?? 0) : 0} RPM
          </p>
          <p className="text-[10px] text-muted-foreground">Speed</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {motor.runtimeHours ?? 0} hrs
          </p>
          <p className="text-[10px] text-muted-foreground">Runtime</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const {
    motor1,
    motor2,
    alerts,
    clearAlert,
    switchMotors,
    setIsSwitching,
    isSwitching,
  } = useMotorStore();
  const [predHorizon, setPredHorizon] = useState<TempHorizon>(60);
  const predData = generatePrediction(
    motor1.isOn ? motor1.temperature : motor2.temperature,
    predHorizon,
  );
  const horizons: TempHorizon[] = [15, 30, 60, 120];
  const horizonLabels: Record<TempHorizon, string> = {
    15: "15 min",
    30: "30 min",
    60: "1 hr",
    120: "2 hrs",
  };

  const handleSwitch = () => {
    setIsSwitching(true);
    setTimeout(() => switchMotors(), 800);
  };

  // Auto-dismiss alerts when all motors cool below threshold
  const OVERHEAT_THRESHOLD = 60;
  useEffect(() => {
    const allCool =
      motor1.temperature < OVERHEAT_THRESHOLD &&
      motor2.temperature < OVERHEAT_THRESHOLD;
    if (allCool && alerts.length > 0) {
      for (const alert of alerts) {
        clearAlert(alert.id);
      }
    }
  }, [motor1.temperature, motor2.temperature, alerts, clearAlert]);

  const activeCount = [motor1, motor2].filter((m) => m.isOn).length;

  return (
    <div className="space-y-6" data-ocid="dashboard.page">
      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Active Motors",
            value: `${activeCount}/2`,
            icon: Activity,
            color: "text-secondary",
          },
          {
            label: "Critical Alerts",
            value: String(
              alerts.filter((a) => a.severity === "critical").length,
            ),
            icon: AlertTriangle,
            color: "text-destructive",
          },
          {
            label: "Motor 1 Temp",
            value: `${motor1.temperature.toFixed(1)}°C`,
            icon: Thermometer,
            color:
              motor1.temperature > 55 ? "text-destructive" : "text-primary",
          },
          {
            label: "Motor 2 Temp",
            value: `${motor2.temperature.toFixed(1)}°C`,
            icon: Thermometer,
            color:
              motor2.temperature > 55 ? "text-destructive" : "text-primary",
          },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <div
            key={label}
            className="bg-card rounded-xl border border-border px-4 py-3 shadow-card"
            data-ocid={`dashboard.summary.item.${i + 1}`}
          >
            <div className="flex items-center gap-2">
              <Icon className={cn("w-4 h-4", color)} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <p className={cn("text-xl font-display font-bold mt-1", color)}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Motor cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MotorCard motorId={1} />
          <MotorCard motorId={2} />

          {/* Control panel */}
          <div
            className="sm:col-span-2 bg-card rounded-2xl border border-border p-5 shadow-card"
            data-ocid="control.panel"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="font-display font-semibold text-foreground text-sm">
                  Motor Control
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {motor1.isOn
                    ? "Motor 1 is active — Motor 2 on standby"
                    : "Motor 2 is active — Motor 1 on standby"}
                </p>
              </div>
              <motion.div
                animate={isSwitching ? { rotate: [0, 180, 360] } : {}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Button
                  onClick={handleSwitch}
                  disabled={isSwitching}
                  className="gap-2 rounded-xl font-semibold"
                  data-ocid="control.switch_button"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  {isSwitching ? "Switching…" : "Switch Motor"}
                </Button>
              </motion.div>
            </div>

            {/* Visual indicator */}
            <div className="mt-4 flex items-center gap-3">
              {[motor1, motor2].map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex-1 flex items-center gap-2 rounded-xl px-3 py-2 border transition-smooth",
                    m.isOn
                      ? "bg-secondary/10 border-secondary/30"
                      : "bg-muted/30 border-border",
                  )}
                >
                  <Zap
                    className={cn(
                      "w-4 h-4",
                      m.isOn ? "text-secondary" : "text-muted-foreground",
                    )}
                  />
                  <span className="text-xs font-medium text-foreground">
                    Motor {m.id}
                  </span>
                  <span
                    className={cn(
                      "ml-auto text-[10px] font-semibold",
                      m.isOn ? "text-secondary" : "text-muted-foreground",
                    )}
                  >
                    {m.isOn ? "ON" : "OFF"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Temperature Prediction */}
          <div
            className="bg-card rounded-2xl border border-border p-5 shadow-card"
            data-ocid="prediction.panel"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="font-display font-semibold text-foreground text-sm">
                Temp Prediction
              </h3>
            </div>

            {/* Horizon selector */}
            <div
              className="flex gap-1.5 flex-wrap"
              data-ocid="prediction.horizon_selector"
            >
              {horizons.map((h) => (
                <button
                  type="button"
                  key={h}
                  onClick={() => setPredHorizon(h)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-smooth",
                    predHorizon === h
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80",
                  )}
                  data-ocid={`prediction.horizon_${h}`}
                >
                  {horizonLabels[h]}
                </button>
              ))}
            </div>

            <PredictionChart
              data={predData}
              label={`Temperature prediction for ${horizonLabels[predHorizon]}`}
            />

            <div className="mt-3 p-2.5 rounded-xl bg-primary/8 border border-primary/15">
              <p className="text-xs text-muted-foreground">
                Expected at {horizonLabels[predHorizon]}
              </p>
              <p className="text-lg font-display font-bold text-primary">
                {predData[predData.length - 1]?.temp.toFixed(1)}°C
              </p>
            </div>
          </div>

          {/* Alert System */}
          <div
            className="bg-card rounded-2xl border border-border p-5 shadow-card"
            data-ocid="alerts.panel"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <h3 className="font-display font-semibold text-foreground text-sm">
                  Alert System
                </h3>
              </div>
              {alerts.length > 0 && (
                <Badge
                  variant="destructive"
                  className="text-[10px] px-1.5 py-0.5"
                >
                  {alerts.length}
                </Badge>
              )}
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              <AnimatePresence>
                {alerts.length === 0 ? (
                  <div
                    className="text-center py-6 text-muted-foreground"
                    data-ocid="alerts.empty_state"
                  >
                    <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-xs">All systems nominal</p>
                  </div>
                ) : (
                  alerts.map((alert, i) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                        "flex items-start gap-2.5 p-2.5 rounded-xl border text-xs",
                        alert.severity === "critical"
                          ? "bg-destructive/8 border-destructive/20"
                          : "bg-accent/10 border-accent/25",
                      )}
                      data-ocid={`alerts.item.${i + 1}`}
                    >
                      <AlertTriangle
                        className={cn(
                          "w-3.5 h-3.5 mt-0.5 shrink-0",
                          alert.severity === "critical"
                            ? "text-destructive"
                            : "text-accent",
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">
                          {alert.motorName}
                        </p>
                        <p className="text-muted-foreground leading-snug mt-0.5">
                          {alert.message}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => clearAlert(alert.id)}
                        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Dismiss alert"
                        data-ocid={`alerts.close_button.${i + 1}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
