/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
    extend: {
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      },
			colors: {
				"regal-blue": "#272643",
				"primary-color": "#2C698D",
				"secondary-color": "#272643",
				"primary-btn": "#2C698D",
				"secondary-btn": "#272643",
				"primary-link": "#0081F8",
			},
		},
	},
	plugins: [],
};