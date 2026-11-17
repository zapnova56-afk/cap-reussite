import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marine: { DEFAULT: "#102D50", 700: "#1B3F6B", 50: "#E8EEF5" },
        turquoise: { DEFAULT: "#0B8A4B", 700: "#076B3A", 50: "#E7F5EE" },
        soleil: { DEFAULT: "#F4C430", 700: "#D4A512", 50: "#FEF6DA" },
        rouge: "#E0343A",
        nuage: "#F3F8F5",
      },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: { carte: "0 8px 30px rgba(16,45,80,0.08)" },
    },
  },
  plugins: [],
};
export default config;
