({
	 set_greeting : function() {
  		var thehours = new Date().getHours();
        
        if (thehours >= 0 && thehours < 12) {
            return ('Morning'); 
    
        } else if (thehours >= 12 && thehours < 17) {
            return ('Afternoon');
    
        } else if (thehours >= 17 && thehours < 24) {
            return ('Evening');
        }
        
 	},
    //Initialize the value UserName
 	set_UserName : function(component){

 		//Calling Method of BodyCmpController Class
        var action = component.get("c.getUserName");
        action.setCallback (this, function(response) {
            if (response.getState() === "SUCCESS")
                component.set('v.UserName', response.getReturnValue());
         });

        $A.enqueueAction(action);          
    	
 	}
})