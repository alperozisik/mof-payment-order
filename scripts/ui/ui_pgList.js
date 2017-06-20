/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const ActivityIndicator = require('sf-core/ui/activityindicator');



const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgList_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		}, props || {}));

		const lblNoDataStyle = getCombinedStyle(".label", {});
		var lblNoData = new Label(lblNoDataStyle);
		this.layout.addChild(lblNoData);
		
		const flLoadingStyle = getCombinedStyle(".flexLayout", {});
		var flLoading = new FlexLayout(flLoadingStyle);
		this.layout.addChild(flLoading);
		
		const flIndicatorContainerStyle = getCombinedStyle(".flexLayout", {});
		var flIndicatorContainer = new FlexLayout(flIndicatorContainerStyle);
		flLoading.addChild(flIndicatorContainer);
		
		const activityindicator1Style = getCombinedStyle(".activityIndicator", {});
		var activityindicator1 = new ActivityIndicator(activityindicator1Style);
		flIndicatorContainer.addChild(activityindicator1);
		
		//assign the children to page 
		this.children = Object.assign({}, {
			lblNoData: lblNoData,
			flLoading: flLoading
		});
		
		//assign the children of flLoading
		flLoading.children = Object.assign({}, {
			flIndicatorContainer: flIndicatorContainer
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

module && (module.exports = PgList_);