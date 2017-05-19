/* globals lang */
require("i18n/i18n.js"); //generates global lang object
const Application = require("sf-core/application");
const Router = require("sf-core/ui/router");
const Color = require('sf-core/ui/color');
const Font = require('sf-core/ui/font');

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};
const Page = require('sf-core/ui/page');
global.Orientation = Page.Orientation;
require("timers-smf"); //setTimeout fix
require("./nw-setup");

global.ipAddress = "192.168.8.103";
global.baseUrl = "http://" + global.ipAddress + ":7101/MOF_POC_REST-RESTWebService-context-root/rest/v1/";


// UI colors
global.listViewBackgroundColor = Color.createGradient({
    direction: Color.GradientDirection.HORIZONTAL,
    startColor: Color.create(227, 213, 188),
    endColor: Color.create(178, 140, 70)
});

global.listLineSeparatorColor = Color.createGradient({
    direction: Color.GradientDirection.HORIZONTAL,
    startColor: Color.create("#006f43"),
    endColor: Color.create("#00b6a9")
});


// global.detailsBackgroundColor = Color.createGradient({
//     direction: Color.GradientDirection.HORIZONTAL,
//     startColor: Color.create("#00b6a9"),
//     endColor: Color.create("#006f43")
// });

global.detailsBackgroundColor = Color.createGradient({
    direction: Color.GradientDirection.HORIZONTAL,
    startColor: Color.create(227, 213, 188),
    endColor: Color.create(178, 140, 70)
});

// global.detailsLineColor = Color.createGradient({
//     direction: Color.GradientDirection.HORIZONTAL,
//     startColor: Color.create(227, 213, 188),
//     endColor: Color.create(178, 140, 70)
// });

global.detailsLineColor =Color.createGradient({
    direction: Color.GradientDirection.HORIZONTAL,
    startColor: Color.create("#00b6a9"),
    endColor: Color.create("#006f43")
});

global.listTitleFont = Font.create("Droid Sans Arabic", 16, Font.NORMAL);
global.listSubTitleFont = Font.create("Droid Sans Arabic", 14, Font.NORMAL);

global.detailsTitleFont = Font.create("Droid Sans Arabic", 14, Font.NORMAL);
global.detailsValueFont = Font.create("Droid Sans Arabic", 16, Font.NORMAL);


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
