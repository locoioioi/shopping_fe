/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",'./index.html'
	],
	theme: {
		extend: {
			spacing : {
				1200: '1200px',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				chewy: ['Chewy', 'cursive'],
			},
			colors: {
				darkBlue: {
					100: "#282872"
				},
				purpleDark: {
					100: "#9747FF"
				},
				pinkLight: {
					100: "#E679EE"
				},
			},
			backgroundColor: {
				darkBlue: {
					100: "#282872"
				},
				purpleDark: {
					100: "#9747FF"
				},
			},
			borderColor: {
				darkBlue: {
					100: "#282872"
				},
				purpleDark: {
					100: "#9747FF"
				},
			}
		},
	},
	plugins: [],
};
