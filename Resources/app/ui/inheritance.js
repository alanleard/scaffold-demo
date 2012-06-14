// Module dependencies
var APP = require('core');

/**
 * Users UI Module
 * @constructor
 */
function UsersUI() {
    var self = this;

    /**
     * Add users to screen
     * @param {Array} _data
     * @example
     * [{
     *     name: ,
     *     id: 
     * }]
     */
    this.addUsers = function(_data) {
        var rows = [];

        for (var i = 0, lgt = _data.length; i < lgt; i++) {
            rows.push({ title: _data[i].name, id: _data[i].id });
        };

        self.wrapper.setData( rows );
    };
    /**
     * The main view for this screen
     * @type {Object}
     */
    this.wrapper = Ti.UI.createTableView({
        data: [{ title: 'Loading rows...' }]
    });
}

module.exports = UsersUI;