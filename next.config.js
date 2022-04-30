const withOffline = require("next-offline");
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([withOffline()]);
