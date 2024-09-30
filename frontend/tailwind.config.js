module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',  // blue-600
          grey_light: '#f3f4f6', // gray-100
        },
      },
    },
  },
  plugins: [],
};
