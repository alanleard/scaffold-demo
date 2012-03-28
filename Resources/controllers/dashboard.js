/**
 * Sample controller
 */
App.Controllers.Dashboard = function() {
    var model = new App.Models.Messages();
    var UI = new App.UI.Dashboard();

    /**
     * Open this dashboard
     */
    function open() {
        UI.setTitle( model.getLatestMessage() );
        App.Window.add( UI.wrapper );
    }

    /**
     * Close this dashboard instance
     */
    function close() {
        
    }

    // This is your public API
    return {
        open: open,
        close: close,
        UI: UI
    };
};