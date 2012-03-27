/**
 * Dashboard style object
 * note: Can also put ios: {}, android: {} and nest the 
 * following properties for platform specific properties.  Another common
 * approach is to branch platform based on file name, eg.
 * 'style.android.js' or 'style.ios.js'
 */
App.Styles.Dashboard = {
	// Landscape values (in this case used when orientation event fired)
	landscape: {
		titleBar: {
			backgroundColor: '#eee'
		}
	},
	// Portrait values
	portrait: {
		titleBar: {
			backgroundColor: '#999'
		}
	},
	// Default values
	titleBar: {
		backgroundColor: '#999',
        height: 50,
        top: 0
	},
	title: {
		textAlign: 'center'
	}
};