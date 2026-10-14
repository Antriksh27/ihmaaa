/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/index.php',
        has: [
          {
            type: 'query',
            key: 'id',
            value: '1',
          },
        ],
        destination: '/ihmaaa/about-us',
        permanent: true,
      },
      {
        source: '/index.php',
        has: [
          {
            type: 'query',
            key: 'id',
            value: '2',
          },
        ],
        destination: '/ihmaaa/about-us/chairmans-message',
        permanent: true,
      },
      {
        source: '/index.php',
        has: [
          {
            type: 'query',
            key: 'id',
            value: '3',
          },
        ],
        destination: '/ihmaaa/about-us/president-s-message',
        permanent: true,
      },
      {
        source: '/index.php',
        has: [
          {
            type: 'query',
            key: 'id',
            value: '4',
          },
        ],
        destination: '/ihmaaa/about-us/founder-principal-s-message',
        permanent: true,
      },
      {
        source: '/index.php',
        has: [
          {
            type: 'query',
            key: 'id',
            value: '8',
          },
        ],
        destination: '/ihmaaa/about-us/member-s-list',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
