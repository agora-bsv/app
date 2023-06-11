module.exports = {
  target: 'experimental-serverless-trace', // Enables serverless functions support
  distDir: 'out', // Output directory for Next.js build
  serverless: true, // Tells Next.js to generate serverless pages
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude server-side only packages from the client build
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
    }
    return config;
  },
};
