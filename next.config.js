module.exports = {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: '*',
            },
            {
              key: "Access-Control-Allow-Methods",
              value: 'GET',
            },
            {
              key: "Access-Control-Allow-Headers",
              value: 'X-Requested-With, content-type, Authorization',
            },
            {
                key: 'Content-Security-Policy',
                value: "frame-ancestors 'self' https://app.safe.global;",
            },
          ],
        },
      ]
    },
  }