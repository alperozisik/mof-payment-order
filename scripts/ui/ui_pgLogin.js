/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const FlexLayout = require('sf-core/ui/flexlayout');
const ImageView = require('sf-core/ui/imageview');
const Button = require('sf-core/ui/button');
const TextBox = require('sf-core/ui/textbox');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgLogin_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		}, props || {}));

		const rootLayoutStyle = getCombinedStyle(".flexLayout", {});
		var rootLayout = new FlexLayout(rootLayoutStyle);
		this.layout.addChild(rootLayout);
		this.rootLayout = rootLayout;

		const spriteLayoutStyle = getCombinedStyle(".flexLayout", {});
		var spriteLayout = new FlexLayout(spriteLayoutStyle);
		rootLayout.addChild(spriteLayout);
		this.spriteLayout = spriteLayout;

		const mainLayoutStyle = getCombinedStyle(".flexLayout", {});
		var mainLayout = new FlexLayout(mainLayoutStyle);
		rootLayout.addChild(mainLayout);
		this.mainLayout = mainLayout;

		const imageLayoutStyle = getCombinedStyle(".flexLayout", {});
		var imageLayout = new FlexLayout(imageLayoutStyle);
		mainLayout.addChild(imageLayout);
		this.imageLayout = imageLayout;

		const imgBgStyle = getCombinedStyle(".imageView", {});
		var imgBg = new ImageView(imgBgStyle);
		spriteLayout.addChild(imgBg);
		this.imgBg = imgBg;

		const topImgStyle = getCombinedStyle(".imageView", {});
		var topImg = new ImageView(topImgStyle);
		spriteLayout.addChild(topImg);
		
		const inputLayoutStyle = getCombinedStyle(".flexLayout", {});
		var inputLayout = new FlexLayout(inputLayoutStyle);
		mainLayout.addChild(inputLayout);
		this.inputLayout = inputLayout;

		const bottomImgStyle = getCombinedStyle(".imageView", {});
		var bottomImg = new ImageView(bottomImgStyle);
		spriteLayout.addChild(bottomImg);
		
		const bottomLayoutStyle = getCombinedStyle(".flexLayout", {});
		var bottomLayout = new FlexLayout(bottomLayoutStyle);
		mainLayout.addChild(bottomLayout);
		this.bottomLayout = bottomLayout;

		const loginButtonStyle = getCombinedStyle(".button", {});
		var loginButton = new Button(loginButtonStyle);
		bottomLayout.addChild(loginButton);
		this.loginButton = loginButton;

		const imageview1Style = getCombinedStyle(".imageView", {});
		var imageview1 = new ImageView(imageview1Style);
		imageLayout.addChild(imageview1);
		this.imageview1 = imageview1;

		const flexlayout7Style = getCombinedStyle(".flexLayout", {});
		var flexlayout7 = new FlexLayout(flexlayout7Style);
		inputLayout.addChild(flexlayout7);
		this.flexlayout7 = flexlayout7;

		const emailLayoutStyle = getCombinedStyle(".flexLayout", {});
		var emailLayout = new FlexLayout(emailLayoutStyle);
		flexlayout7.addChild(emailLayout);
		this.emailLayout = emailLayout;

		const passwordlayout_1Style = getCombinedStyle(".flexLayout", {});
		var passwordlayout_1 = new FlexLayout(passwordlayout_1Style);
		flexlayout7.addChild(passwordlayout_1);
		this.passwordlayout_1 = passwordlayout_1;

		const emailTextBoxStyle = getCombinedStyle(".textBox", {});
		var emailTextBox = new TextBox(emailTextBoxStyle);
		emailLayout.addChild(emailTextBox);
		this.emailTextBox = emailTextBox;

		const passwordTextBoxStyle = getCombinedStyle(".textBox", {});
		var passwordTextBox = new TextBox(passwordTextBoxStyle);
		passwordlayout_1.addChild(passwordTextBox);
		this.passwordTextBox = passwordTextBox;

		//assign the children to page 
		this.children = Object.assign({}, {
			rootLayout: rootLayout
		});
		
		//assign the children of rootLayout
		rootLayout.children = Object.assign({}, {
			spriteLayout: spriteLayout,
			mainLayout: mainLayout
		});
		
		//assign the children of spriteLayout
		spriteLayout.children = Object.assign({}, {
			imgBg: imgBg,
			topImg: topImg,
			bottomImg: bottomImg
		});
		
		//assign the children of mainLayout
		mainLayout.children = Object.assign({}, {
			imageLayout: imageLayout,
			inputLayout: inputLayout,
			bottomLayout: bottomLayout
		});
		
		//assign the children of imageLayout
		imageLayout.children = Object.assign({}, {
			imageview1: imageview1
		});
		
		//assign the children of inputLayout
		inputLayout.children = Object.assign({}, {
			flexlayout7: flexlayout7
		});
		
		//assign the children of bottomLayout
		bottomLayout.children = Object.assign({}, {
			loginButton: loginButton
		});
		
		//assign the children of flexlayout7
		flexlayout7.children = Object.assign({}, {
			emailLayout: emailLayout,
			passwordlayout_1: passwordlayout_1
		});
		
		//assign the children of emailLayout
		emailLayout.children = Object.assign({}, {
			emailTextBox: emailTextBox
		});
		
		//assign the children of passwordlayout_1
		passwordlayout_1.children = Object.assign({}, {
			passwordTextBox: passwordTextBox
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {});
	
	Object.assign(this.statusBar, statusBarStyle);
	
	if(statusBarStyle.color)
	  this.statusBar.android && (this.statusBar.android.color = statusBarStyle.color);
	if(statusBarStyle.style)
	  this.statusBar.ios && (this.statusBar.ios.style = statusBarStyle.style);

  //HeaderBar props
  const headerBarStyle = getCombinedStyle(".headerBar", {});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgLogin_);