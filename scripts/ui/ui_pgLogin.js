/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const TextBox = require('sf-core/ui/textbox');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const Button = require('sf-core/ui/button');



const PgLogin_ = extend(Page)(
	//constructor
	function(_super){
		// initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this)
		});

		var rootLayout = new FlexLayout({
			left: 0,
			top: 0,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		this.rootLayout = rootLayout;
		
		var spriteLayout = new FlexLayout({
			left: 0,
			top: 0,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		this.spriteLayout = spriteLayout;
		
		var mainLayout = new FlexLayout({
			height: 200,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		this.mainLayout = mainLayout;
		
		var imageLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		this.imageLayout = imageLayout;
		
		var imageview1 = new ImageView({
			width: 200,
			height: 123,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://sparrow_logo.png")
		});
		
		this.imageview1 = imageview1;
		
		var inputLayout = new FlexLayout({
			height: 150,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(0, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		this.inputLayout = inputLayout;
		
		var flexlayout7 = new FlexLayout({
			left: 10,
			top: 10,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 10,
			bottom: 10,
			backgroundColor: Color.create(51, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 255, 255, 255),
			borderWidth: 1,
			borderRadius: 10,
			visible: true
		});
		
		this.flexlayout7 = flexlayout7;
		
		var emailLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(51, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		this.emailLayout = emailLayout;
		
		var passwordlayout_1 = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(51, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		this.passwordlayout_1 = passwordlayout_1;
		
		var emailTextBox = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			backgroundColor: Color.create(51, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(25500, 0, 0, 0),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
		});
		emailTextBox.font = Font.create("Lato", 14, Font.NORMAL);
		this.emailTextBox = emailTextBox;
		
		var passwordTextBox = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			backgroundColor: Color.create(51, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(25500, 0, 0, 0),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
		});
		passwordTextBox.font = Font.create("Lato", 14, Font.NORMAL);
		this.passwordTextBox = passwordTextBox;
		
		var divider = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(32, 0, 0, 0),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		this.divider = divider;
		
		var divider2 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(32, 0, 0, 0),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		this.divider2 = divider2;
		
		var bottomLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		this.bottomLayout = bottomLayout;
		
		var loginButton = new Button({
			width: 180,
			height: 50,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginTop: 40,
			backgroundColor: Color.create(0, 0, 161, 241),
			alpha: 1,
			borderColor: Color.create(136, 255, 255, 255),
			borderWidth: 1,
			textColor: Color.create("#FFFFFF"),
			textAlignment: TextAlignment.MIDCENTER,
			borderRadius: 25,
			visible: true,
			text: "LOGIN"
		});
		loginButton.font = Font.create("Arial", 16, Font.NORMAL);
		this.loginButton = loginButton;
		
		
		//assign the children to page 
		this.children = Object.assign({}, {
			rootLayout: rootLayout
		});
		
		//assign the children of rootLayout
		rootLayout.children =  Object.assign({}, {
			spriteLayout: spriteLayout,
			mainLayout: mainLayout
		});
		
		//assign the children of mainLayout
		mainLayout.children =  Object.assign({}, {
			imageLayout: imageLayout,
			inputLayout: inputLayout,
			bottomLayout: bottomLayout
		});
		
		//assign the children of imageLayout
		imageLayout.children =  Object.assign({}, {
			imageview1: imageview1
		});
		
		//assign the children of inputLayout
		inputLayout.children =  Object.assign({}, {
			flexlayout7: flexlayout7
		});
		
		//assign the children of flexlayout7
		flexlayout7.children =  Object.assign({}, {
			emailLayout: emailLayout,
			divider: divider,
			passwordlayout_1: passwordlayout_1,
			divider2: divider2
		});
		
		//assign the children of emailLayout
		emailLayout.children =  Object.assign({}, {
			emailTextBox: emailTextBox
		});
		
		//assign the children of passwordlayout_1
		passwordlayout_1.children =  Object.assign({}, {
			passwordTextBox: passwordTextBox
		});
		
		//assign the children of bottomLayout
		bottomLayout.children =  Object.assign({}, {
			loginButton: loginButton
		});

});

function onLoad() { 

  this.headerBar.title = "Login";
  this.headerBar.titleColor = Color.create("#000000");
  this.headerBar.backgroundColor = Color.create("#FFFFFF");
  this.headerBar.visible = false;

  this.statusBar.visible = false;
  this.layout.alignContent = FlexLayout.AlignContent.STRETCH;
  this.layout.alignItems = FlexLayout.AlignItems.STRETCH;
  this.layout.direction = FlexLayout.Direction.INHERIT;
  this.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
  this.layout.flexWrap = FlexLayout.FlexWrap.NOWRAP;
  this.layout.justifyContent = FlexLayout.JustifyContent.FLEX_START;
  this.layout.backgroundColor = Color.create("#FFFFFF");

    
  //add components to page.
	const childrenOfPage = this.children || {},
		pageLayout = this.layout;
		
	Object
		.keys(childrenOfPage)
		.forEach(function(childName) {
			var component = childrenOfPage[childName];
			if (component.children) {
				addChild(component);
			}
			pageLayout.addChild(component);
		});
		
}

//add child components to parent component.
function addChild(component) {

	Object
		.keys(component.children)
		.forEach(function(childName) {
			var child = component.children[childName];
			if (child.children) {
				addChild(child);
			}
			component.addChild(child);
		});
		
}

module && (module.exports = PgLogin_);