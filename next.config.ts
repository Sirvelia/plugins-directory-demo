import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'plugins.svn.wordpress.org',
            },
            {
                protocol: 'https',
                hostname: 'ps.w.org',
            },
            {
                protocol: 'https',
                hostname: 'secure.gravatar.com',
            },
        ],
    },
};

export default nextConfig;