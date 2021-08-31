module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://${
          process.env.SERVER_HOST ?? 'localhost'
        }:3001/:path*`,
      },
    ];
  },
};
