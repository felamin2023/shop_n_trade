/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [{ protocol: "https", hostname: "ik.imagekit.io" }],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"], // Add other packages if needed
  },
  reactStrictMode: true, // Existing settings, keep them here if you already have them
  env: {
    NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    NEXT_PUBLIC_URL_ENDPOINT: process.env.NEXT_PUBLIC_URL_ENDPOINT,
  },
};

export default nextConfig;
