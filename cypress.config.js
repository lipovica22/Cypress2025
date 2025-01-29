const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    reporter: 'cypress-mochawesome-reporter',

    setupNodeEvents(on, config) {
       
      on('file:preprocessor', cucumber())
      require('cypress-mochawesome-reporter/plugin')(on);
    },

    "chromeWebSecurity": false,
    //specPattern: "cypress/e2e/**/*feature",
  },

  env: {
    credentials: {
      email: "srdjan.tanasijevic78@gmail.com",
      password: "cypress2024"
    },
    url: "https://conduit.bondaracademy.com/",
    urlSingIn: "https://conduit.bondaracademy.com/login"
  }
});
