import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zamunygjoifexrchkmmd.supabase.co',
      },
    ],
  }
};

export default nextConfig;
