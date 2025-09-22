import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/saas-barbearia",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
  },
}

export default nextConfig
