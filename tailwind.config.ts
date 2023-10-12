/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
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
    plugins: [require('@headlessui/tailwindcss')]
};
