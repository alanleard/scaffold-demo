App = {
    // mobile / web / desktop, etc.
    platform: 'mobile',
    // Type of platform (android, ios, windows7, etc.)
    type: 'ios',
    // Data end points
    API: {},
    // Where models are stored
    Models: {},
    // global controllers if needed
    Controllers: {},
    // Global ui files if needed
    UI: {},
    // Style properties
    Styles: {},
    // The current panel open if relevant
    currentPanel: null,
    // Any 3rd party plugins go here
    Plugins: {},
    Window: Ti.UI.createWindow({
        backgroundColor: 'D6D6D6',
        orientationModes: [
            Ti.UI.PORTRAIT,
            Ti.UI.LANDSCAPE_LEFT,
            Ti.UI.LANDSCAPE_RIGHT
        ]
    })
};

/**
 * Global event observers
 */
App.orientationObserverUpdate = function(e) {
    // Shortcut for current orientation
    var type = (e.source.isLandscape()) ? 'landscape' : 'portrait' ;
    // If our current screen has an orientation method, use it
    if(App.currentScreen && App.currentScreen.UI.orientationUpdate) {
        App.currentScreen.UI.orientationUpdate(type);
    }
};

App.networkObserverUpdate = function() {

};

App.resumeObserverUpdate = function() {

};