/*
 * Setup and init SQLite / data models, etc.
 */
App.API.setupDatabase = function() {
    // Assign the Joli ORM
    App.API.DB= require('plugins/joli').connect('scaffold');

    // Table schemas
    App.API.TestData = new App.API.DB.model({
        table: 'testdata',
        columns:  {
            id: 'PRIMARY KEY',
            notes: 'TEXT'
        }
    });

    App.API.DB.models.initialize();
};