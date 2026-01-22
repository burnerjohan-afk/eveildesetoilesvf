import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#98CF9F",
          dark: "#7AB882",
          light: "#B8E0BE",
        },
        secondary: {
          DEFAULT: "#F3B36A",
          dark: "#E89A4A",
          light: "#F8C88A",
        },
        accent: {
          DEFAULT: "#F6D24A",
          dark: "#E5C030",
          light: "#F9E06A",
        },
        background: "#FAFAF8",
        text: {
          DEFAULT: "#333333",
          light: "#666666",
          lighter: "#999999",
        },
        border: "#E5E5E5",
      },
    },
  },
  plugins: [],
};
export default config;
