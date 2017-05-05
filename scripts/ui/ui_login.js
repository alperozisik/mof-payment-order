/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const ImageView = require('sf-core/ui/imageview');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Image = require('sf-core/ui/image');



const Login_ = extend(Page)(
	//constructor
	function(_super){
		// initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this)
		});

		var imageview1 = new ImageView({
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
			image: Image.createFromFile("images://splash_image.png")
		});
		
		
		
		//assign the children to page 
		this.children = Object.assign({}, {
			imageview1: imageview1
		});

});

function onLoad() { 

  this.headerBar.title = "newPage001";
  this.headerBar.titleColor = Color.create("#000000");
  this.headerBar.backgroundColor = Color.create("#FFFFFF");
  this.headerBar.visible = true;

  this.statusBar.visible = true;
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

module && (module.exports = Login_);