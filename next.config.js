/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      sharp: "commonjs sharp",
      canvas: "commonjs canvas",
    });
    return config;
  },
  images: {
    domains: ['gifmakerstorage.blob.core.windows.net'], // เพิ่ม hostname ของรูปภาพที่คุณใช้ที่นี่
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
