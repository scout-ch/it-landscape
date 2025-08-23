/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
			'brombeer': "#521d3a",
			'brombeer-200': "#521d3a33",
			'gray': '#f8f7f6'
			}
		},
	},
	plugins: [],
}
