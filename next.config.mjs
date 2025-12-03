/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "syukwbfglfsmhzziekls.supabase.co" },
    ],
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    NEXT_PUBLIC_URL_ENDPOINT: process.env.NEXT_PUBLIC_URL_ENDPOINT,
  },
};

export default nextConfig;
