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
const ImageFillType = require('sf-core/ui/imagefilltype');
const Button = require('sf-core/ui/button');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const TextBox = require('sf-core/ui/textbox');



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
		this.layout.addChild(rootLayout);
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
		rootLayout.addChild(spriteLayout);
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
		rootLayout.addChild(mainLayout);
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
		mainLayout.addChild(imageLayout);
		this.imageLayout = imageLayout;
		var imgBg = new ImageView({
			left: 0,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://green_bg.png")
		}); 
		spriteLayout.addChild(imgBg);
		this.imgBg = imgBg;
		var topImg = new ImageView({
			left: 0,
			top: 0,
			height: 40,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://top.png"),
			imageFillType: ImageFillType.STRETCH
		}); 
		spriteLayout.addChild(topImg);
		
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
		mainLayout.addChild(inputLayout);
		this.inputLayout = inputLayout;
		var bottomImg = new ImageView({
			left: 0,
			height: 40,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			bottom: 0,
			right: 0,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://bottom.png"),
			imageFillType: ImageFillType.STRETCH
		}); 
		spriteLayout.addChild(bottomImg);
		
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
		mainLayout.addChild(bottomLayout);
		this.bottomLayout = bottomLayout;
		var loginButton = new Button({
			width: 180,
			height: 50,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginTop: 40,
			backgroundColor: Color.create(255, 219, 81, 96),
			alpha: 1,
			borderColor: Color.create(136, 255, 255, 255),
			borderWidth: 1,
			textColor: Color.create("#FFFFFF"),
			textAlignment: TextAlignment.MIDCENTER,
			borderRadius: 25,
			visible: true,
			text: "LOGIN"
		});
		loginButton.font = Font.create("Arial", 26, Font.NORMAL); 
		bottomLayout.addChild(loginButton);
		this.loginButton = loginButton;
		var imageview1 = new ImageView({
			width: 200,
			height: 123,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://moflogo.png"),
			imageFillType: ImageFillType.ASPECTFIT
		}); 
		imageLayout.addChild(imageview1);
		this.imageview1 = imageview1;
		var flexlayout7 = new FlexLayout({
			left: 15,
			top: 20,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 15,
			bottom: 20,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 255, 255, 255),
			borderWidth: 0,
			visible: true
		}); 
		inputLayout.addChild(flexlayout7);
		this.flexlayout7 = flexlayout7;
		var emailLayout = new FlexLayout({
			height: 45,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout7.addChild(emailLayout);
		this.emailLayout = emailLayout;
		var passwordlayout_1 = new FlexLayout({
			height: 45,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout7.addChild(passwordlayout_1);
		this.passwordlayout_1 = passwordlayout_1;
		var emailTextBox = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 255, 255, 255),
			borderWidth: 2,
			textColor: Color.create(255, 255, 255, 255),
			textAlignment: TextAlignment.MIDCENTER,
			borderRadius: 15,
			visible: true,
		});
		emailTextBox.font = Font.create("Lato", 18, Font.NORMAL); 
		emailLayout.addChild(emailTextBox);
		this.emailTextBox = emailTextBox;
		var passwordTextBox = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 255, 255, 255),
			borderWidth: 2,
			textColor: Color.create(255, 255, 255, 255),
			textAlignment: TextAlignment.MIDCENTER,
			borderRadius: 15,
			visible: true,
		});
		passwordTextBox.font = Font.create("Lato", 18, Font.NORMAL); 
		passwordlayout_1.addChild(passwordTextBox);
		this.passwordTextBox = passwordTextBox;
		
		//assign the children to page 
		this.children = Object.assign({}, {
			rootLayout: rootLayout
		});
		
		//assign the children of rootLayout
		rootLayout.children =  Object.assign({}, {
			spriteLayout: spriteLayout,
			mainLayout: mainLayout
		});
		
		//assign the children of spriteLayout
		spriteLayout.children =  Object.assign({}, {
			imgBg: imgBg,
			topImg: topImg,
			bottomImg: bottomImg
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
		
		//assign the children of bottomLayout
		bottomLayout.children =  Object.assign({}, {
			loginButton: loginButton
		});
		
		//assign the children of flexlayout7
		flexlayout7.children =  Object.assign({}, {
			emailLayout: emailLayout,
			passwordlayout_1: passwordlayout_1
		});
		
		//assign the children of emailLayout
		emailLayout.children =  Object.assign({}, {
			emailTextBox: emailTextBox
		});
		
		//assign the children of passwordlayout_1
		passwordlayout_1.children =  Object.assign({}, {
			passwordTextBox: passwordTextBox
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

}

module && (module.exports = PgLogin_);