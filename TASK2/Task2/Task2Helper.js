({
	greetings : function() {
		var thehours = new Date().getHours();
        var msg;
        var morning = ('Morning');
        var afternoon = ('Afternoon');
        var evening = ('Evening');
    
        if (thehours >= 0 && thehours < 12) {
            msg = morning; 
    
        } else if (thehours >= 12 && thehours < 17) {
            msg = afternoon;
    
        } else if (thehours >= 17 && thehours < 24) {
            msg = evening;
        }
        
        return msg;
	}
})