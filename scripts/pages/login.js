const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const Image = require('sf-core/ui/image');

const ImageView = require('sf-core/ui/imageview');

var loginDesign = require("../ui/ui_login");

const Page_ = extend(loginDesign)(
	// Constructor
	function(_super){
		// Initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this)
			
		});
		
		var imageview1 = new ImageView({
		                        left: 0,
			top: 0,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			alpha: 1,
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://splash_image.png")
		});
		
		
		
		//assign the children to page 
		this.children = Object.assign({}, {
			imageview1: imageview1
		});
		
		
});

function onLoad() { 
    this.headerBar.visible = true;
    this.headerBar.title = "login";
    this.headerBar.titleColor = Color.create("#000000");
    this.headerBar.backgroundColor = Color.create("#FFFFFF");
    this.statusBar.visible = true;
    this.statusBar.android && (this.statusBar.android.color = Color.create("#00A1F1"));
}

module && (module.exports = Page_);