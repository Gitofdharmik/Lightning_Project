({
	doInit : function(component, event, helper) {
        console.log("Executing DoInit");
		var greet_text = helper.greetings();
        console.log(greet_text);
        component.set("v.greeting_text", greet_text);
        
        var action = component.get("c.getUserName");
        action.setCallback(this, function(a)
        {
            var state = a.getState();
            if(state === 'SUCCESS')
            {
                console.log(a.getReturnValue());
                component.set("v.username_text", a.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
	}
})