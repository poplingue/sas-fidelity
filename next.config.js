const withOffline = require("next-offline");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withOffline()], {
  serverRuntimeConfig: {
    emailPassword: process.env.EMAIL_PASSWORD
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL
  }
});
