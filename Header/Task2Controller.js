({
	//Initialize the values of greeting and UserName
	get_greeting : function(component, event, helper) {

		//Initialize the value UserName
		helper.set_UserName(component);
		//Initialize the value of greeting
		component.set("v.greeting",helper.set_greeting());

	}
})