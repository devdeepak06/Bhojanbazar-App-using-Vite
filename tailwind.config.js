/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 8px 16px rgba(0, 0, 0, 0.04)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(rgb(255, 255, 255) -6.71%, rgb(235, 235, 242) 56.19%, rgb(223, 223, 231) 106.56%)",
        "text-bg":
          "linear-gradient(rgba(27, 30, 36, 0) 0%, rgb(27, 30, 36) 84.21%)",
      },
    },
  },
  plugins: [],
};
