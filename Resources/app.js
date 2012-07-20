Ti.UI.setBackgroundColor("#eee");

// Boot the app
var APP = require('core');
APP.init();

// We'll just open the user screen for now
var UsersController = require('app/controllers/users');
APP.currentScreen = new UsersController();
APP.masterWindow.add( APP.currentScreen.UI.wrapper );

APP.masterWindow.open();