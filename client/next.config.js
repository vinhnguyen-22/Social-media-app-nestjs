/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
