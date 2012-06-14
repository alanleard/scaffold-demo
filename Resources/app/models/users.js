// Module dependencies
var APP = require('core');

/**
 * Users model module
 * @constructor
 */
function UsersModel() {
    var self = this;

    /**
     * Get a sample list of users
     * @param {Function} _callback
     */
    this.getSampleList = function(_callback) {
        var users = [
            { name: 'Aaron', id: 1 },
            { name: 'Jim', id: 2 },
            { name: 'Mike', id: 3 }
        ];

        if(_callback) { _callback(users); }
    };
}

module.exports = UsersModel;