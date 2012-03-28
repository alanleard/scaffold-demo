/**
 * Scaffolding App
 * @version      1.0
 */

Ti.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;

// Include global objects
Ti.include(
    // App level files
    'lib/app.js',
    'lib/api.js',
    'plugins/joli.js',
    // Models
    'models/messages.js',
    // UI
    'ui/dashboard/dashboard.js',
    'ui/dashboard/style.js',
    // Controllers
    'controllers/dashboard.js'
);

/** This should kick off any platform **/
// Setup the database dependencies
App.API.setupDatabase();

/* 
 * Things like global object assignment / module use could go here
 * Can set things like App.platform, App.type here, etc.
 */

// Open the app window (This is a one window app sample)
App.Window.open();

/**
 * TEST
 */
App.currentScreen = new App.Controllers.Dashboard();
App.currentScreen.open();
/**
 * END TEST
 */

// Global system Events
Ti.Gesture.addEventListener('orientationchange', App.orientationObserverUpdate);
Ti.Network.addEventListener('change', App.networkObserverUpdate);
Ti.App.addEventListener('resume', App.resumeObserverUpdate);