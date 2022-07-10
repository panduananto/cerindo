const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', ...defaultTheme.fontFamily.sans],
				rubik: ['Rubik', ...defaultTheme.fontFamily.serif],
			},
			screens: {
				'2md': '860px',
			},
		},
	},
	plugins: [],
};
