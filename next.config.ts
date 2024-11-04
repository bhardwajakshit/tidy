import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  reactStrictMode: false,
};

// if (process.env.NODE_ENV === "development") {
//   await setupDevPlatform();
// }

export default nextConfig;
