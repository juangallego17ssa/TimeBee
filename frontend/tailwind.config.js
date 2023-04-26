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
        },
        dropdown:{
          '0%':{transform:'rotateX(-90deg)' ,opacity:0},
          '50%':{transform: 'rotateX(-20deg)'},
          '100%':{transform:'rotateX(0eg)',opacity:1}
        }  
      },
      animation:{
        floating:'floating 2s ease-in-out infinite',
        dropdown:'dropdown .4s ease-in-out'
      }
   
    },
  },
  plugins: [],
};

