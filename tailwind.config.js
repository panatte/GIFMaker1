/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        RampartOne: ['Rampart One', 'sans-serif'],
        Kanit: ["Kanit",' sans-serif'],
        PoetsenOne : ["Poetsen One", 'sans-serif'],
        Jersey20 : ["Jersey 20", 'sans-serif'],

      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }),
    require('tailwind-scrollbar-hide'), 
  ],
}
