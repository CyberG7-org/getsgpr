import type { NextConfig } from "next";
import { REDIRECTS } from "./lib/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return REDIRECTS.map((r) => ({ ...r }));
  },
};

export default nextConfig;
