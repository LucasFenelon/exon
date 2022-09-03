/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  strictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, crypto: false, zlib: false };

    return config;
  },
};

module.exports = nextConfig;
