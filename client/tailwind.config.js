module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.6rem', // Custom size smaller than 'xs'
      },
      boxShadow: {
        'blue': '0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -2px rgba(59, 130, 246, 0.5)',
        'blue-strong': '0 8px 10px -2px rgba(59, 130, 246, 0.7), 0 4px 6px -2px rgba(59, 130, 246, 0.7)',

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
