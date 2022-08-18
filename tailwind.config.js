const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const fonts = [
	{ '@font-face': [{ fontFamily: 'Rubik', fontWeight: 300, src: 'url("/public/fonts/Rubik-Light.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Rubik', fontWeight: 400, src: 'url("/public/fonts/Rubik-Regular.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Rubik', fontWeight: 500, src: 'url("/public/fonts/Rubik-Medium.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Rubik', fontWeight: 600, src: 'url("/public/fonts/Rubik-SemiBold.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Rubik', fontWeight: 700, src: 'url("/public/fonts/Rubik-Bold.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Rubik', fontWeight: 800, src: 'url("/public/fonts/Rubik-ExtraBold.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Rubik', fontWeight: 900, src: 'url("/public/fonts/Rubik-Black.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Inter', fontWeight: 100, src: 'url("/public/fonts/Inter-Thin.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Inter', fontWeight: 200, src: 'url("/public/fonts/Inter-ExtraLight.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Inter', fontWeight: 300, src: 'url("/public/fonts/Inter-Light.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Inter', fontWeight: 400, src: 'url("/public/fonts/Inter-Regular.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Inter', fontWeight: 500, src: 'url("/public/fonts/Inter-Medium.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Inter', fontWeight: 600, src: 'url("/public/fonts/Inter-SemiBold.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Inter', fontWeight: 700, src: 'url("/public/fonts/Inter-Bold.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Inter', fontWeight: 800, src: 'url("/public/fonts/Inter-ExtraBold.ttf")' }] },
	{ '@font-face': [{ fontFamily: 'Inter', fontWeight: 900, src: 'url("/public/fonts/Inter-Black.ttf")' }] },
];

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
				'swiper-md': '835px',
				'2md': '860px',
			},
			transitionProperty: {
				spacing: 'margin, padding',
				sidebar: 'width, margin, transform',
			},
		},
	},
	plugins: [
		require('tailwind-scrollbar'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		plugin(function ({ addBase }) {
			addBase(fonts);
		}),
	],
};
