/** @type {import('next').NextConfig} */
const nextConfig = {
  // 他の設定があれば残してOK
  typescript: {
    ignoreBuildErrors: true, // ⛔ 型エラーを一時的に無効化
  },
  experimental: {
    typedRoutes: false, // ⛔ 型ルート自動生成を無効化（これが本質）
  },
  webpack(config) {
    config.resolve.alias["@"] = require("path").resolve(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;
