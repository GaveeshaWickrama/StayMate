module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.6rem', // Custom size smaller than 'xs'
      },
    },
  },
  plugins: [
    require('daisyui')
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
