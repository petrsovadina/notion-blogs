import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i19jax5jy5.ufs.sh',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'z58w7a0mio.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
