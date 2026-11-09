import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
