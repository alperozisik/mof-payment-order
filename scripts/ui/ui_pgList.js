/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const ActivityIndicator = require('sf-core/ui/activityindicator');



const PgList_ = extend(Page)(
	//constructor
	function(_super){
		// initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this)
		});

		var lblNoData = new Label({
			width: 250,
			height: 70,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create("#000000"),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
			text: "Nothing to display"
		});
		lblNoData.font = Font.create("default", 22, Font.NORMAL);
		
		var activityindicator1 = new ActivityIndicator({
			width: 42,
			height: 42,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		
		var flLoading = new FlexLayout({
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
			backgroundColor: Color.create(204, 67, 49, 10),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		
		var flIndicatorContainer = new FlexLayout({
			width: 200,
			height: 200,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			alignSelf: FlexLayout.AlignSelf.CENTER,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		});
		
		
		
		//assign the children to page 
		this.children = Object.assign({}, {
			lblNoData: lblNoData,
			flLoading: flLoading
		});
		
		//assign the children of flLoading
		flLoading.children =  Object.assign({}, {
			flIndicatorContainer: flIndicatorContainer
		});

});

function onLoad() { 

  this.headerBar.title = "Payments Waiting Approval";
  this.headerBar.titleColor = Color.create("#000000");
  this.headerBar.backgroundColor = Color.create("#FFFFFF");
  this.headerBar.visible = true;

  this.statusBar.visible = true;
  this.layout.alignContent = FlexLayout.AlignContent.STRETCH;
  this.layout.alignItems = FlexLayout.AlignItems.CENTER;
  this.layout.direction = FlexLayout.Direction.INHERIT;
  this.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
  this.layout.flexWrap = FlexLayout.FlexWrap.NOWRAP;
  this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
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

module && (module.exports = PgList_);