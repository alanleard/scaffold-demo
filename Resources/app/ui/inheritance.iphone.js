// Module dependencies
var APP = require('core');
var UsersUI = require('app/ui/users'); // Parent module we'll inherit from

/**
 * Users iPhone specific UI Module
 * @constructor
 */
function UsersUIiPhone() {
    // Inherit all methods from the parent user module
    UsersUI.apply(this);

    var self = this;

    /**
     * Add users to screen (overriden method from parent method to add some more stuff)
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
            rows.push({ title: 'Name: ' + _data[i].name + ' and ID is: ' + _data[i].id, id: _data[i].id });
        };

        self.wrapper.setData( rows );
    };
}

module.exports = UsersUIiPhone;