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


global.baseUrl = "https://mof-payment-mock-alperozisik.c9users.io";
//global.baseUrl = "http://192.168.8.103:7101/MOF_POC_REST-RESTWebService-context-root/rest/v1";


// Define routes and go to initial page of application
Router.add("login", require("./pages/pgLogin"));
Router.add("list", require("./pages/pgList"));
Router.add("details", require("./pages/pgDetails"));
Router.add("secondApproverList", require("./pages/senondApproverList"));
Router.add("mofUserList", require("./pages/mofUserList"));
Router.add("secondApproverDetails", require("./pages/senondApproverDetails"));
Router.add("mofUserDetails", require("./pages/mofUserDetails"));
Router.add("login2", require("./pages/login"));
Router.add("reviewerList", require("./pages/pgReviewerList"));
Router.add("reviewrDetails", require("./pages/pgReviewerDetails"));



Router.go("login");