/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CLOUDFLARE_R2_URL: "https://pub-29ede69a4da644b9b81fa3dd5f8e9d6a.r2.dev",
  },
  images: {
    domains: ["pub-29ede69a4da644b9b81fa3dd5f8e9d6a.r2.dev"], // ✅ Cloudflare R2 Host erlauben
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-29ede69a4da644b9b81fa3dd5f8e9d6a.r2.dev",
        pathname: "/**", // ✅ Alle Bilder von Cloudflare R2 zulassen
      },
    ],
  },
};

module.exports = nextConfig;
