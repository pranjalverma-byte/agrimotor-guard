import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, f as useMotorStore, b as cn, B as Button, Z as Zap, g as Badge } from "./index-pBzqmWyL.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-aXvNMqyy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M8 3 4 7l4 4", key: "9rb6wj" }],
  ["path", { d: "M4 7h16", key: "6tx8e3" }],
  ["path", { d: "m16 21 4-4-4-4", key: "siv7j2" }],
  ["path", { d: "M20 17H4", key: "h6l3hr" }]
];
const ArrowLeftRight = createLucideIcon("arrow-left-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
];
const Thermometer = createLucideIcon("thermometer", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function Sparkline({ data }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 200;
  const h = 40;
  const pts = data.map((v, i) => {
    const x = i / (data.length - 1) * w;
    const y = h - (v - min) / range * (h - 6) - 3;
    return `${x},${y}`;
  }).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: `0 0 ${w} ${h}`,
      className: "w-full h-10 text-primary",
      "aria-hidden": "true",
      role: "presentation",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "polyline",
        {
          points: pts,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinejoin: "round",
          strokeLinecap: "round",
          opacity: "0.75"
        }
      )
    }
  );
}
function PredictionChart({
  data,
  label
}) {
  const temps = data.map((d) => d.temp);
  const min = Math.min(...temps) - 2;
  const max = Math.max(...temps) + 2;
  const range = max - min;
  const w = 300;
  const h = 80;
  const pts = data.map((d, i) => {
    const x = i / (data.length - 1) * w;
    const y = h - (d.temp - min) / range * (h - 10) - 5;
    return `${x},${y}`;
  }).join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: `0 0 ${w} ${h}`,
        className: "w-full h-20 text-primary",
        "aria-label": label,
        role: "img",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "tempGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "stop",
              {
                offset: "0%",
                stopColor: "var(--color-primary)",
                stopOpacity: "0.2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "stop",
              {
                offset: "100%",
                stopColor: "var(--color-primary)",
                stopOpacity: "0"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: area, fill: "url(#tempGrad)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "polyline",
            {
              points: pts,
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinejoin: "round",
              strokeLinecap: "round"
            }
          ),
          data.map((d) => {
            const idx = data.indexOf(d);
            const x = idx / (data.length - 1) * w;
            const y = h - (d.temp - min) / range * (h - 10) - 5;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: x,
                cy: y,
                r: "3",
                fill: "currentColor",
                className: "opacity-80"
              },
              d.time
            );
          })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between mt-1", children: data.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground", children: [
        d.temp,
        "°"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: d.time })
    ] }, d.time)) })
  ] });
}
function generatePrediction(baseTemp, horizon) {
  const steps = {
    15: [
      { time: "5m", mins: 5 },
      { time: "10m", mins: 10 },
      { time: "15m", mins: 15 }
    ],
    30: [
      { time: "10m", mins: 10 },
      { time: "20m", mins: 20 },
      { time: "30m", mins: 30 }
    ],
    60: [
      { time: "15m", mins: 15 },
      { time: "30m", mins: 30 },
      { time: "45m", mins: 45 },
      { time: "1hr", mins: 60 }
    ],
    120: [
      { time: "30m", mins: 30 },
      { time: "1hr", mins: 60 },
      { time: "1.5hr", mins: 90 },
      { time: "2hr", mins: 120 }
    ]
  };
  return steps[horizon].map(({ time, mins }) => ({
    time,
    temp: Math.round(
      (baseTemp + mins / 60 * 4.2 + (Math.random() - 0.3) * 1.5) * 10
    ) / 10
  }));
}
function MotorCard({ motorId }) {
  const motor = useMotorStore((s) => motorId === 1 ? s.motor1 : s.motor2);
  const isOverheat = motor.temperature > 55;
  const isWarming = motor.temperature > 48;
  const sparkData = Array.from(
    { length: 20 },
    (_, i) => Math.round(
      (motor.temperature - 5 + i * 0.3 + (Math.random() - 0.5) * 2) * 10
    ) / 10
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: (motorId - 1) * 0.1 },
      className: cn(
        "bg-card rounded-2xl border p-5 shadow-card transition-smooth",
        isOverheat ? "border-destructive/50 ring-1 ring-destructive/20" : isWarming ? "border-accent/40" : "border-border"
      ),
      "data-ocid": `motor.card.${motorId}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-widest", children: motorId === 1 ? "Motor 1" : "Motor 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate max-w-[160px]", children: motor.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            motor.isOn && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                animate: { scale: [1, 1.15, 1] },
                transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
                className: "inline-block w-2 h-2 rounded-full bg-secondary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: motor.isOn ? "secondary" : "outline",
                className: cn(
                  "text-[10px] font-semibold px-2 py-0.5",
                  motor.isOn ? "bg-secondary/20 text-secondary-foreground border-secondary/30" : "text-muted-foreground"
                ),
                children: motor.isOn ? "RUNNING" : "STANDBY"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-4xl font-display font-bold tracking-tight",
                  isOverheat ? "text-destructive" : isWarming ? "text-accent" : "text-foreground"
                ),
                children: motor.temperature.toFixed(1)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-medium text-muted-foreground mb-1", children: "°C" })
          ] }),
          isOverheat && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              className: "flex items-center gap-1.5 mt-1 text-xs text-destructive font-medium",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
                "Overheating detected"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-1", children: "Last hour" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { data: sparkData })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 pt-3 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
              motor.isOn ? (motor.current ?? 0).toFixed(1) : "0.0",
              " A"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Current" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
              motor.isOn ? motor.rpm ?? 0 : 0,
              " RPM"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Speed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
              motor.runtimeHours ?? 0,
              " hrs"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Runtime" })
          ] })
        ] })
      ]
    }
  );
}
function DashboardPage() {
  var _a;
  const {
    motor1,
    motor2,
    alerts,
    clearAlert,
    switchMotors,
    setIsSwitching,
    isSwitching
  } = useMotorStore();
  const [predHorizon, setPredHorizon] = reactExports.useState(60);
  const predData = generatePrediction(
    motor1.isOn ? motor1.temperature : motor2.temperature,
    predHorizon
  );
  const horizons = [15, 30, 60, 120];
  const horizonLabels = {
    15: "15 min",
    30: "30 min",
    60: "1 hr",
    120: "2 hrs"
  };
  const handleSwitch = () => {
    setIsSwitching(true);
    setTimeout(() => switchMotors(), 800);
  };
  const OVERHEAT_THRESHOLD = 60;
  reactExports.useEffect(() => {
    const allCool = motor1.temperature < OVERHEAT_THRESHOLD && motor2.temperature < OVERHEAT_THRESHOLD;
    if (allCool && alerts.length > 0) {
      for (const alert of alerts) {
        clearAlert(alert.id);
      }
    }
  }, [motor1.temperature, motor2.temperature, alerts, clearAlert]);
  const activeCount = [motor1, motor2].filter((m) => m.isOn).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Active Motors",
        value: `${activeCount}/2`,
        icon: Activity,
        color: "text-secondary"
      },
      {
        label: "Critical Alerts",
        value: String(
          alerts.filter((a) => a.severity === "critical").length
        ),
        icon: TriangleAlert,
        color: "text-destructive"
      },
      {
        label: "Motor 1 Temp",
        value: `${motor1.temperature.toFixed(1)}°C`,
        icon: Thermometer,
        color: motor1.temperature > 55 ? "text-destructive" : "text-primary"
      },
      {
        label: "Motor 2 Temp",
        value: `${motor2.temperature.toFixed(1)}°C`,
        icon: Thermometer,
        color: motor2.temperature > 55 ? "text-destructive" : "text-primary"
      }
    ].map(({ label, value, icon: Icon, color }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border px-4 py-3 shadow-card",
        "data-ocid": `dashboard.summary.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-4 h-4", color) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-xl font-display font-bold mt-1", color), children: value })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MotorCard, { motorId: 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MotorCard, { motorId: 2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "sm:col-span-2 bg-card rounded-2xl border border-border p-5 shadow-card",
            "data-ocid": "control.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Motor Control" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: motor1.isOn ? "Motor 1 is active — Motor 2 on standby" : "Motor 2 is active — Motor 1 on standby" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    animate: isSwitching ? { rotate: [0, 180, 360] } : {},
                    transition: { duration: 0.8, ease: "easeInOut" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        onClick: handleSwitch,
                        disabled: isSwitching,
                        className: "gap-2 rounded-xl font-semibold",
                        "data-ocid": "control.switch_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "w-4 h-4" }),
                          isSwitching ? "Switching…" : "Switch Motor"
                        ]
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center gap-3", children: [motor1, motor2].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "flex-1 flex items-center gap-2 rounded-xl px-3 py-2 border transition-smooth",
                    m.isOn ? "bg-secondary/10 border-secondary/30" : "bg-muted/30 border-border"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Zap,
                      {
                        className: cn(
                          "w-4 h-4",
                          m.isOn ? "text-secondary" : "text-muted-foreground"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-foreground", children: [
                      "Motor ",
                      m.id
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "ml-auto text-[10px] font-semibold",
                          m.isOn ? "text-secondary" : "text-muted-foreground"
                        ),
                        children: m.isOn ? "ON" : "OFF"
                      }
                    )
                  ]
                },
                m.id
              )) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl border border-border p-5 shadow-card",
            "data-ocid": "prediction.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Temp Prediction" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex gap-1.5 flex-wrap",
                  "data-ocid": "prediction.horizon_selector",
                  children: horizons.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setPredHorizon(h),
                      className: cn(
                        "px-2.5 py-1 rounded-lg text-xs font-semibold transition-smooth",
                        predHorizon === h ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      ),
                      "data-ocid": `prediction.horizon_${h}`,
                      children: horizonLabels[h]
                    },
                    h
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PredictionChart,
                {
                  data: predData,
                  label: `Temperature prediction for ${horizonLabels[predHorizon]}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-2.5 rounded-xl bg-primary/8 border border-primary/15", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Expected at ",
                  horizonLabels[predHorizon]
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-display font-bold text-primary", children: [
                  (_a = predData[predData.length - 1]) == null ? void 0 : _a.temp.toFixed(1),
                  "°C"
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl border border-border p-5 shadow-card",
            "data-ocid": "alerts.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm", children: "Alert System" })
                ] }),
                alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "destructive",
                    className: "text-[10px] px-1.5 py-0.5",
                    children: alerts.length
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center py-6 text-muted-foreground",
                  "data-ocid": "alerts.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "All systems nominal" })
                  ]
                }
              ) : alerts.map((alert, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 16 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -16 },
                  transition: { duration: 0.25 },
                  className: cn(
                    "flex items-start gap-2.5 p-2.5 rounded-xl border text-xs",
                    alert.severity === "critical" ? "bg-destructive/8 border-destructive/20" : "bg-accent/10 border-accent/25"
                  ),
                  "data-ocid": `alerts.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TriangleAlert,
                      {
                        className: cn(
                          "w-3.5 h-3.5 mt-0.5 shrink-0",
                          alert.severity === "critical" ? "text-destructive" : "text-accent"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: alert.motorName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-snug mt-0.5", children: alert.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => clearAlert(alert.id),
                        className: "shrink-0 text-muted-foreground hover:text-foreground transition-colors",
                        "aria-label": "Dismiss alert",
                        "data-ocid": `alerts.close_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ]
                },
                alert.id
              )) }) })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  DashboardPage as default
};
