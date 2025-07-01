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
      new URL('https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png'),
      new URL('https://cdn-icons-png.flaticon.com/512/1436/1436392.png'),
    ],
  },
};

export default nextConfig;
