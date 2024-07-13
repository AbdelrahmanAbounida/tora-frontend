module.exports = {
  content: ["./app/**/*.{js,tsx,ts,jsx}", "./components/**/*.{js,tsx,ts,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF9700",
        secondary: "#CDCDE0",
        dark: "#161622",
        lightDark: "#1E1E2D",
        lightDark2: "#232533",
        white: "#fff",
      },
      fontFamily: {
        pblack: ["Poppins-Black", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pthin: ["Poppins-Thin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
