/**
 * The sidebar window / module
 * @example For using this module
 * {
     window: {  }, // TiUIWindow options
     menu: {  }, // TiUIMenu options
     openFrom: 'left', // top/right/bottom/left
     openDistance: 200, // how far the window should open
     menuItems: [ // Menu items to populate the sidebar
         { title: 'Item', rowStyle: {}, icon: 'images/myImage.png' }
     ]
 * }
 */
// Flag for open / close state
var isOpen = false,
    // slide in from left / right / top / bottom
    openFrom = null,
    //The distance the parentWindow will slide
    openDistance = null,
    // Keep track of menu items if any
    menuItems = null;

// The menu tableView
exports.menu = null;

// the window for this module
exports.window = null;

/**
 * Toggle open/close the sub window behind the parent window
 * @param {Object} parentWindow A TiUI window
 */
exports.toggle = function(parentWindow) {
    if(isOpen) {
        parentWindow[openFrom] = 0;
        isOpen = false;
    } else {
        parentWindow[openFrom] = openDistance;
        isOpen = true;
    }
};

/**
 * Add a row to the sidebar menu
 * @param {Object} params
 * @return {Object} TiUITableViewRow
 */
exports.addMenuRow = function(params) {
    var row = Ti.UI.createTableViewRow(params.rowStyle);
    row.id = params.title;
    var label = Ti.UI.createLabel({
        text: params.title
    });

    if(params.icon) {
        var icon = Ti.UI.createImageView({
            image: params.icon
        });
        row.add( icon );
    }

    row.add( label );

    return row;
};

/**
 * Handle initialization of this module
 * @param {Object} params
 */
exports.init = function(params) {
    openFrom = params.openFrom;
    openDistance = params.openDistance;

    exports.window = Ti.UI.createWindow(params.window);
    // If this is a menu sidebar add the menu items
    if(params.menu) {
        exports.menu = Ti.UI.createTableView(params.menu);
        exports.window.add( exports.menu );

        // Keep track of the menu
        menuItems = params.menuItems;

        var rows = [];
        for(var i = 0, lgt = menuItems.length; i < lgt; i++) {
            rows.push( exports.addMenuRow( menuItems[i] ) );
        }

        exports.menu.setData( rows );
    }

    return exports;
};