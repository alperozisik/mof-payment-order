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
const ActivityIndicator = require('sf-core/ui/activityindicator');
const nw = require("smf-nw");
const Font = require('sf-core/ui/font');
var selectionColor = System.OS === "iOS" ? Color.create(14, 122, 254) : Color.create("#dbb651");
var PgListDesign = require("../ui/ui_pgList");
const TextAlignment = require('sf-core/ui/textalignment');
var selectedItems = [];
const PgList = extend(PgListDesign)(
    function(_super) {
        _super(this);
        var page = this;
        var multiSelect = false;
        var dataSet = [];
        var lblNoData = this.children.lblNoData;
        this.onShow = function onShow(e) {
            page.statusBar.android.color = Color.create("#167e43");
            this.headerBar.backgroundColor = Color.create("#dbb651");
            this.headerBar.title = lang['paymentOrders'];
            page.children.flLoading.visible = false;


            var data = e && e.data;

            if (data) {
                var body = data.body.toString();
                var parsedResponse = JSON.parse(body);
                //This variable returns the number of the news from the JSON Data
                //news : This is the name of the JSON object
                var numOfNews = parsedResponse.items.length;
                // 	var newsArray = [];
                updateListView(parsedResponse.items);
            }
            else {
                fetchData();
            }
            toggleListView(false);
        };

        function toggleListView(multiselectValue) {
            if (typeof multiselectValue !== "undefined") {
                if (multiSelect === multiselectValue)
                    return;
                multiSelect = multiselectValue;
            }
            else {
                multiSelect = !multiSelect;
            }
            if (!multiSelect) {
                dataSet.forEach(function logArrayElements(element, index, array) {
                    element.selected = false;
                });
                editItem.text = lang['edit'];
                approveItem.setEnabled(false);
                setMultiselectModeForHeaderBar(false);

            }
            else {
                editItem.text = lang['cancel'];
                //page.headerBar.leftItemEnabled = true;
                setMultiselectModeForHeaderBar(true);
                approveItem.setEnabled(false);
            }
            updateListView();
        }

        function setMultiselectModeForHeaderBar(value) {
            if (System.OS === "iOS") {
                page.headerBar.leftItemEnabled = value;
            }
            else { // android
                if (value) {
                    page.headerBar.setItems([editItem, approveItem]);
                }
                else {
                    page.headerBar.setItems([editItem]);
                }
            }
        }


        var editItem, approveItem;

        var originalLoad = this.onLoad;
        this.onLoad = function onLoad(e) {
            originalLoad && originalLoad(e);

            var activity = new ActivityIndicator({
                width: 42,
                height: 42,
                positionType: FlexLayout.PositionType.RELATIVE,
                //backgroundColor: Color.create("#FFFFFF"),
                alpha: 1,
                //borderColor: Color.create(255, 0, 0, 0),
                color: Color.create("#167e43"),
                borderWidth: 0,
                visible: true,
                ios: {
                    type: ActivityIndicator.iOS.Type.WHITELARGE
                }
            });

            if (System.OS === "iOS")
                page.children.flLoading.children.flIndicatorContainer.borderRadius = 15;

            page.children.flLoading.children.flIndicatorContainer.children = page.children.flLoading.children.flIndicatorContainer.children || {};
            page.children.flLoading.children.flIndicatorContainer.children.activity = activity;
            page.children.flLoading.children.flIndicatorContainer.addChild(activity);

            editItem = new HeaderBarItem({
                title: lang['edit'],
                onPress: function() {
                    toggleListView();
                }
            });

            approveItem = new HeaderBarItem({
                title: lang['approve'],
                onPress: function() {
                    if (getSelectedItemCount() === 0) {
                        return; //double check
                    }
                    else {
                        page.children.flLoading.visible = true;
                        for (i = 0; i < selectedItems.length; i++) {

                            const http = require("sf-core/net/http");

                            var body = selectedItems[i];

                            delete body.selected;
                            body.PaymentOrderStatus = 4;

                            var myHeaders = {
                                "Content-Type": "application/vnd.oracle.adf.resourceitem+json"
                            }
                            var params1 = {
                                url: global.baseUrl + "/PaymentOrderVO/" + body.Id,
                                body: JSON.stringify(body),
                                method: "PATCH",
                                headers: myHeaders
                            }

                            http.request(params1,
                                function(response1) {

                                    toggleListView(false);
                                    fetchData();
                                },
                                function(err1) {
                                    alert("error in change status to 3  " + JSON.stringify(err1));
                                });
                        }
                        page.children.flLoading.visible = false;


                    }

                    // if (getSelectedItemCount() === 0)
                    //     return; //double check
                    // page.children.flLoading.visible = true;
                    // nw.factory("approve")
                    //     .query("userName", global.userData.username)
                    //     .query("password", global.userData.password)
                    //     .query("pold", getSelectedItemIds().join(","))
                    //     .query("actionType", "Approve")
                    //     .result(function(err, data) {
                    //         //TODO handle error
                    //         page.children.flLoading.visible = false;
                    //         toggleListView();
                    //     })[nw.action]();
                    //TODO: perform approve then toggle

                },
                enabled: false
            });
            approveItem.setEnabled = function setEnabled(value) {
                approveItem.enabled = value;
                var color;
                if (System.OS === "Android") {
                    color = value ? Color.create("#167e43") : Color.LIGHTGRAY;
                    approveItem.color = color;
                    var timeOut = 10;
                    editItem.text = multiSelect ? lang['cancel'] : lang['edit'];
                    var itemArray = multiSelect ? [editItem, approveItem] : [editItem];
                    setTimeout(function() {
                        page.headerBar.setItems(itemArray);
                    }, timeOut);
                }
            };
            if (System.OS === "Android") {
                editItem.color = approveItem.color = Color.create("#167e43");
            }
            page.headerBar.setItems([editItem]);
            System.OS === "iOS" && page.headerBar.setLeftItem(approveItem);
            page.headerBar.leftItemEnabled = false;
        };

        this.android.onBackButtonPressed = function() {
            Router.goBack();
        };
        var myListView = new ListView({
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            rowHeight: 81,
            backgroundColor: Color.create("#167e43"),
            itemCount: getDataCount(),
            refreshEnabled: true,
            positionType: FlexLayout.PositionType.ABSOLUTE,

        });

        function updateListView(data) {
            dataSet = data || dataSet || [];
            lblNoData.visible = getDataCount() === 0;
            myListView.itemCount = getDataCount();
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
                backgroundColor: Color.create("#167e43"),
                bottom: 1,
                positionType: FlexLayout.PositionType.ABSOLUTE
            });
            lvItem.addChild(flRowData);

            var lblTitle = new Label({
                id: 102,
                height: 40,
                right: 0,
                left: 0,
                top: 5,
                textAlignment: TextAlignment.MIDRIGHT,
                positionType: FlexLayout.PositionType.ABSOLUTE,
                alignSelf: FlexLayout.AlignSelf.FLEX_START,
                font: Font.create(Font.DEFAULT, 16, Font.BOLD),
                textColor: Color.create("#DFDCE3"),
                backgroundColor: Color.create("#167e43")
            });
            flRowData.addChild(lblTitle);

            var lblSubTitle = new Label({
                id: 103,
                height: 40,
                right: 0,
                textAlignment: TextAlignment.MIDRIGHT,
                left: 0,
                bottom: 5,
                positionType: FlexLayout.PositionType.ABSOLUTE,
                alignSelf: FlexLayout.AlignSelf.FLEX_START,
                textColor: Color.create("#DFDCE3"),
                backgroundColor: Color.create("#167e43")
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
                backgroundColor: Color.create("#C58E1B")
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
            vLineSeparator.visible = getDataCount() !== (index + 1);
            flCheck.visible = multiSelect;
            flRowData.left = multiSelect ? 60 : 15;


            var rowData = dataSet[index];


            lblTitle.text = dataSet[index].BeneficaryName;
            lblSubTitle.text = rowData.PaymentOrderNumber;
            if (multiSelect) {
                var selected = dataSet[index].selected = !!dataSet[index].selected;
                vCheck.backgroundColor = selected ? selectionColor : Color.WHITE;
            }
        };
        myListView.onRowSelected = function(listViewItem, index) {
            var flCheck = listViewItem.findChildById(111);
            var vCheck = flCheck.findChildById(112);
            if (multiSelect) {
                var selected = dataSet[index].selected = !dataSet[index].selected;
                vCheck.backgroundColor = selected ? selectionColor : Color.WHITE;

                if (selected) {
                    selectedItems.push(dataSet[index]);
                }
                else {
                    var index = selectedItems.indexOf(dataSet[index]);
                    if (index > -1) {
                        selectedItems.splice(index, 1);
                    }
                }

                if (getSelectedItemCount() > 0) {
                    approveItem.setEnabled(true);

                }
                else {
                    approveItem.setEnabled(false);
                }
            }
            else {
                var data = dataSet[index];
                Router.go("secondApproverDetails", {
                    title: data.PaymentOrderNumber,
                    id: data.Id,
                    data: data
                });
            }
        };

        myListView.onPullRefresh = function() {
            fetchData(null, true);
        };

        function getDataCount() {
            return (dataSet && dataSet.length) || 0;
        }

        function getSelectedItemCount() {
            var count = 0;
            if (!dataSet) {
                return count;
            }

            dataSet.forEach(function(element, index, array) {
                if (element.selected)
                    count++;
            });
            return count;
        }

        function getSelectedItemIds() {
            var items = [];
            dataSet.forEach(function(element, index, array) {
                if (element.selected)
                    items.push(element.id);
            });
            return items;
        }

        function fetchData(callback, doNotShowLoading) {
            var paymentOrderStatus = global.userData.paymentOrderStatus;
            const http = require("sf-core/net/http");

            // alert("paymentOrderStatus" + paymentOrderStatus);
            var params = {
                url: global.baseUrl + "/PaymentOrderVO?q=PaymentOrderStatus=" + paymentOrderStatus + "&totalResults=true&limit=100",
                method: "GET"
            }


            http.request(params,
                function(response) {
                    var body = response.body;
                    var parsedResponse = JSON.parse(body);
                    // var parsedResponse = JSON.parse(body);
                    //This variable returns the number of the news from the JSON Data
                    //news : This is the name of the JSON object
                    // var numOfNews = parsedResponse.items.length;
                    // 	var newsArray = [];
                    updateListView(parsedResponse.items);
                    //  var response = (err && err.body) || (data && data.body) || {};
                    // updateListView(response);
                    page.children.flLoading.visible = false;
                    callback && callback();

                    // // alert(parsedResponse.items[0].BeneficaryName);
                    // global.userData = { //can use a model too
                    //     username: uiComponents.emailTextBox.text,
                    //     password: uiComponents.passwordTextBox.text,
                    //     data: response
                    // };
                    // Router.go("reviewerList", {
                    //     data: response
                    // });

                },
                function(err) {
                    alert("error in getting payment orders");
                });

            // var username = global.userData.username;
            // var password = global.userData.password;

            // if (!doNotShowLoading) {
            //     page.children.flLoading.visible = true;
            // }
            // nw.factory("payment-order")
            //     .query("userName", username)
            //     .query("password", password)
            //     .result(function(err, data) {
            //         //TODO: handle error
            //         var response = (err && err.body) || (data && data.body) || {};
            //         updateListView(response);
            //         page.children.flLoading.visible = false;
            //         callback && callback();
            //     })[nw.action]();
        }
    });





module && (module.exports = PgList);
