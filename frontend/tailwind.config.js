/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px',
    },
    extend: {
      keyframes:{
        floating :{
        ' 0%, 100%': { transform: 'translateY(0)' },
         '50%':{ transform: 'translateY(10px)' }
        }  
      },
      animation:{
        floating:'floating 2s ease-in-out infinite'
      }
   
    },
  },
  plugins: [],
};

