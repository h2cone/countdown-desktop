/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}