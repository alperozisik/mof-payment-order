/* globals lang, Device */
const extend = require("js-base/core/extend");
const Button = require('sf-core/ui/button');
const Label = require('sf-core/ui/label');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const Font = require('sf-core/ui/font');
const Image = require('sf-core/ui/image');
const ImageView = require('sf-core/ui/imageview');
const ScrollView = require('sf-core/ui/scrollview');
const Application = require('sf-core/application');
const TextBox = require('sf-core/ui/textbox');
const KeyboardType = require('sf-core/ui/keyboardtype');
const TextAlignment = require('sf-core/ui/textalignment');
const AlertView = require('sf-core/ui/alertview');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Picker = require('sf-core/ui/picker');
const Animator = require('sf-core/ui/animator');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const System = require("sf-core/device/system");
const nw = require("smf-nw");


const Router = require("sf-core/ui/router");
// Get generetad UI code
var PageDetailsDesign = require("../ui/ui_pgDetails");

const pgDetails = extend(PageDetailsDesign)(
    function(_super) {
        var self = this;
        _super(self);
        var originalLoad = this.onLoad;
        var page = this;
        page.children = page.children || {};
        this.onLoad = function() {
            originalLoad();
            page.headerBar.backgroundColor = Color.create("#dbb651");
            page.headerBar.titleColor = Color.WHITE;
            if (System.OS === "iOS") {
                page.headerBar.backgroundColor = Color.create("#dbb651");
                page.headerBar.titleColor = Color.BLACK;
            }
            initializeHeaderBarItems(page.headerBar);


            var scrollView = new ScrollView({
                align: ScrollView.Align.VERTICAL,
                id: 1
            });
            scrollView.flexGrow = 1;

            var scrollRootFlex = new FlexLayout();
            page.scrollRootFlex = scrollRootFlex;
            scrollRootFlex.fieldObjects = {};
            scrollRootFlex.height = 740;

            if (System.OS === "Android") {
                // var title = createTitleFlex(60, 15);
                // scrollRootFlex.addChild(title);
            }

            // var hintArray = [lang["pgFeedback.name"], lang["pgFeedback.city"], lang["pgFeedback.phoneNumber"], lang["pgFeedback.email"]]
            var hintArray = [lang['date'], lang['financialYear'], lang['exchangeMethod'], lang['beneficaryNumber'], lang['beneficaryName'], lang['beneficaryAlternative'], lang['bankAccountNumber'], lang['currency'], lang['amount']];
            var keys = ["date", "financialYear", "exchangeMethod", "beneficaryNumber", "beneficaryName", "beneficarAlternative", "bankAccountNumber", "currency", "amount"];
            for (var i = 1; i <= hintArray.length; i++) {
                var fieldFlex = createItemFlex(60, hintArray[i - 1], 15);
                fieldFlex.id = i;
                scrollRootFlex.addChild(fieldFlex);
                scrollRootFlex.fieldObjects[keys[i - 1]] = fieldFlex.children.lblValue;
            }

            var notesFlex = createTextBoxFlex(60, lang['notes'], null, 15);
            scrollRootFlex.addChild(notesFlex);
            scrollRootFlex.fieldObjects.notes = notesFlex;
            page.notes = notesFlex;


            scrollView.addChild(scrollRootFlex);
            this.layout.addChild(scrollView);

            this.layout.backgroundColor = global.detailsBackgroundColor;

            var flButtons = new FlexLayout({
                bottom: 0,
                left: 0,
                right: 0,
                positionType: FlexLayout.PositionType.ABSOLUTE,
                flexDirection: FlexLayout.FlexDirection.ROW,

                alignItems: FlexLayout.AlignItems.STRETCH
            });
            this.layout.addChild(flButtons);
            page.flButtons = flButtons;

            var buttonBase = {
                flexGrow: 1,
                height: 60
            };

            var btnApprove = new Button(Object.assign({}, buttonBase, {
                text: lang['approve'],
                backgroundColor: {
                    normal: Color.create("#167e43"),
                    pressed: Color.create("#004B10"),
                    disabled: Color.create("#001800")
                },
                onPress: function onButtonPress(e) {
                    page.notes.children.warning.visible = false;

                    const http = require("sf-core/net/http");

                    var body = page.data;


                    body.PaymentOrderStatus = 3;
                    var myHeaders = {
                        "Content-Type": "application/vnd.oracle.adf.resourceitem+json"
                    }

                    var params1 = {
                        url: global.baseUrl + "/PaymentOrderVO/" + page.paymentID,
                        body: JSON.stringify(body),
                        method: "PUT",
                        headers: myHeaders
                    }
                    http.request(params1,
                        function(response1) {
                            checkValidationAndRunService(scrollRootFlex, myActivityIndicator, btnReject, btnApprove, false, lang['approve']);
                        },
                        function(err1) {
                            alert("error in change status to 3  " + err1.toString());
                        });







                }
            }));
            flButtons.addChild(btnApprove);

            var btnReject = new Button(Object.assign({}, buttonBase, {
                text: lang['return'],
                backgroundColor: {
                    normal: Color.create("#C58E1B"),
                    pressed: Color.create("#925B00"),
                    disabled: Color.create("#460F00")
                },
                onPress: function onButtonPress(e) {

                    if (page.notes.children.textBox.text.length === 0) {
                        page.notes.children.warning.visible = true;
                        //  checksPass = false;
                    }
                    else {
                        var myAlertView = new AlertView({
                            title: lang['returnPO'],
                            message: lang['areYouSureYouWantToReturnThisPO']
                        });
                        myAlertView.addButton({
                            index: AlertView.ButtonType.NEGATIVE,
                            text: lang['cancel']
                        });
                        myAlertView.addButton({
                            index: AlertView.ButtonType.POSITIVE,
                            text: lang['ok'],
                            onClick: function() {


                                const http = require("sf-core/net/http");
                                var params = {
                                    url: global.baseUrl + "/PaymentOrderVO/" + page.paymentID,
                                    method: "GET"
                                }


                                http.request(params,
                                    function(response) {
                                        var body = response.body;
                                        var parsedResponse = JSON.parse(body);



                                        var myHeaders = {
                                            "Content-Type": "application/vnd.oracle.adf.resourceitem+json"
                                        }

                                        parsedResponse.PaymentOrderStatus = 0;
                                        parsedResponse.Remark = page.notes.children.textBox.text;

                                        var params1 = {
                                            url: global.baseUrl + "/PaymentOrderVO/" + page.paymentID,
                                            body: JSON.stringify(parsedResponse),
                                            method: "PUT",
                                            headers: myHeaders
                                        }


                                        http.request(params1,
                                            function(response1) {
                                                checkValidationAndRunService(scrollRootFlex, myActivityIndicator, btnReject, btnApprove, true, lang['reject']);
                                            },
                                            function(err1) {
                                                alert("error in change status to 2  ");
                                            });


                                    },
                                    function(err) {
                                        alert("error in approve ");
                                    });

                            }
                        });

                        myAlertView.show();
                    }

                }
            }));
            flButtons.addChild(btnReject);

            var myActivityIndicator = new ActivityIndicator({
                color: Color.WHITE,
                ios: {
                    type: ActivityIndicator.iOS.Type.WHITE
                }
            });

            myActivityIndicator.height = 60;
            myActivityIndicator.bottom = 0;
            myActivityIndicator.left = 0;
            myActivityIndicator.right = 0;
            myActivityIndicator.positionType = FlexLayout.PositionType.ABSOLUTE;
            myActivityIndicator.alpha = 0;
            this.layout.addChild(myActivityIndicator);

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
            flLoading.children = flLoading.children || {};
            this.layout.addChild(flLoading);
            page.children.flLoading = flLoading;
            console.log("added page.children.flLoading");


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
            flIndicatorContainer.children = flIndicatorContainer.children || {};
            flLoading.addChild(flIndicatorContainer);
            flLoading.children.flIndicatorContainer = flIndicatorContainer;


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
            flIndicatorContainer.children.activity = activity;
            flIndicatorContainer.addChild(activity);

            if (System.OS === "iOS")
                flIndicatorContainer.borderRadius = 15;

            this.layout.applyLayout();
        };

        this.android.onBackButtonPressed = function() {
            Router.goBack();
        };

        this.onShow = function(e) {
            page.children.flLoading.visible = false; //actually should show?
            e = e || {};
            var title = e.title;
            page.headerBar.title = title;
            page.paymentID = e.id;
            page.data = e.data;



            // alert(page.headerBar.title + " " + page.paymentID);
            // const http = require("sf-core/net/http");
            // var params = {
            //     url: "http://192.168.8.103:7101/MOF_POC_REST-RESTWebService-context-root/rest/v1/PaymentOrderVO/" + page.paymentID,
            //     method: "GET"
            // }

            // http.request(params,
            //     function(response) {
            //         var body = response.body;
            //         var parsedResponse = JSON.parse(body);

            //         // alert

            //         page.children.flLoading.visible = false;
            var scrollRootFlex = page.scrollRootFlex;
            scrollRootFlex.fieldObjects.date.text = page.data.PaymentOrderDateH;
            scrollRootFlex.fieldObjects.financialYear.text = page.data.PaymentOrderYear;
            scrollRootFlex.fieldObjects.exchangeMethod.text = page.data.PaymentMethod;
            scrollRootFlex.fieldObjects.beneficaryNumber.text = page.data.BeneficaryCode;
            scrollRootFlex.fieldObjects.beneficaryName.text = page.data.BeneficaryNameAr;
            scrollRootFlex.fieldObjects.beneficarAlternative.text = page.data.BeneficaryName; //TODO: set this correctly by language
            scrollRootFlex.fieldObjects.bankAccountNumber.text = page.data.Iban; // TOOD: set this correct
            scrollRootFlex.fieldObjects.currency.text = page.data.CurrencyName; //TODO: set this correctly by language
            scrollRootFlex.fieldObjects.amount.text = page.data.AmountInWord + "(" + page.data.Amount + ")";

            //         scrollRootFlex.fieldObjects.financialYear.text = response.paymentOrderYear;
            //         scrollRootFlex.fieldObjects.exchangeMethod.text = response.paymentMethod;
            // // alert(parsedResponse.items[0].BeneficaryName);
            // global.userData = { //can use a model too
            //     username: uiComponents.emailTextBox.text,
            //     password: uiComponents.passwordTextBox.text,
            //     data: response
            // };
            // Router.go("reviewerList", {
            //     data: response
            // });

            // },
            // function(err) {
            //     alert("error in getting details orders");
            // });

            // nw.factory("payment-order-detail")
            //     .query("userName", global.userData.username)
            //     .query("password", global.userData.password)
            //     .query("pold", e.id)
            //     .result(function(err, data) {
            //         page.children.flLoading.visible = false;
            //         var scrollRootFlex = page.scrollRootFlex;
            //         //TODO: handle error
            //         var response = (err && err.body) || (data && data.body) || {};
            //         scrollRootFlex.fieldObjects.date.text = response.paymentOrderDateG + " " + response.paymentOrderDateH;
            //         scrollRootFlex.fieldObjects.financialYear.text = response.paymentOrderYear;
            //         scrollRootFlex.fieldObjects.exchangeMethod.text = response.paymentMethod;
            //         scrollRootFlex.fieldObjects.beneficaryNumber.text = response.beneficiaryBean.code;
            //         scrollRootFlex.fieldObjects.beneficaryName.text = response.beneficaryName;
            //         scrollRootFlex.fieldObjects.beneficarAlternative.text = response.beneficiaryBean.nameEn; //TODO: set this correctly by language
            //         scrollRootFlex.fieldObjects.bankAccountNumber.text = response.bankBean.id; // TOOD: set this correct
            //         scrollRootFlex.fieldObjects.currency.text = response.currencyBean.nameEn; //TODO: set this correctly by language
            //         scrollRootFlex.fieldObjects.amount.text = response.amountInWord + "(" + response.amount + ")";

            //     })[nw.action]();

        };


        function createLine(position, margin) {
            var line = new FlexLayout();
            line.positionType = FlexLayout.PositionType.ABSOLUTE;
            line.backgroundColor = global.detailsLineColor;
            line.height = 1;
            line.left = margin;
            line.right = margin;
            position == "top" ? line.top = 0 : line.bottom = 0;
            return line;
        }

        function createTitleFlex(height, margin) {
            var flex = new FlexLayout();
            flex.height = height;

            var labelTitle = new Label();
            labelTitle.text = "page title";
            labelTitle.font = Font.create(Font.DEFAULT, 17, Font.BOLD);
            labelTitle.flexGrow = 1;
            labelTitle.marginLeft = margin;
            labelTitle.marginRight = margin;
            labelTitle.touchEnabled = false;
            labelTitle.textColor = Color.WHITE;
            flex.addChild(labelTitle);

            var line = createLine("bottom", 15);
            flex.addChild(line);

            return flex;
        }

        function createItemFlex(height, text, margin) {
            var flex = new FlexLayout({
                height: height,
                flexDirection: FlexLayout.FlexDirection.COLUMN,
                justifyContent: FlexLayout.JustifyContent.CENTER,
                alignItems: FlexLayout.AlignItems.STRETCH
            });
            flex.children = flex.children || {};

            var labelBase = {
                textAlignment: TextAlignment.MIDRIGHT,
                marginLeft: margin,
                textColor: Color.WHITE,
                marginRight: margin,
                flexGrow: 1
            };

            var lblTitle = new Label(Object.assign({}, labelBase, {
                text: text,
                textColor: Color.WHITE,
                font: global.detailsTitleFont,
            }));
            flex.addChild(lblTitle);
            flex.children.lblTitle = lblTitle;

            var lblValue = new Label(Object.assign({}, labelBase, {
                text: "",
                font: global.detailsValueFont,
                flexGrow: 2
            }));
            flex.addChild(lblValue);
            flex.children.lblValue = lblValue;

            var line = createLine("bottom", 15);
            flex.addChild(line);
            flex.children.line = line;

            return flex;
        }




        function createTextBoxFlex(height, hint, keyboardType, margin) {
            keyboardType = keyboardType || KeyboardType.DEFAULT;
            var flex = new FlexLayout();
            flex.children = flex.children || {};
            flex.height = height;
            var textBox = new TextBox();
            textBox.ios.clearButtonEnabled = true;
            textBox.id = 1;
            textBox.hint = hint;
            textBox.font = Font.create(Font.DEFAULT, 17, Font.NORMAL);
            textBox.textAlignment = TextAlignment.MIDRIGHT;
            textBox.keyboardType = keyboardType;
            textBox.flexGrow = 1;
            textBox.marginLeft = margin;
            textBox.marginRight = margin;
            textBox.textColor = Color.WHITE;
            textBox.android.hintTextColor = Color.WHITE;
            // textBox.onActionButtonPress = function() {
            //     textBox.hideKeyboard();
            // };
            flex.addChild(textBox);
            flex.children.textBox = textBox;

            var imageView = new ImageView();
            imageView.id = 2;
            imageView.positionType = FlexLayout.PositionType.ABSOLUTE;
            imageView.imageFillType = ImageView.FillType.ASPECTFIT;
            imageView.left = margin;
            imageView.top = 20;
            imageView.bottom = 20;
            imageView.width = 30;
            imageView.visible = false;

            imageView.touchEnabled = true;
            imageView.onTouch = function() {
                showAlert("", lang["pgFeedback.warning"]);
            };
            imageView.image = Image.createFromFile("images://warning.png");
            flex.addChild(imageView);
            flex.children.warning = imageView;

            textBox.onEditBegins = function() {
                imageView.visible = false;
            };
            // textBox.onEditEnds = function() {
            //     this.android.onBackButtonPressed = function() {
            //         Router.goBack();
            //     };

            // };


            var line = createLine("bottom", 15);
            flex.addChild(line);
            flex.children.line = line;

            return flex;
        }



        function checkValidationAndRunService(flex, indicator, button, otherButton, shouldCheckEmptyNotes, actionType) {
            var checksPass = true;
            if (shouldCheckEmptyNotes) {
                if (page.notes.children.textBox.text.length === 0) {
                    page.notes.children.warning.visible = true;
                    checksPass = false;
                }
            }

            if (!checksPass)
                return;


            var buttonText = button.text;
            var otherButtonBg = otherButton.backgroundColor;
            otherButton.text = "";
            otherButton.enabled = button.enabled = false;
            if (System.OS === "iOS") {
                Animator.animate(page.layout, 300, function() {
                    button.flexGrow = 1000;
                }).complete(function() {
                    button.text = "";
                    indicator.alpha = 1;
                    startNw();
                });
            }
            else {
                otherButton.backgroundColor = button.backgroundColor;
                button.text = "";
                indicator.alpha = 1;
                startNw();
            }

            function startNw() {
                nw.factory("approve")
                    .query("userName", global.userData.username)
                    .query("password", global.userData.password)
                    .query("pold", page.paymentID)
                    .query("actionType", "Approve")
                    .result(function(err, data) {
                        //TODO handle error
                        indicator.alpha = 0;
                        button.text = lang['saveSuccessfully'];
                        setTimeout(function() {
                            Router.goBack();
                        }, 500);
                    })[nw.action]();
            }

        }

        function showAlert(title, message, onClick) {
            var myAlertView = new AlertView({
                title: title,
                message: message
            });
            myAlertView.addButton({
                index: AlertView.ButtonType.NEGATIVE,
                text: lang['ok'],
                onClick: onClick
            });

            myAlertView.show();
        }

        function initializeHeaderBarItems(headerBar) {
            if (System.OS !== "iOS") {
                var menuItem = new HeaderBarItem({
                    title: "",
                    color: Color.WHITE,
                    image: Image.createFromFile("images://icon_arrow_left.png"),
                    onPress: function() {
                        Router.goBack();
                    }
                });

                headerBar.setLeftItem(menuItem);
            }

        }
    });

module && (module.exports = pgDetails);
