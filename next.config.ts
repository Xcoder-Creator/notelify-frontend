import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",       // when frontend requests /api/anything
        destination: "http://localhost:5000/api/:path*", // forward it to backend
      },
    ];
  }
};

export default nextConfig;
