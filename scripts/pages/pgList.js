/* globals Applicaiton, lang */
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const View = require('sf-core/ui/view');
const System = require("sf-core/device/system");
const HeaderBarItem = require('sf-core/ui/headerbaritem');
var selectionColor = System.OS === "iOS" ? Color.create(14, 122, 254) : Color.create("#167e43");
var PgListDesign = require("../ui/ui_pgList");

const PgList = extend(PgListDesign)(
    function(_super) {
        _super(this);
        var multiSelect = false;
        var dataSet = [];
        var lblNoData = this.children.lblNoData;
        this.onShow = function onShow(e) {
            var data = e && e.data;
            updateListView(data);
        };

        var originalLoad = this.onLoad;
        this.onLoad = function onLoad(e) {
            originalLoad && originalLoad(e);
            var myItem = new HeaderBarItem({
                title: "Edit",
                onPress: function() {
                    multiSelect = !multiSelect;
                    if (!multiSelect) {
                        dataSet.forEach(function logArrayElements(element, index, array) {
                            element.selected = false;
                        });
                    }
                    updateListView();
                }
            });
            this.headerBar.setItems([myItem]);
        };

        var myListView = new ListView({
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            rowHeight: 81,
            backgroundColor: Color.WHITE,
            itemCount: dataSet.length,
            refreshEnabled: false,
            positionType: FlexLayout.PositionType.ABSOLUTE
        });

        function updateListView(data) {
            dataSet = data || dataSet || [];
            lblNoData.visible = dataSet.length === 0;
            myListView.itemCount = dataSet.length;
            myListView.refreshData();
            myListView.stopRefresh();
        }

        this.layout.addChild(myListView);

        myListView.onRowCreate = function() {
            var lvItem = new ListViewItem();
            var flRowData = new FlexLayout({
                id: 101,
                left: 15,
                top: 0,
                right: 5,
                bottom: 1,
                positionType: FlexLayout.PositionType.ABSOLUTE
            });
            lvItem.addChild(flRowData);

            var lblTitle = new Label({
                id: 102,
                height: 40,
                right: 0,
                left: 0,
                top: 0,
                alignSelf: FlexLayout.AlignSelf.FLEX_START
            });
            flRowData.addChild(lblTitle);

            var lblSubTitle = new Label({
                id: 103,
                height: 40,
                right: 0,
                left: 0,
                bottom: 0,
                alignSelf: FlexLayout.AlignSelf.FLEX_START
            });
            flRowData.addChild(lblSubTitle);

            var flCheck = new FlexLayout({
                id: 111,
                left: 0,
                top: 0,
                width: 60,
                bottom: 0,
                positionType: FlexLayout.PositionType.ABSOLUTE,
                visible: false,
                justifyContent: FlexLayout.JustifyContent.CENTER,
                alignItems: FlexLayout.AlignItems.CENTER
            });
            lvItem.addChild(flCheck);

            var vCheck = new View({ //TODO: use image for iOS
                id: 112,
                width: 15,
                height: 15,
                borderColor: selectionColor,
                backgroundColor: Color.WHITE,
                borderWidth: 1,
                borderRadius: 7.5
            });
            flCheck.addChild(vCheck);

            var vLineSeparator = new View({ //TODO: use image for iOS
                id: 121,
                left: 5,
                right: 5,
                height: 1,
                bottom: 0,
                positionType: FlexLayout.PositionType.ABSOLUTE,
                backgroundColor: Color.LIGHTGRAY
            });
            lvItem.addChild(vLineSeparator);

            return lvItem;
        };
        myListView.onRowBind = function(listViewItem, index) {
            var flRowData = listViewItem.findChildById(101);
            var flCheck = listViewItem.findChildById(111);
            var lblTitle = flRowData.findChildById(102);
            var lblSubTitle = flRowData.findChildById(103);
            var vLineSeparator = listViewItem.findChildById(121);
            var vCheck = flCheck.findChildById(112);
            vLineSeparator.visible = dataSet.length !== (index + 1);
            flCheck.visible = multiSelect;
            flRowData.left = multiSelect ? 60 : 15;
            var rowData = dataSet[index];
            lblTitle.text = dataSet[index].beneficaryName;
            lblSubTitle.text = rowData.paymentOrderNumber;
            if (multiSelect) {
                var selected = dataSet[index].selected = !!dataSet[index].selected;
                vCheck.backgroundColor = selected ? selectionColor : Color.WHITE;
                console.log("selected index = " + index);
            }
        };
        myListView.onRowSelected = function(listViewItem, index) {
            var flCheck = listViewItem.findChildById(111);
            var vCheck = flCheck.findChildById(112);
            if (multiSelect) {
                var selected = dataSet[index].selected = !dataSet[index].selected;
                vCheck.backgroundColor = selected ? selectionColor : Color.WHITE;
                console.log("selected index = " + index);
            }
        };

        // myListView.onPullRefresh = function() {
        //     setTimeout(function() {
        //         dataSet.push({
        //             title: 'Smartface Title ' + (dataSet.length + 1),
        //             backgroundColor: Color.RED,
        //         });
        //         updateListView();
        //     }, 1300);
        // };



    });





module && (module.exports = PgList);
