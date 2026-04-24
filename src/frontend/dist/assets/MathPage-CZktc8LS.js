import { e as useMotorStore, r as reactExports, j as jsxRuntimeExports, b as cn, f as Badge } from "./index-D9P-KIO5.js";
import { L as Label, I as Input } from "./label-GCOsfg4S.js";
import { m as motion } from "./proxy-Dmz4vUEZ.js";
const NEWTON_PRIMARY = "#6366f1";
const NEWTON_AMBIENT = "#94a3b8";
const NEWTON_GRID = "#94a3b8";
function NewtonChart({ T0, Ta, k }) {
  const W = 560;
  const H = 220;
  const PAD = { top: 20, right: 30, bottom: 44, left: 52 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const safeK = k > 0 ? k : 1e-3;
  const steps = 100;
  const temps = Array.from(
    { length: steps + 1 },
    (_, i) => Ta + (T0 - Ta) * Math.exp(-safeK * i)
  );
  const minT = Math.min(...temps) - 3;
  const maxT = Math.max(...temps) + 3;
  const rangeT = maxT - minT || 1;
  const toX = (i) => PAD.left + i / steps * innerW;
  const toY = (temp) => PAD.top + innerH - (temp - minT) / rangeT * innerH;
  const pathD = temps.map(
    (temp, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(2)} ${toY(temp).toFixed(2)}`
  ).join(" ");
  const gradFillD = `${pathD} L ${toX(steps).toFixed(2)} ${H - PAD.bottom} L ${toX(0).toFixed(2)} ${H - PAD.bottom} Z`;
  const gridTemps = Array.from(
    { length: 5 },
    (_, i) => minT + i / 4 * rangeT
  );
  const timeLabels = [0, 20, 40, 60, 80, 100];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", minHeight: 220 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      height: H,
      "aria-label": "Newton's Law of Cooling graph",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Newton's Law of Cooling" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "newtonGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: NEWTON_PRIMARY, stopOpacity: "0.25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: NEWTON_PRIMARY, stopOpacity: "0.02" })
        ] }) }),
        gridTemps.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: PAD.left,
            x2: W - PAD.right,
            y1: toY(t),
            y2: toY(t),
            stroke: NEWTON_GRID,
            strokeOpacity: "0.15",
            strokeWidth: "1"
          },
          `hg-${t.toFixed(1)}`
        )),
        timeLabels.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: toX(t),
            x2: toX(t),
            y1: PAD.top,
            y2: H - PAD.bottom,
            stroke: NEWTON_GRID,
            strokeOpacity: "0.12",
            strokeWidth: "1"
          },
          `vg-${t}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: PAD.left,
            y1: PAD.top,
            x2: PAD.left,
            y2: H - PAD.bottom,
            stroke: NEWTON_GRID,
            strokeOpacity: "0.4",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: PAD.left,
            y1: H - PAD.bottom,
            x2: W - PAD.right,
            y2: H - PAD.bottom,
            stroke: NEWTON_GRID,
            strokeOpacity: "0.4",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: gradFillD, fill: "url(#newtonGrad)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: pathD,
            fill: "none",
            stroke: NEWTON_PRIMARY,
            strokeWidth: "2.5",
            strokeLinejoin: "round",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: PAD.left,
            y1: toY(Ta),
            x2: W - PAD.right,
            y2: toY(Ta),
            stroke: NEWTON_AMBIENT,
            strokeWidth: "1.5",
            strokeDasharray: "5 4",
            strokeOpacity: "0.7"
          }
        ),
        gridTemps.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: PAD.left - 6,
            y: toY(t) + 4,
            textAnchor: "end",
            fontSize: "10",
            fill: NEWTON_GRID,
            opacity: "0.8",
            children: [
              t.toFixed(0),
              "°"
            ]
          },
          `yl-${t.toFixed(1)}`
        )),
        timeLabels.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: toX(t),
            y: H - PAD.bottom + 14,
            textAnchor: "middle",
            fontSize: "10",
            fill: NEWTON_GRID,
            opacity: "0.8",
            children: t
          },
          `xl-${t}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: PAD.left + innerW / 2,
            y: H - 4,
            textAnchor: "middle",
            fontSize: "10",
            fill: NEWTON_GRID,
            opacity: "0.7",
            children: "Time (minutes)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: 12,
            y: PAD.top + innerH / 2,
            textAnchor: "middle",
            fontSize: "10",
            fill: NEWTON_GRID,
            opacity: "0.7",
            transform: `rotate(-90, 12, ${PAD.top + innerH / 2})`,
            children: "Temp (°C)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: W - PAD.right - 120,
            y1: PAD.top + 8,
            x2: W - PAD.right - 104,
            y2: PAD.top + 8,
            stroke: NEWTON_PRIMARY,
            strokeWidth: "2.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: W - PAD.right - 100,
            y: PAD.top + 12,
            fontSize: "10",
            fill: NEWTON_PRIMARY,
            children: "T(t) — Cooling curve"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: W - PAD.right - 120,
            y1: PAD.top + 24,
            x2: W - PAD.right - 104,
            y2: PAD.top + 24,
            stroke: NEWTON_AMBIENT,
            strokeWidth: "1.5",
            strokeDasharray: "5 4"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: W - PAD.right - 100,
            y: PAD.top + 28,
            fontSize: "10",
            fill: NEWTON_AMBIENT,
            children: [
              "Tₐ = ",
              Ta,
              "°C (ambient)"
            ]
          }
        )
      ]
    }
  ) });
}
function LinearRegressionChart({ history }) {
  const data = history.length >= 2 ? history : Array.from({ length: 10 }, (_, i) => 38 + i * 0.4);
  const n = data.length;
  const xs = data.map((_, i) => i);
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = data.reduce((a, b) => a + b, 0) / n;
  const num = xs.reduce(
    (acc, x, i) => acc + (x - meanX) * (data[i] - meanY),
    0
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
  const toX = (i) => PAD.left + i / (n - 1) * innerW;
  const toY = (v) => PAD.top + innerH - (v - minV) / rangeV * innerH;
  const actualPath = data.map(
    (v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`
  ).join(" ");
  const regPath = `M ${toX(0).toFixed(1)} ${toY(regLine[0]).toFixed(1)} L ${toX(n - 1).toFixed(1)} ${toY(regLine[n - 1]).toFixed(1)}`;
  const gridVals = Array.from({ length: 5 }, (_, i) => minV + i / 4 * rangeV);
  const xLabels = [
    0,
    Math.floor(n / 4),
    Math.floor(n / 2),
    Math.floor(3 * n / 4),
    n - 1
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      className: "w-full",
      style: { maxHeight: 220 },
      "aria-label": "Linear Regression temperature chart",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Linear Regression" }),
        gridVals.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: PAD.left,
            x2: W - PAD.right,
            y1: toY(v),
            y2: toY(v),
            stroke: "currentColor",
            strokeOpacity: "0.08",
            strokeWidth: "1"
          },
          `hg-${v.toFixed(1)}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: PAD.left,
            y1: PAD.top,
            x2: PAD.left,
            y2: H - PAD.bottom,
            stroke: "currentColor",
            strokeOpacity: "0.25",
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: PAD.left,
            y1: H - PAD.bottom,
            x2: W - PAD.right,
            y2: H - PAD.bottom,
            stroke: "currentColor",
            strokeOpacity: "0.25",
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: regPath,
            fill: "none",
            stroke: "#3b82f6",
            strokeWidth: "2",
            strokeDasharray: "5 4",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: actualPath,
            fill: "none",
            stroke: "#f97316",
            strokeWidth: "2.5",
            strokeLinejoin: "round",
            strokeLinecap: "round"
          }
        ),
        data.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: toX(i),
            cy: toY(v),
            r: "2.5",
            fill: "#f97316",
            opacity: "0.7"
          },
          `dot-${v.toFixed(2)}-${i}`
        )),
        gridVals.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: PAD.left - 6,
            y: toY(v) + 4,
            textAnchor: "end",
            fontSize: "10",
            fill: "currentColor",
            opacity: "0.55",
            children: [
              v.toFixed(0),
              "°"
            ]
          },
          `yl-${v.toFixed(1)}`
        )),
        xLabels.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: toX(i),
            y: H - PAD.bottom + 14,
            textAnchor: "middle",
            fontSize: "10",
            fill: "currentColor",
            opacity: "0.55",
            children: [
              "t",
              i
            ]
          },
          `xl-${i}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: PAD.left + innerW / 2,
            y: H - 4,
            textAnchor: "middle",
            fontSize: "10",
            fill: "currentColor",
            opacity: "0.5",
            children: "Time Index"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: 11,
            y: PAD.top + innerH / 2,
            textAnchor: "middle",
            fontSize: "10",
            fill: "currentColor",
            opacity: "0.5",
            transform: `rotate(-90, 11, ${PAD.top + innerH / 2})`,
            children: "Temp (°C)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: W - 95,
            y1: PAD.top + 8,
            x2: W - 79,
            y2: PAD.top + 8,
            stroke: "#3b82f6",
            strokeWidth: "2",
            strokeDasharray: "5 4"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: W - 75,
            y: PAD.top + 12,
            fontSize: "9",
            fill: "#3b82f6",
            opacity: "0.85",
            children: "Regression"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: W - 95,
            y1: PAD.top + 22,
            x2: W - 79,
            y2: PAD.top + 22,
            stroke: "#f97316",
            strokeWidth: "2.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: W - 75,
            y: PAD.top + 26,
            fontSize: "9",
            fill: "#f97316",
            opacity: "0.85",
            children: "Actual"
          }
        )
      ]
    }
  );
}
function MatrixDisplay({
  rows
}) {
  const midRows = rows.slice(1, -1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch gap-2 font-mono", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between text-3xl text-muted-foreground select-none leading-none py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⎡" }),
      midRows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⎢" }, r.label)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⎣" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 border border-border/30 rounded-lg bg-muted/20", children: rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "flex items-center gap-4 px-4 py-2.5",
          i < rows.length - 1 && "border-b border-border/20"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-sm font-bold text-primary", children: row.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-xs text-muted-foreground", children: row.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground tabular-nums", children: row.value })
        ]
      },
      row.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between text-3xl text-muted-foreground select-none leading-none py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⎤" }),
      midRows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⎥" }, r.label)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⎦" })
    ] })
  ] });
}
function SectionCard({
  title,
  subtitle,
  badge,
  children,
  delay = 0,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay },
      className: "bg-card rounded-2xl border border-border p-6 shadow-card",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-base", children: title }),
            subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subtitle })
          ] }),
          badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] shrink-0", children: badge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 border-t border-border/50 pt-4", children })
      ]
    }
  );
}
function FormulaBlock({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm bg-muted/50 border border-border/60 rounded-xl px-5 py-3 text-foreground tracking-wide overflow-x-auto", children });
}
function MathPage() {
  const motor1 = useMotorStore((s) => s.motor1);
  const motor2 = useMotorStore((s) => s.motor2);
  const [T0, setT0] = reactExports.useState(80);
  const [Ta, setTa] = reactExports.useState(25);
  const [k, setK] = reactExports.useState(0.05);
  const baseTemp = motor1.temperature;
  const history = Array.from(
    { length: 20 },
    (_, i) => Math.round((baseTemp - 8 + i * 0.55 + (i * 7 % 5 - 2.5) * 0.6) * 10) / 10
  );
  const THRESHOLD = 60;
  const thresholdRows = [
    { motor: "Motor 1", temp: motor1.temperature, isOn: motor1.isOn },
    { motor: "Motor 2", temp: motor2.temperature, isOn: motor2.isOn }
  ];
  const matrixRows = [
    {
      label: "T₁",
      desc: "Motor 1 Temperature",
      value: `${motor1.temperature.toFixed(1)} °C`
    },
    {
      label: "T₂",
      desc: "Motor 2 Temperature",
      value: `${motor2.temperature.toFixed(1)} °C`
    },
    {
      label: "RPM₁",
      desc: "Motor 1 Speed",
      value: `${motor1.isOn ? motor1.rpm ?? 0 : 0} RPM`
    },
    {
      label: "RPM₂",
      desc: "Motor 2 Speed",
      value: `${motor2.isOn ? motor2.rpm ?? 0 : 0} RPM`
    },
    {
      label: "I₁",
      desc: "Motor 1 Current",
      value: `${motor1.isOn ? (motor1.current ?? 0).toFixed(1) : "0.0"} A`
    },
    {
      label: "I₂",
      desc: "Motor 2 Current",
      value: `${motor2.isOn ? (motor2.current ?? 0).toFixed(1) : "0.0"} A`
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "math.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          className: "font-display font-bold text-2xl text-foreground",
          children: "Mathematical Models"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.1 },
          className: "text-sm text-muted-foreground mt-1",
          children: "Formulas and algorithms powering AgriMotor Guard's analytics engine"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SectionCard,
      {
        title: "Newton's Law of Cooling",
        subtitle: "Models temperature decay of a motor over time",
        badge: "Thermodynamics",
        delay: 0.05,
        ocid: "math.newton_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FormulaBlock, { children: [
            "T(t) = T",
            /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "a" }),
            " + (T",
            /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "0" }),
            " − T",
            /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "a" }),
            ") · e",
            /* @__PURE__ */ jsxRuntimeExports.jsx("sup", { children: "−k·t" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3",
              "data-ocid": "math.newton_inputs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "T0", className: "text-xs", children: "Initial Temperature T₀ (°C)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "T0",
                      type: "number",
                      value: T0,
                      onChange: (e) => setT0(Number(e.target.value)),
                      className: "h-8 text-sm",
                      "data-ocid": "math.newton_t0_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "Ta", className: "text-xs", children: "Ambient Temperature T_a (°C)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "Ta",
                      type: "number",
                      value: Ta,
                      onChange: (e) => setTa(Number(e.target.value)),
                      className: "h-8 text-sm",
                      "data-ocid": "math.newton_ta_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "k", className: "text-xs", children: "Cooling Constant k" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "k",
                      type: "number",
                      step: "0.001",
                      value: k,
                      onChange: (e) => setK(Number(e.target.value)),
                      className: "h-8 text-sm",
                      "data-ocid": "math.newton_k_input"
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewtonChart, { T0, Ta, k }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SectionCard,
      {
        title: "Linear Regression — Temperature Prediction",
        subtitle: "Least-squares fit on motor temperature history to predict trend",
        badge: "Statistics",
        delay: 0.1,
        ocid: "math.regression_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FormulaBlock, { children: [
            "T",
            /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children: "pred" }),
            " = a + b · t   |   b = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)²"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 mb-4", children: "The regression line (blue, dotted) is computed via ordinary least squares on Motor 1's temperature history. The orange curve shows actual recorded temperatures." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LinearRegressionChart, { history })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SectionCard,
      {
        title: "Matrix Representation — System State",
        subtitle: "State vector representing the complete system state at time t",
        badge: "Linear Algebra",
        delay: 0.15,
        ocid: "math.matrix_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FormulaBlock, { children: [
            "x = [T₁, T₂, RPM₁, RPM₂, I₁, I₂]",
            /* @__PURE__ */ jsxRuntimeExports.jsx("sup", { children: "T" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 mb-4", children: "The system state vector encodes all observable motor parameters. Live values update every 2 seconds from sensor simulation." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MatrixDisplay, { rows: matrixRows })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionCard,
      {
        title: "Threshold Analysis",
        subtitle: "Real-time safety status for both motors based on temperature thresholds",
        badge: "Safety",
        delay: 0.2,
        ocid: "math.threshold_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "math.threshold_table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-left border-b border-border", children: [
            "Motor",
            "Current Temp (°C)",
            "Threshold (°C)",
            "Margin (°C)",
            "Status"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: cn(
                "pb-2.5 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide",
                h !== "Motor" && h !== "Status" && "text-right"
              ),
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: thresholdRows.map((row, i) => {
            const margin = THRESHOLD - row.temp;
            const isSafe = row.temp < THRESHOLD;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: cn(
                  "border-b border-border/40",
                  i === thresholdRows.length - 1 && "border-b-0"
                ),
                "data-ocid": `math.threshold_row.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 pr-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground", children: row.motor }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: row.isOn ? "Active" : "Standby" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 text-right font-mono font-bold text-foreground tabular-nums", children: row.temp.toFixed(1) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 text-right font-mono text-muted-foreground tabular-nums", children: THRESHOLD }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "td",
                    {
                      className: cn(
                        "py-3 pr-4 text-right font-mono font-semibold tabular-nums",
                        isSafe ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
                      ),
                      children: [
                        margin > 0 ? "+" : "",
                        margin.toFixed(1)
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: isSafe ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: "text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700",
                      variant: "outline",
                      "data-ocid": `math.threshold_status.${i + 1}`,
                      children: "✓ Safe — Keep Running"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "destructive",
                      className: "text-[10px] px-2 py-0.5",
                      "data-ocid": `math.threshold_status.${i + 1}`,
                      children: "⚠ Warning — Overheat"
                    }
                  ) })
                ]
              },
              row.motor
            );
          }) })
        ] }) })
      }
    )
  ] });
}
export {
  MathPage as default
};
