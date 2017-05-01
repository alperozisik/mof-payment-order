const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");

// Get generetad UI code
var PgListDesign = require("../ui/ui_pgList");

const PgList = extend(PgListDesign)(
    function(_super) {
        _super(this);

        this.onShow = onShow.bind(this);
    });

function onShow(e) {
    if (!e) return;
    console.log(e.message);
}



module && (module.exports = PgList);
