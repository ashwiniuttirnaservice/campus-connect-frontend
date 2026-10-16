import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: join(__dirname),

  reactStrictMode: false,

  devIndicators: {
    buildActivity: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/student/profile/**",
      },
    ],
  },
};

export default nextConfig;
