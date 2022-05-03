const withOffline = require("next-offline");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins(
  [
    withOffline(),
    withPWA({
      disable: process.env.NODE_ENV === "development",
      reactStrictMode: true,
      pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        runtimeCaching,
        buildExcludes: [/middleware-manifest.json$/],
      },
    }),
  ],
  {
    serverRuntimeConfig: {
      emailPassword: process.env.EMAIL_PASSWORD,
    },
    publicRuntimeConfig: {
      baseUrl: process.env.BASE_URL,
    },
  }
);
