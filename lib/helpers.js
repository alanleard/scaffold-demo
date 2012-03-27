/**
 * Helper module
 */

exports.array = {
    max: function(_array) {
        return Math.max.apply( Math, _array );
    },
    min: function(_array) {
        return Math.min.apply( Math, _array );
    },
    remove: function(array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    },
    removeVal: function(arr, valToRemove){
      // Normalize to a string like !val!!val!!val!
      var s = '!' + arr.join('!!') + '!';
      // Remove targeted values with delimiters
      s = s.replace(new RegExp('!' + valToRemove + '!', 'g'), '');
      // Remove delimiter added to end in step 1
      s = s.replace(/^!/, '');
      // Remove delimiter added to start in step 1
      s = s.replace(/!$/, '');
      // Convert to array
      return s.split('!!');
    }
};

/**
 * Date Helper Module
 */
exports.date = {
    convert: function(d) {
       // Converts the date in d to a date-object. The input can be:
       //   a date object: returned without modification
       //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
       //   a number     : Interpreted as number of milliseconds
       //                  since 1 Jan 1970 (a timestamp)
       //   a string     : Any format supported by the javascript engine, like
       //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
       //  an object     : Interpreted as an object with year, month and date
       //                  attributes.  **NOTE** month is 0-11.
       return (
           d.constructor === Date ? d :
           d.constructor === Array ? new Date(d[0],d[1],d[2]) :
           d.constructor === Number ? new Date(d) :
           d.constructor === String ? new Date(d) :
           typeof d === "object" ? new Date(d.year,d.month,d.date) :
           NaN
       );
   },
    compare: function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=exports.convert(a).valueOf()) &&
            isFinite(b=exports.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange: function(d,start,end) {
       // Checks if date in d is between dates in start and end.
       // Returns a boolean or NaN:
       //    true  : if d is between start and end (inclusive)
       //    false : if d is before start or after end
       //    NaN   : if one or more of the dates is illegal.
       // NOTE: The code inside isFinite does an assignment (=).
      return (
           isFinite(d=exports.convert(d).valueOf()) &&
           isFinite(start=exports.convert(start).valueOf()) &&
           isFinite(end=exports.convert(end).valueOf()) ?
           start <= d && d <= end :
           NaN
       );
   },
   /**
    * Month / Day / Year format
    * @param {Object} e The Date() object
    * @returns {Object} Object of date references
    */
    dateMDY: function(e) {
        var d       = e,
            month   = (d.getMonth() + 1).toLocaleString(),
            day     = d.getDate().toLocaleString(),
            year    = d.getFullYear().toLocaleString(),
            hour    = d.getHours().toLocaleString(),
            min     = (d.getMinutes().toLocaleString() < 10) ? 0 + d.getMinutes().toLocaleString() : d.getMinutes().toLocaleString(),
            time    = (hour >= 12) ? 'PM' : 'AM';

        if(hour > 12) {
            hour = hour - 12;
        } else if(hour == 0) {
            hour = 12;
        }

        return {
            month: month,
            day: day,
            year: year,
            hour: hour,
            min: min,
            time: time
        };
    },
    descriptiveDate: function (time, curDateObj) {
        curDateObj = curDateObj || new Date();
        var q = new Date(time);
        // q.setTime((Number(q) - (q.getTimezoneOffset() * 60 * 1000)));

        // In seconds...
        var diff = ( Number(curDateObj) - Number(q) ) / 1000;
        var yesterday = curDateObj.getDay() - q.getDay();

        function dayDate(day) {
            var realDay = null;

            switch(day) {
                case 0:
                    realDay = 'Sunday';
                break;
                case 1:
                    realDay = 'Monday';
                break;
                case 2:
                    realDay = 'Tuesday';
                break;
                case 3:
                    realDay = 'Wednesday';
                break;
                case 4:
                    realDay = 'Thursday';
                break;
                case 5:
                    realDay = 'Friday';
                break;
                case 6:
                    realDay = 'Saturday';
                break;
            }

            return realDay;
        };

        // Make some nice looking times.
        if ( diff < 60 ) { // Within a minute.
            return "just now";
        } else if ( diff < 120 ) {
            return "about a minute ago";
        } else if ( diff < 3600 ) { // Within an hour
            return Math.floor(diff / 60) + " minutes ago";
        } else if ( diff < 6300 ) { // Within 1.75 hours
            return "about an hour ago";
        } else if ( diff < 86400 ) { // Within a day
            var hoursAgo = Math.floor(diff / 60 / 60);
            return hoursAgo + " hour" + ( hoursAgo != 1 ? "s" : "" ) + " ago";
        } else if ( diff < 604800 ) { // Within a week
            return ( ( yesterday == 1 || yesterday == -6 ) ? "Yesterday" : dayDate(q.getDay()) ) + ' at ' + String.formatTime(q);
            return Math.floor(diff / 60 / 60 / 24 ) + " days ago";
        } else { // Anything outside of that just shows a date.
            d = q.toLocaleString().split(' ');
            return d[0] + ' ' + d[1].replace(/,/, ' at ') + String.formatTime(q);
        }
    }
};