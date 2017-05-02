var Formatters = {

    distance: function(meters) {
        if (meters >= 1000) {
            return (meters / 1000).toFixed(2) + ' km';
        } else {
            return meters + ' m';
        }
    },

    duration: function(seconds, displayHours) {
        if (arguments.length === 1) {
            displayHours = false;
        }
        var duration = moment.duration(seconds, 'seconds');
        var format = '';
        if (displayHours) {
            format += duration.hours() + ':';
        }
        format += (duration.minutes() < 10 ? '0' + duration.minutes() : duration.minutes());
        format += ':' + (duration.seconds() < 10 ? '0' + duration.seconds() : duration.seconds());
        return format;
    },
    
    date: function(date){
	return moment(date).format('Do MMMM YYYY')
    },

    dateFromNow: function(date) {
        return moment(date).fromNow().toUpperCase();
    },
    
    dateActualAndFromNow: function(date) {
        return this.date(date) + " (" + this.dateFromNow(date) + ")";
    },
    
    score: function(score) {
	if (score == null){
		return '';
	}
	return Math.round(score) + ' pts.';
    },
    
    unity: function(unity) {
	if (unity == null){
		return '';
	}
	return unity + ' u.';
    },
    
    volume: function(volume) {
	if (volume == null){
		return '';
	}
	return volume + ' l.';
    }

};
