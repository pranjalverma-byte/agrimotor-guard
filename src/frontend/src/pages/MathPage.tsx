import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useMotorStore } from "@/store/motorStore";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Newton's Law Chart ───────────────────────────────────────────────────────

// Hardcoded colors — CSS variables do NOT resolve inside SVG elements
const NEWTON_PRIMARY = "#6366f1";
const NEWTON_AMBIENT = "#94a3b8";
const NEWTON_GRID = "#94a3b8";

function NewtonChart({ T0, Ta, k }: { T0: number; Ta: number; k: number }) {
  const W = 560;
  const H = 220;
  const PAD = { top: 20, right: 30, bottom: 44, left: 52 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  // Guard: if k is 0 or negative, avoid degenerate curves
  const safeK = k > 0 ? k : 0.001;

  const steps = 100;
  const temps = Array.from(
    { length: steps + 1 },
    (_, i) => Ta + (T0 - Ta) * Math.exp(-safeK * i),
  );

  const minT = Math.min(...temps) - 3;
  const maxT = Math.max(...temps) + 3;
  const rangeT = maxT - minT || 1;

  const toX = (i: number) => PAD.left + (i / steps) * innerW;
  const toY = (temp: number) =>
    PAD.top + innerH - ((temp - minT) / rangeT) * innerH;

  const pathD = temps
    .map(
      (temp, i) =>
        `${i === 0 ? "M" : "L"} ${toX(i).toFixed(2)} ${toY(temp).toFixed(2)}`,
    )
    .join(" ");

  const gradFillD = `${pathD} L ${toX(steps).toFixed(2)} ${H - PAD.bottom} L ${toX(0).toFixed(2)} ${H - PAD.bottom} Z`;

  const gridTemps = Array.from(
    { length: 5 },
    (_, i) => minT + (i / 4) * rangeT,
  );
  const timeLabels = [0, 20, 40, 60, 80, 100];

  return (
    <div style={{ width: "100%", minHeight: 220 }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={H}
        aria-label="Newton's Law of Cooling graph"
        role="img"
      >
        <title>Newton&apos;s Law of Cooling</title>
        <defs>
          <linearGradient id="newtonGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={NEWTON_PRIMARY} stopOpacity="0.25" />
            <stop offset="100%" stopColor={NEWTON_PRIMARY} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {gridTemps.map((t) => (
          <line
            key={`hg-${t.toFixed(1)}`}
            x1={PAD.left}
            x2={W - PAD.right}
            y1={toY(t)}
            y2={toY(t)}
            stroke={NEWTON_GRID}
            strokeOpacity="0.15"
            strokeWidth="1"
          />
        ))}
        {/* Vertical grid lines */}
        {timeLabels.map((t) => (
          <line
            key={`vg-${t}`}
            x1={toX(t)}
            x2={toX(t)}
            y1={PAD.top}
            y2={H - PAD.bottom}
            stroke={NEWTON_GRID}
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        <line
          x1={PAD.left}
          y1={PAD.top}
          x2={PAD.left}
          y2={H - PAD.bottom}
          stroke={NEWTON_GRID}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <line
          x1={PAD.left}
          y1={H - PAD.bottom}
          x2={W - PAD.right}
          y2={H - PAD.bottom}
          stroke={NEWTON_GRID}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />

        {/* Gradient fill under curve */}
        <path d={gradFillD} fill="url(#newtonGrad)" />

        {/* Decay curve */}
        <path
          d={pathD}
          fill="none"
          stroke={NEWTON_PRIMARY}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Ambient temperature dashed line */}
        <line
          x1={PAD.left}
          y1={toY(Ta)}
          x2={W - PAD.right}
          y2={toY(Ta)}
          stroke={NEWTON_AMBIENT}
          strokeWidth="1.5"
          strokeDasharray="5 4"
          strokeOpacity="0.7"
        />

        {/* Y-axis labels */}
        {gridTemps.map((t) => (
          <text
            key={`yl-${t.toFixed(1)}`}
            x={PAD.left - 6}
            y={toY(t) + 4}
            textAnchor="end"
            fontSize="10"
            fill={NEWTON_GRID}
            opacity="0.8"
          >
            {t.toFixed(0)}°
          </text>
        ))}

        {/* X-axis labels */}
        {timeLabels.map((t) => (
          <text
            key={`xl-${t}`}
            x={toX(t)}
            y={H - PAD.bottom + 14}
            textAnchor="middle"
            fontSize="10"
            fill={NEWTON_GRID}
            opacity="0.8"
          >
            {t}
          </text>
        ))}

        {/* Axis titles */}
        <text
          x={PAD.left + innerW / 2}
          y={H - 4}
          textAnchor="middle"
          fontSize="10"
          fill={NEWTON_GRID}
          opacity="0.7"
        >
          Time (minutes)
        </text>
        <text
          x={12}
          y={PAD.top + innerH / 2}
          textAnchor="middle"
          fontSize="10"
          fill={NEWTON_GRID}
          opacity="0.7"
          transform={`rotate(-90, 12, ${PAD.top + innerH / 2})`}
        >
          Temp (°C)
        </text>

        {/* Legend */}
        <line
          x1={W - PAD.right - 120}
          y1={PAD.top + 8}
          x2={W - PAD.right - 104}
          y2={PAD.top + 8}
          stroke={NEWTON_PRIMARY}
          strokeWidth="2.5"
        />
        <text
          x={W - PAD.right - 100}
          y={PAD.top + 12}
          fontSize="10"
          fill={NEWTON_PRIMARY}
        >
          T(t) — Cooling curve
        </text>
        <line
          x1={W - PAD.right - 120}
          y1={PAD.top + 24}
          x2={W - PAD.right - 104}
          y2={PAD.top + 24}
          stroke={NEWTON_AMBIENT}
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <text
          x={W - PAD.right - 100}
          y={PAD.top + 28}
          fontSize="10"
          fill={NEWTON_AMBIENT}
        >
          Tₐ = {Ta}°C (ambient)
        </text>
      </svg>
    </div>
  );
}

// ─── Linear Regression Chart ──────────────────────────────────────────────────

function LinearRegressionChart({ history }: { history: number[] }) {
  const data =
    history.length >= 2
      ? history
      : Array.from({ length: 10 }, (_, i) => 38 + i * 0.4);

  const n = data.length;
  const xs = data.map((_, i) => i);
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = data.reduce((a, b) => a + b, 0) / n;
  const num = xs.reduce(
    (acc, x, i) => acc + (x - meanX) * (data[i] - meanY),
    0,
  );
  const den = xs.reduce((acc, x) => acc + (x - meanX) ** 2, 0) || 1;
  const slope = num / den;
  const intercept = meanY - slope * meanX;
  const regLine = xs.map((x) => intercept + slope * x);

  const W = 560;
  const H = 200;
  const PAD = { top: 16, right: 100, bottom: 40, left: 48 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const allVals = [...data, ...regLine];
  const minV = Math.min(...allVals) - 2;
  const maxV = Math.max(...allVals) + 2;
  const rangeV = maxV - minV || 1;

  const toX = (i: number) => PAD.left + (i / (n - 1)) * innerW;
  const toY = (v: number) => PAD.top + innerH - ((v - minV) / rangeV) * innerH;

  const actualPath = data
    .map(
      (v, i) =>
        `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`,
    )
    .join(" ");
  const regPath = `M ${toX(0).toFixed(1)} ${toY(regLine[0]).toFixed(1)} L ${toX(n - 1).toFixed(1)} ${toY(regLine[n - 1]).toFixed(1)}`;
  const gridVals = Array.from({ length: 5 }, (_, i) => minV + (i / 4) * rangeV);
  const xLabels = [
    0,
    Math.floor(n / 4),
    Math.floor(n / 2),
    Math.floor((3 * n) / 4),
    n - 1,
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ maxHeight: 220 }}
      aria-label="Linear Regression temperature chart"
      role="img"
    >
      <title>Linear Regression</title>

      {gridVals.map((v) => (
        <line
          key={`hg-${v.toFixed(1)}`}
          x1={PAD.left}
          x2={W - PAD.right}
          y1={toY(v)}
          y2={toY(v)}
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
      ))}

      <line
        x1={PAD.left}
        y1={PAD.top}
        x2={PAD.left}
        y2={H - PAD.bottom}
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <line
        x1={PAD.left}
        y1={H - PAD.bottom}
        x2={W - PAD.right}
        y2={H - PAD.bottom}
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1"
      />

      <path
        d={regPath}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinecap="round"
      />
      <path
        d={actualPath}
        fill="none"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {data.map((v, i) => (
        <circle
          key={`dot-${v.toFixed(2)}-${i}`}
          cx={toX(i)}
          cy={toY(v)}
          r="2.5"
          fill="#f97316"
          opacity="0.7"
        />
      ))}

      {gridVals.map((v) => (
        <text
          key={`yl-${v.toFixed(1)}`}
          x={PAD.left - 6}
          y={toY(v) + 4}
          textAnchor="end"
          fontSize="10"
          fill="currentColor"
          opacity="0.55"
        >
          {v.toFixed(0)}°
        </text>
      ))}
      {xLabels.map((i) => (
        <text
          key={`xl-${i}`}
          x={toX(i)}
          y={H - PAD.bottom + 14}
          textAnchor="middle"
          fontSize="10"
          fill="currentColor"
          opacity="0.55"
        >
          t{i}
        </text>
      ))}

      <text
        x={PAD.left + innerW / 2}
        y={H - 4}
        textAnchor="middle"
        fontSize="10"
        fill="currentColor"
        opacity="0.5"
      >
        Time Index
      </text>
      <text
        x={11}
        y={PAD.top + innerH / 2}
        textAnchor="middle"
        fontSize="10"
        fill="currentColor"
        opacity="0.5"
        transform={`rotate(-90, 11, ${PAD.top + innerH / 2})`}
      >
        Temp (°C)
      </text>

      {/* Legend */}
      <line
        x1={W - 95}
        y1={PAD.top + 8}
        x2={W - 79}
        y2={PAD.top + 8}
        stroke="#3b82f6"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <text
        x={W - 75}
        y={PAD.top + 12}
        fontSize="9"
        fill="#3b82f6"
        opacity="0.85"
      >
        Regression
      </text>
      <line
        x1={W - 95}
        y1={PAD.top + 22}
        x2={W - 79}
        y2={PAD.top + 22}
        stroke="#f97316"
        strokeWidth="2.5"
      />
      <text
        x={W - 75}
        y={PAD.top + 26}
        fontSize="9"
        fill="#f97316"
        opacity="0.85"
      >
        Actual
      </text>
    </svg>
  );
}

// ─── Matrix bracket display ───────────────────────────────────────────────────

function MatrixDisplay({
  rows,
}: {
  rows: { label: string; desc: string; value: string }[];
}) {
  const midRows = rows.slice(1, -1);
  return (
    <div className="flex items-stretch gap-2 font-mono">
      <div className="flex flex-col justify-between text-3xl text-muted-foreground select-none leading-none py-1">
        <span>⎡</span>
        {midRows.map((r) => (
          <span key={r.label}>⎢</span>
        ))}
        <span>⎣</span>
      </div>

      <div className="flex-1 border border-border/30 rounded-lg bg-muted/20">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={cn(
              "flex items-center gap-4 px-4 py-2.5",
              i < rows.length - 1 && "border-b border-border/20",
            )}
          >
            <span className="w-10 text-sm font-bold text-primary">
              {row.label}
            </span>
            <span className="flex-1 text-xs text-muted-foreground">
              {row.desc}
            </span>
            <span className="text-sm font-bold text-foreground tabular-nums">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between text-3xl text-muted-foreground select-none leading-none py-1">
        <span>⎤</span>
        {midRows.map((r) => (
          <span key={r.label}>⎥</span>
        ))}
        <span>⎦</span>
      </div>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  subtitle,
  badge,
  children,
  delay = 0,
  ocid,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  delay?: number;
  ocid: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card rounded-2xl border border-border p-6 shadow-card"
      data-ocid={ocid}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <div>
          <h2 className="font-display font-bold text-foreground text-base">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {badge && (
          <Badge variant="outline" className="text-[10px] shrink-0">
            {badge}
          </Badge>
        )}
      </div>
      <div className="mt-4 border-t border-border/50 pt-4">{children}</div>
    </motion.div>
  );
}

function FormulaBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-sm bg-muted/50 border border-border/60 rounded-xl px-5 py-3 text-foreground tracking-wide overflow-x-auto">
      {children}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function MathPage() {
  const motor1 = useMotorStore((s) => s.motor1);
  const motor2 = useMotorStore((s) => s.motor2);

  const [T0, setT0] = useState(80);
  const [Ta, setTa] = useState(25);
  const [k, setK] = useState(0.05);

  const baseTemp = motor1.temperature;
  const history: number[] = Array.from(
    { length: 20 },
    (_, i) =>
      Math.round((baseTemp - 8 + i * 0.55 + (((i * 7) % 5) - 2.5) * 0.6) * 10) /
      10,
  );

  const THRESHOLD = 60;

  const thresholdRows = [
    { motor: "Motor 1", temp: motor1.temperature, isOn: motor1.isOn },
    { motor: "Motor 2", temp: motor2.temperature, isOn: motor2.isOn },
  ];

  const matrixRows = [
    {
      label: "T₁",
      desc: "Motor 1 Temperature",
      value: `${motor1.temperature.toFixed(1)} °C`,
    },
    {
      label: "T₂",
      desc: "Motor 2 Temperature",
      value: `${motor2.temperature.toFixed(1)} °C`,
    },
    {
      label: "RPM₁",
      desc: "Motor 1 Speed",
      value: `${motor1.isOn ? (motor1.rpm ?? 0) : 0} RPM`,
    },
    {
      label: "RPM₂",
      desc: "Motor 2 Speed",
      value: `${motor2.isOn ? (motor2.rpm ?? 0) : 0} RPM`,
    },
    {
      label: "I₁",
      desc: "Motor 1 Current",
      value: `${motor1.isOn ? (motor1.current ?? 0).toFixed(1) : "0.0"} A`,
    },
    {
      label: "I₂",
      desc: "Motor 2 Current",
      value: `${motor2.isOn ? (motor2.current ?? 0).toFixed(1) : "0.0"} A`,
    },
  ];

  return (
    <div className="space-y-6" data-ocid="math.page">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-2xl text-foreground"
        >
          Mathematical Models
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground mt-1"
        >
          Formulas and algorithms powering AgriMotor Guard's analytics engine
        </motion.p>
      </div>

      {/* SECTION 1 — Newton's Law of Cooling */}
      <SectionCard
        title="Newton's Law of Cooling"
        subtitle="Models temperature decay of a motor over time"
        badge="Thermodynamics"
        delay={0.05}
        ocid="math.newton_section"
      >
        <FormulaBlock>
          T(t) = T<sub>a</sub> + (T<sub>0</sub> − T<sub>a</sub>) · e
          <sup>−k·t</sup>
        </FormulaBlock>

        <div
          className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
          data-ocid="math.newton_inputs"
        >
          <div className="space-y-1.5">
            <Label htmlFor="T0" className="text-xs">
              Initial Temperature T₀ (°C)
            </Label>
            <Input
              id="T0"
              type="number"
              value={T0}
              onChange={(e) => setT0(Number(e.target.value))}
              className="h-8 text-sm"
              data-ocid="math.newton_t0_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="Ta" className="text-xs">
              Ambient Temperature T_a (°C)
            </Label>
            <Input
              id="Ta"
              type="number"
              value={Ta}
              onChange={(e) => setTa(Number(e.target.value))}
              className="h-8 text-sm"
              data-ocid="math.newton_ta_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="k" className="text-xs">
              Cooling Constant k
            </Label>
            <Input
              id="k"
              type="number"
              step="0.001"
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              className="h-8 text-sm"
              data-ocid="math.newton_k_input"
            />
          </div>
        </div>

        <div className="mt-5">
          <NewtonChart T0={T0} Ta={Ta} k={k} />
        </div>
      </SectionCard>

      {/* SECTION 2 — Linear Regression */}
      <SectionCard
        title="Linear Regression — Temperature Prediction"
        subtitle="Least-squares fit on motor temperature history to predict trend"
        badge="Statistics"
        delay={0.1}
        ocid="math.regression_section"
      >
        <FormulaBlock>
          T<sub>pred</sub> = a + b · t &nbsp;&nbsp;|&nbsp;&nbsp; b = Σ(xᵢ −
          x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)²
        </FormulaBlock>
        <p className="text-xs text-muted-foreground mt-2 mb-4">
          The regression line (blue, dotted) is computed via ordinary least
          squares on Motor 1's temperature history. The orange curve shows
          actual recorded temperatures.
        </p>
        <LinearRegressionChart history={history} />
      </SectionCard>

      {/* SECTION 3 — Matrix Representation */}
      <SectionCard
        title="Matrix Representation — System State"
        subtitle="State vector representing the complete system state at time t"
        badge="Linear Algebra"
        delay={0.15}
        ocid="math.matrix_section"
      >
        <FormulaBlock>
          x = [T₁, T₂, RPM₁, RPM₂, I₁, I₂]<sup>T</sup>
        </FormulaBlock>
        <p className="text-xs text-muted-foreground mt-2 mb-4">
          The system state vector encodes all observable motor parameters. Live
          values update every 2 seconds from sensor simulation.
        </p>
        <MatrixDisplay rows={matrixRows} />
      </SectionCard>

      {/* SECTION 4 — Threshold Analysis */}
      <SectionCard
        title="Threshold Analysis"
        subtitle="Real-time safety status for both motors based on temperature thresholds"
        badge="Safety"
        delay={0.2}
        ocid="math.threshold_section"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="math.threshold_table">
            <thead>
              <tr className="text-left border-b border-border">
                {[
                  "Motor",
                  "Current Temp (°C)",
                  "Threshold (°C)",
                  "Margin (°C)",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className={cn(
                      "pb-2.5 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                      h !== "Motor" && h !== "Status" && "text-right",
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {thresholdRows.map((row, i) => {
                const margin = THRESHOLD - row.temp;
                const isSafe = row.temp < THRESHOLD;
                return (
                  <tr
                    key={row.motor}
                    className={cn(
                      "border-b border-border/40",
                      i === thresholdRows.length - 1 && "border-b-0",
                    )}
                    data-ocid={`math.threshold_row.${i + 1}`}
                  >
                    <td className="py-3 pr-4">
                      <div className="font-semibold text-foreground">
                        {row.motor}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {row.isOn ? "Active" : "Standby"}
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-right font-mono font-bold text-foreground tabular-nums">
                      {row.temp.toFixed(1)}
                    </td>
                    <td className="py-3 pr-4 text-right font-mono text-muted-foreground tabular-nums">
                      {THRESHOLD}
                    </td>
                    <td
                      className={cn(
                        "py-3 pr-4 text-right font-mono font-semibold tabular-nums",
                        isSafe
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive",
                      )}
                    >
                      {margin > 0 ? "+" : ""}
                      {margin.toFixed(1)}
                    </td>
                    <td className="py-3">
                      {isSafe ? (
                        <Badge
                          className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700"
                          variant="outline"
                          data-ocid={`math.threshold_status.${i + 1}`}
                        >
                          ✓ Safe — Keep Running
                        </Badge>
                      ) : (
                        <Badge
                          variant="destructive"
                          className="text-[10px] px-2 py-0.5"
                          data-ocid={`math.threshold_status.${i + 1}`}
                        >
                          ⚠ Warning — Overheat
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
