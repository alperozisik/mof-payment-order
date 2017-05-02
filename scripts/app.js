/* globals lang */
require("i18n/i18n.js"); //generates global lang object
const Application = require("sf-core/application");
const Router = require("sf-core/ui/router");

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};
const Page = require('sf-core/ui/page');
global.Orientation = Page.Orientation;
require("timers-smf"); //setTimeout fix
require("./nw-setup");

// Define routes and go to initial page of application
Router.add("login", require("./pages/pgLogin"));
Router.add("list", require("./pages/pgList"));

Router.go("login");