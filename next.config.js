/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/api/auth/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
