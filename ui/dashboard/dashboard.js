/**
 * Dashboard UI objects / layout
 */
App.UI.Dashboard = function() {
    /**
     * Set the title bar text
     * @param {String} title
     */
    function setTitle(newTitle) {
        title.text = newTitle;
    }

    /**
     * Handle orientation
     * @param  {String} type landscape|portrait
     */
    function orientationUpdate(type) {
        titleBar.backgroundColor = App.Styles.Dashboard[type].titleBar.backgroundColor;
    }

    var wrapper = Ti.UI.createView();

    var titleBar = Ti.UI.createView(App.Styles.Dashboard.titleBar);
    var title = Ti.UI.createLabel(App.Styles.Dashboard.title);

    titleBar.add( title );
    wrapper.add( titleBar );

    // Public properties and methods
    return {
        wrapper: wrapper,
        setTitle: setTitle,
        orientationUpdate: orientationUpdate
    };
};