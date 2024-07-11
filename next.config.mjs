/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.com",
      },
      {
        hostname: "*.photos",
      },
      {
        hostname: "*.org",
      },
      {
        hostname: "*.app",
      },
      {
        hostname: "*.me",
      },
      {
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
