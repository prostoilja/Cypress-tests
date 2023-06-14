const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    browser: "chrome", // Specify the browser to use (in this case, Chrome)
    config: {
      chromeWebSecurity: false, // Disable web security to allow cross-origin requests
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
