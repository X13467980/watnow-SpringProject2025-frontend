import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/feature/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ritsred: "#B31717",
      },
      screens: {
        xs: "375px",
        md: "430px",
        lg: "767px",
        xl: "1023px",
      },
    },

    fontFamily: {
      sans: ["Noto Sans JP", "sans-serif"],
    },

    backgroundImage: {},
  },
  plugins: [],
};
export default config;
