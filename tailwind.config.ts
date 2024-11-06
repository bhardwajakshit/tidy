import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "tidy-white": "#f8f7f1",
        "tidy-black": "#222222",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        mono: ["Fira Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
