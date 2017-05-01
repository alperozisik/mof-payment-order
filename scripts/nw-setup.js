const nw = require("smf-nw");
//start setup
nw.registerService(require("./definitions/login"));
nw.registerService(require("./definitions/user"));
nw.registerService(require("./definitions/case-all"));
nw.registerService(require("./definitions/case-detail"));

nw.baseURL = "http://localhost:7101/PaymentOrderProcess/webservice/rest";

nw.commonHeaders["Accept"] = nw.commonHeaders["Content-Type"] = "application/json";


nw.onActivityStart = function() {};

nw.onActivityEnd = function() {};

nw.action = "mock"; //Replace between "run" and "mock"
