import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.ctfassets.net", // <-- Corrected
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
