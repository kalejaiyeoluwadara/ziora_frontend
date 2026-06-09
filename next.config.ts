import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/alohe/avatars/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/join",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
