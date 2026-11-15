
import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  allowedDevOrigins: ["192.168.0.249"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "ftp.goit.study" },
    ],
  },
  // cacheComponents: true,
  // partialPrefetching: true,
  reactCompiler: true,
};

export default nextConfig;
