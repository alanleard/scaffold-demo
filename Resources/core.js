/**
 * Main app control / singleton
 */

// Module dependencies if any here

/**
 * Main app singleton
 * @type {Object}
 */
var APP = {
    /**
     * Sets up the app singleton and all it's child dependencies
     * NOTE: This should only be fired in app.js file and only once.
     */
    init: function() {
        // Setup constants
		APP.DEBUG_MODE = true;
		APP.VERSION = "0.0.1";
        // Setup lib dependancies (so we only have to require just this module, not all these in every file)
        APP.HTTP = require('modules/lib/http');
        APP.Platform = require('modules/lib/platform');

        // Global system Events
        Ti.Gesture.addEventListener('orientationchange', APP.orientationObserverUpdate);
        Ti.Network.addEventListener('change', APP.networkObserverUpdate);
		Ti.App.addEventListener("pause", APP.exit);
		Ti.App.addEventListener("close", APP.exit);
		Ti.App.addEventListener("resumed", APP.resume);
    },
    /**
     * The main app window
     * @type {Object}
     */
    masterWindow: Ti.UI.createWindow(),
    /**
     * Keeps track of the current screen
     * @type {Object}
     */
    currentScreen: null,
    /**
     * Sets the current orientation of the device constant
     * @type {String}
     */
    currentOrientation: (Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT) ? 'landscape' : 'portrait',
    /**
     * Global orientation event handler
     * @param  {Object} e Standard Ti callback
     */
    orientationObserverUpdate: function(e) {
        // Shortcut for current orientation
        var type = (e.orientation == Ti.UI.LANDSCAPE_LEFT || e.orientation == Ti.UI.LANDSCAPE_RIGHT) ? 'landscape' : 'portrait';
        
        // Make sure it's a different orientation before proceeding
        if (APP.currentOrientation != type){
            // If it's an undesired orientation, just ignore
            if (e.orientation == Ti.UI.FACE_UP || e.orientation == Ti.UI.FACE_DOWN || e.orientation == Ti.UI.UNKNOWN ) return;
            
            //Saves the current orientation
            APP.currentOrientation = type;

            // First check if controller has an orientation update (will always take precedence)
            if(APP.currentScreen && APP.currentScreen.orientationUpdate){
                APP.currentScreen.orientationUpdate(type);
            // Otherwise check if the UI of this controller has an orientation update
            } else if(APP.currentScreen && APP.currentScreen.UI.orientationUpdate) {
                APP.currentScreen.UI.orientationUpdate(type);
            }
        }
    },
    /**
     * Global network event handler
     * @param  {Object} _event Standard Ti callback
     */
    networkObserverUpdate: function(_event) {},
    /**
     * Exit event observer
     */
    exit: function() {},
    /**
     * Resume event observer
     */
    resume: function() {}
};

module.exports = APP;