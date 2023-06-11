// next.config.js

const withTM = require('next-transpile-modules')(['@handcash/handcash-connect']);

module.exports = withTM({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      };
    }

    return config;
  }
});

