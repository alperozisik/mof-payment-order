const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");

// Get generetad UI code
var PgLoginDesign = require("../ui/ui_pgLogin");

const PgLogin = extend(PgLoginDesign)(
    function(_super) {
        _super(this);

        this.onShow = onShow.bind(this);
    });

function onShow(e) {
    if (!e) return;
    console.log(e.message);
}



module && (module.exports = PgLogin);
