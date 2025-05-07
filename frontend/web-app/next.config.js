const withFlowbiteReact = require("flowbite-react/plugin/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = withFlowbiteReact(nextConfig);
