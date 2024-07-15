module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],

  daisyui: {
    themes: [
      {
        dark: {
          // Customize your dark theme colors here
          'base-100': '#ffffff', // Your desired background color
          // Other theme colors...
        },
      },
    ],
  },
}
