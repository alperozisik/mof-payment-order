const nw = require("smf-nw");
//start setup
nw.registerService(require("./definitions/login"));
nw.registerService(require("./definitions/payment-order"));
nw.registerService(require("./definitions/payment-order-detail"));
nw.registerService(require("./definitions/approve"));
//nw.registerService(require("./definitions/user"));
//nw.registerService(require("./definitions/case-detail"));

nw.baseURL = "http://192.168.8.103:7101/MOF_POC_REST-RESTWebService-context-root/rest/v1/UsersVO?q=Username=rev";

nw.commonHeaders["Accept"] = nw.commonHeaders["Content-Type"] = "application/json";


nw.onActivityStart = function() {};

nw.onActivityEnd = function() {};

nw.action = "mock"; //Replace between "run" and "mock"
