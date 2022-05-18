/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "thumb1.shutterstock.com",
      "cdn.fakercloud.com",
      "cloudflare-ipfs.com",
    ],
  },
};

module.exports = nextConfig;
