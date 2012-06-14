/**
 * HTTP Request Helper
 */

/**
 * Standard HTTP Request
 * @param {Object} opts
 * @description The following are valid options to pass through:
 * 	opts.timeout 	: int Timeout request
 * 	opts.type		: string GET/POST
 * 	opts.format     : json, etc.
 * 	opts.data		: mixed The data to pass
 * 	opts.url		: string The url source to call
 * 	opts.onerror	: funtion A function to execute when there is an XHR error
 * 	opts.callback   : function when successful
 */
 exports.request = function(opts) {
	// Setup the xhr object
	var xhr = Ti.Network.createHTTPClient();

	// Set the timeout or a default if one is not provided
	xhr.timeout = (opts.timeout) ? opts.timeout : 25000;

	/**
	 * When XHR request is loaded
	 */
	xhr.onload = function() {
		// If successful
		try {
            var data = (opts.format === 'json') ? this.responseText : this.responseData;
            if(data) {
                data = (opts.format === 'json') ? JSON.parse(data) : data;
				if(opts.callback) {
					(opts.params) ? opts.callback(data, opts.params) : opts.callback(data);
				} else {
					return data;
				}
			}
		}
		// If not successful
		catch(e) {
        	xhr.onerror(e);
		};
	};

	if (opts.ondatastream) {
		xhr.ondatastream = function(e){
			if (opts.ondatastream){
				opts.ondatastream(e.progress);
			}else{
			}
		};
    }

    /**
	 * Error handling
	 * @param {Object} e The callback object
	 */
	xhr.onerror = function(e) {
		if(opts.onerror) {
			opts.onerror(this);
		} else {
            Ti.API.error( JSON.stringify(this) );
		}
	};

	// Open the remote connection
	if(opts.type) {
		xhr.open(opts.type, opts.url);	
	} else {
		xhr.open('GET', opts.url);
	}

    if(opts.headers) {
        for(var i = 0, j = opts.headers.length; i < j; i++) {
            xhr.setRequestHeader( opts.headers[i].name, opts.headers[i].value );
        }
    }

    if(opts.data) {
		// send the data
        xhr.send(JSON.stringify(opts.data));
	} else {
		xhr.send(null);
	}
};