import { c as createLucideIcon, h as useDeviceStore, j as jsxRuntimeExports, B as Button, b as cn, W as Wifi, g as Badge } from "./index-pBzqmWyL.js";
import { m as motion } from "./proxy-aXvNMqyy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }],
  ["path", { d: "M22 4v16", key: "sih9yq" }]
];
const Signal = createLucideIcon("signal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const WifiOff = createLucideIcon("wifi-off", __iconNode);
function SignalBars({ strength }) {
  const bars = [25, 50, 75, 100];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-end gap-0.5 h-4",
      "aria-label": `Signal: ${strength}%`,
      children: bars.map((threshold, barIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "w-1.5 rounded-sm transition-smooth",
            strength >= threshold ? "bg-secondary" : "bg-muted"
          ),
          style: { height: `${40 + barIdx * 20}%` }
        },
        threshold
      ))
    }
  );
}
function ConnectionsPage() {
  const { devices, isScanning, lastRefreshed, refreshDevices } = useDeviceStore();
  const connectedCount = devices.filter((d) => d.connected).length;
  const formattedTime = lastRefreshed ? new Date(lastRefreshed).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "connections.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground tracking-tight", children: "Connected Devices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          connectedCount,
          " of ",
          devices.length,
          " ESP devices online",
          lastRefreshed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs", children: [
            "· Last scan ",
            formattedTime
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: refreshDevices,
          disabled: isScanning,
          variant: "outline",
          className: "gap-2 rounded-xl",
          "data-ocid": "connections.refresh_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: cn("w-4 h-4", isScanning && "animate-spin") }),
            isScanning ? "Scanning…" : "Refresh Scan"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
      {
        label: "Total Devices",
        value: devices.length,
        icon: Signal,
        color: "text-primary"
      },
      {
        label: "Online",
        value: connectedCount,
        icon: Wifi,
        color: "text-secondary"
      },
      {
        label: "Offline",
        value: devices.length - connectedCount,
        icon: WifiOff,
        color: "text-destructive"
      }
    ].map(({ label, value, icon: Icon, color }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border px-4 py-3 shadow-card",
        "data-ocid": `connections.summary.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-4 h-4", color) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-2xl font-display font-bold mt-1", color), children: value })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "connections.device_list",
        children: devices.map((device, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: i * 0.05 },
            className: cn(
              "bg-card rounded-2xl border p-4 shadow-card transition-smooth",
              device.connected ? "border-border hover:border-secondary/40 hover:shadow-elevated" : "border-border opacity-70"
            ),
            "data-ocid": `connections.device.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center",
                        device.connected ? "bg-secondary/15" : "bg-muted/60"
                      ),
                      children: device.connected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4 text-secondary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-4 h-4 text-muted-foreground" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight", children: device.name.split(" — ")[0] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: device.name.split(" — ")[1] ?? device.id })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: device.connected ? "secondary" : "outline",
                    className: cn(
                      "text-[10px] font-semibold shrink-0",
                      device.connected ? "bg-secondary/15 text-secondary-foreground border-secondary/25" : "text-muted-foreground"
                    ),
                    children: device.connected ? "Online" : "Offline"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SignalBars, { strength: device.signalStrength }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: device.connected ? `${device.signalStrength}%` : "No signal" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono", children: device.id.toUpperCase() })
              ] })
            ]
          },
          device.id
        ))
      }
    ),
    isScanning && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none",
        "data-ocid": "connections.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-elevated px-8 py-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-8 h-8 text-primary mx-auto mb-3 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Scanning for devices…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Broadcasting discovery signal" })
        ] })
      }
    )
  ] });
}
export {
  ConnectionsPage as default
};
