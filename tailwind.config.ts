import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#080b16", cyan: "#66e6ff", violet: "#9b8cff" }, boxShadow: { glow: "0 0 28px rgba(102,230,255,.24)" } } }, plugins: [] } satisfies Config;
