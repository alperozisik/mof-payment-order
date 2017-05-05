/* globals Device, lang */
const extend = require("js-base/core/extend");
const SpriteView = require("sf-extension-spriteview");
const Timer = require("sf-core/global/timer");
const Router = require("sf-core/ui/router");
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const Font = require('sf-core/ui/font');
const Image = require('sf-core/ui/image');
const ImageView = require('sf-core/ui/imageview');
const PageConstants = {}; //require('pages/PageConstants');
const AlertView = require('sf-core/ui/alertview');
const Application = require("sf-core/application");

// Get generetad UI code
var PageLoginDesign = require("../ui/ui_pgLogin");
const Animator = require('sf-core/ui/animator');
const nw = require("smf-nw");

const PageLogin = extend(PageLoginDesign)(
    function(_super) {
        var self = this;
        _super(self);
        var temp = this.onLoad;
        var uiComponents = this;
        // this.rootLayout.backgroundColor=Color.create("#5500A1F1"); 

        // this.rootLayout.backgroundColor=Color.
        // uiComponents.bottomLayout.children.Direction=FlexLayout.Direction.RTL;
        this.onLoad = function() {
            temp();

            this.imageview1.imageFillType = ImageView.FillType.ASPECTFIT;
            var imageView = new ImageView({
               
            });
            
            // uiComponents.loginButton.backgroundColor= Color.create(255, 8, 2, 238);
            imageView.positionType = FlexLayout.PositionType.ABSOLUTE;
            imageView.height = 50;
            imageView.right = 0;
            imageView.top = 40;
            imageView.left = 0;
            imageView.id = 100;
            imageView.touchEnabled = false;
            imageView.alpha = 1;

            uiComponents.bottomLayout.addChild(imageView);
            uiComponents.loginButton.alpha = 0;
            uiComponents.inputLayout.height = 0;
            uiComponents.inputLayout.alpha = 0;
            this.layout.applyLayout();
        };

        this.android.onBackButtonPressed = function() {
            Application.exit();
        };

        setBackgroundSprite.call(this, uiComponents.spriteLayout);
        setLoginButton.call(this, uiComponents);

        this.onShow = function() {
            uiComponents.emailTextBox.hint = lang['userName'];

            uiComponents.passwordTextBox.hint = lang['password'];
            uiComponents.passwordTextBox.isPassword = true;

            uiComponents.emailTextBox.ios.clearButtonEnabled = true; //TODO: use the extension
            uiComponents.passwordTextBox.ios.clearButtonEnabled = true;
            uiComponents.emailTextBox.text = ""; // TODO: remove after AND-2785
            uiComponents.passwordTextBox.text = ""; // TODO: remove after AND-2785

             this.birdSprite.play(3000);
            restartPage(this, uiComponents);
            this.headerBar.visible = false;
            this.statusBar.visible = false;
        };
    });

function setBackgroundSprite(spriteLayout) {
    this.birdSprite = new SpriteView({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        positionType: FlexLayout.PositionType.ABSOLUTE,
        imageFillType: ImageView.FillType.STRETCH,

        backgroundColor: Color.create("#167e43")
    });
    spriteLayout.addChild(this.birdSprite);

    // this.birdSprite.setSprite({
    //     sheet: Image.createFromFile("images://smartfac.png"),

    //     frameX: 7,
    //     frameY: 4,
    //     frameCount: 27
    // });
}

function setLoginButton(uiComponents) {
    uiComponents.loginButton.onPress = function() {
        var errors = [];
        this.emailTextBox.text.trim().length === 0 && errors.push("• " + lang['userNameNotEmptyMsg']);
        this.passwordTextBox.text.trim().length === 0 && errors.push("• " + lang['passwordNotEmptyMsg']);
        if (errors.length > 0) {
            var alertView = new AlertView({
                title: lang['missingFields'],
                message: errors.join("\n")
            });
            alertView.addButton({
                index: AlertView.ButtonType.POSITIVE,
                text: lang['ok']
            });
            alertView.show();
            return;
        }


        loading(this, uiComponents);
    }.bind(this);
}

function rotateImage(imageView, page) {
    var image;
    if (Device.deviceOS == "Android") {
        const AndroidUnitConverter = require('sf-core/util/Android/unitconverter');
        var pixel = AndroidUnitConverter.dpToPixel(50);
        image = Image.createFromFile("images://loading.png").resize(pixel, pixel);
    }
    else {
        image = Image.createFromFile("images://loading.png").resize(50, 50);
    }

    var counter = 0;
    var myTimer = Timer.setInterval({
        task: function() {
            counter++;
            imageView.image = image.rotate(counter * 7);
        },
        delay: 20
    });

    function clearTimer() {
        Timer.clearTimer(myTimer);
    }
    return clearTimer;
}

function loading(page, uiComponents) {
    var imageView = uiComponents.bottomLayout.findChildById(100);

    uiComponents.loginButton.text = "";
    uiComponents.loginButton.backgroundColor = Color.create("#dbb651");
    var layout;
    if (Device.deviceOS == 'Android') {
        layout = uiComponents.bottomLayout;
    }
    else {
        layout = page.layout;
    }

    Animator.animate(layout, 100, function() {
        uiComponents.loginButton.width = 50;
        if (Device.deviceOS == 'Android') {

        }
        else {
            uiComponents.loginButton.alpha = 0.2;
        }

    }).complete(function() {
        uiComponents.loginButton.alpha = 0;
        var stopRotate = rotateImage(imageView, page);
        Animator.animate(page.layout, 300, function() {
            uiComponents.inputLayout.height = 0;
            imageView.alpha = 1;
            if (Device.deviceOS == 'Android') {

            }
            else {

                uiComponents.inputLayout.alpha = 0;
            }
        }).complete(function() {
            nw.factory("login")
                .query("userName", uiComponents.emailTextBox.text)
                .query("password", uiComponents.passwordTextBox.text)
                .result(function(err, data) {
                    //TODO: handle error
                    var response = (err && err.body) || (data && data.body) || {};
                    if (response.checkLogin === "1") { //user logged in
                        global.userData = { //can use a model too
                            username: uiComponents.emailTextBox.text,
                            password: uiComponents.passwordTextBox.text,
                            data: response
                        };
                    }
                    else {
                        alert("login failed");
                    }
                }).chain("payment-order")
                .query("userName", uiComponents.emailTextBox.text)
                .query("password", uiComponents.passwordTextBox.text)
                .result(function(err, data) {
                    stopRotate();
                    //TODO: handle error
                    var response = (err && err.body) || (data && data.body) || {};
                    //TODO: pass propper data

                    if (global.userData.username == "amro") {
                        Router.go("list", {
                            data: response
                        });
                    }
                    else if (global.userData.username == "oweidi") {
                        Router.go("secondApproverList", {
                            data: response
                        });
                    }
                    else if (global.userData.username == "mof") {
                        Router.go("mofUserList", {
                            data: response
                        });
                    }

                    page.birdSprite.stop();
                })[nw.action]();
        });
    });
}

function restartPage(page, uiComponents) {
    if (uiComponents.inputLayout.height == 150) {
        return;
    }
    var imageView = uiComponents.bottomLayout.findChildById(100);

    uiComponents.loginButton.text = "";

    var layout;
    if (Device.deviceOS == 'Android') {
        layout = uiComponents.bottomLayout;
    }
    else {
        layout = page.layout;
    }

    Animator.animate(page.layout, 300, function() {
        uiComponents.inputLayout.height = 150;
        imageView.alpha = 0.2;
        uiComponents.inputLayout.alpha = 1;
    }).complete(function() {
        imageView.alpha = 0;
        Animator.animate(layout, 100, function() {
            uiComponents.loginButton.width = 180;
            uiComponents.loginButton.alpha = 1;
        }).complete(function() {
            uiComponents.loginButton.text = lang['login'];

        });
    });
}

module && (module.exports = PageLogin);
