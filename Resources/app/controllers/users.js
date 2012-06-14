// Module dependencies
var APP = require('core');
// Example of platform specific file
var UsersUI = require('app/ui/users');
var UsersModel = require('app/models/users');

/**
 * Users controller module
 * @constructor
 */
function UsersController() {
    var self = this; // Obligatory 'this' reference
    /**
     * The UI object for this controller
     * @type {UsersUI}
     */
    this.UI = new UsersUI();
    /**
     * The model object for this controller
     * @type {UsersModel}
     */
    this.Model = new UsersModel();
    /**
     * Handles the navigation for this screen
     * @param  {Object} _event Typical TiUI click event callback
     */
    this.navigation = function(_event) {
        Ti.API.info( 'User ' + _event.row.title + ' clicked with ID of: ' + _event.row.id );
    };
    /**
     * Handle screen events
     */
    this.UI.wrapper.addEventListener('click', self.navigation);

    /**
     * Logic when instantiating this controller:
     */
    this.Model.getSampleList(self.UI.addUsers);  // Get sample user list
}

module.exports = UsersController;