/* globals Device, lang */
const extend = require("js-base/core/extend");
const SpriteView = require("sf-extension-spriteview");
const Timer = require("sf-core/global/timer");

const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const Font = require('sf-core/ui/font');
const Image = require('sf-core/ui/image');
const ImageView = require('sf-core/ui/imageview');
const PageConstants = {}; //require('pages/PageConstants');
const Router = require("sf-core/ui/router");
const AlertView = require('sf-core/ui/alertview');

// Get generetad UI code
var PageLoginDesign = require("../ui/ui_pgLogin");
const Animator = require('sf-core/ui/animator');
const nw = require("smf-nw");

const LoginCredentials = {
    email: "Oweidi",
    password: "Oweidi"
};

const PageLogin = extend(PageLoginDesign)(
    function(_super) {
        var self = this;
        _super(self);
        var temp = this.onLoad;
        var uiComponents = this;

        this.onLoad = function() {
            temp();

            var imageView = new ImageView();
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

        setBackgroundSprite.call(this, uiComponents.spriteLayout);
        setLoginButton.call(this, uiComponents);

        this.onShow = function() {
            uiComponents.emailTextBox.hint = "Username";
            uiComponents.passwordTextBox.hint = "Password";
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
        imageFillType: ImageView.FillType.STRETCH
    });
    spriteLayout.addChild(this.birdSprite);

    this.birdSprite.setSprite({
        sheet: Image.createFromFile("images://nature3.png"),
        frameX: 9,
        frameY: 6,
        frameCount: 54
    });
}

function setLoginButton(uiComponents) {
    uiComponents.loginButton.onPress = function() {
        // if (this.passwordTextBox.text.toLowerCase() === LoginCredentials.password.toLowerCase() &&
        //     this.emailTextBox.text.toLowerCase() === LoginCredentials.email.toLowerCase()) {
        //     loading(this, uiComponents);
        // }
        // else {
        //     var alertView = new AlertView({
        //         title: "Invalid Credentials",
        //         message: "Username and password not accepted"
        //     });
        //     alertView.addButton({
        //         index: AlertView.ButtonType.POSITIVE,
        //         text: "OK"
        //     });
        //     alertView.show();
        // }
        
        nw.factory("login").query({
            userName: this.emailTextBox.text,
            password: this.passwordTextBox.text
        }).result(function(err, data) {
            var response = (err && err.body) || (data && data.body) || {};
            if(response.checkLogin === "1") { //user logged in
                //TODO: go to list page
                alert("2nd page");
            } else {
                alert("login failed");
            }
        })[nw.action]();
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

            if (counter == 100) {
                Timer.clearTimer(myTimer);
                Router.go(PageConstants.PAGE_CATEGORIES);
                page.birdSprite.stop();
            }
        },
        delay: 20
    });
}

function loading(page, uiComponents) {
    var imageView = uiComponents.bottomLayout.findChildById(100);

    uiComponents.loginButton.text = "";

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
        rotateImage(imageView, page);
        Animator.animate(page.layout, 300, function() {
            uiComponents.inputLayout.height = 0;
            imageView.alpha = 1;
            if (Device.deviceOS == 'Android') {

            }
            else {

                uiComponents.inputLayout.alpha = 0;
            }
        }).complete(function() {

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
            uiComponents.loginButton.text = "LOGIN";

        });
    });
}

module && (module.exports = PageLogin);
