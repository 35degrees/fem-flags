/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			sm: '374px',
			lg: '1400px'
		},

		extend: {
			colors: {
				darkBlue: 'hsl(209,23%,22%)',
				veryDarkBlue: 'hsl(207,26%,17%)',
				superDarkBlue: 'hsl(200,15%,8%)',
				darkGray: 'hsl(0,0%,52%)',
				veryLightGray: 'hsl(0,0%,98%)'
			}
		}
	},

	plugins: []
};
