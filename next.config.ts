import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Account-only pages on the live site send guests to the login page.
  async redirects() {
    return ["/my-profile", "/apply/:slug", "/add-to-favourite-job/:slug", "/email-to-friend/:slug", "/report-abuse/:slug"].map(
      (source) => ({ source, destination: "/login", permanent: false }),
    );
  },
};

export default nextConfig;
