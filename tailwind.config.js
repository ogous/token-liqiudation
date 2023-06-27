/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        './node_modules/tw-elements/dist/js/**/*.js'
      ],
    theme: {
        extend: {
            screens: {
                mobile: '500px',
                '600px': '600px',
                '700px': '700px',
                '800px': '800px',
                '1100px': '1100px',
                '1200px': '1200px',
                '1300px': '1300px',
                '1500px': '1500px',
                '1600px': '1600px',
                tablet: '900px',
                laptop: '1440px',
            },
            fontFamily: {
                SSP: ['Source Sans Pro', 'sans-serif'],
            },
            colors: {
                primary: '#111827',
                secondary: '#1f2937',
                yellow: '#F5C243',
                yellow2: '#B38E2E',
                red: '#EA3324',
                darkBlue: '#374151',
            },
        },
    },
    plugins: [require('tw-elements/dist/plugin')],
};
