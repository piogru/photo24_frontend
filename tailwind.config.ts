import { Config } from "tailwindcss/types/config";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
