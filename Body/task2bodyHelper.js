({
	
   GetPersonalDetails : function(component) {
		var action = component.get("c.fetchDetails");
        action.setCallback(this, function(response){
        	console.log(response.getState());
            if(response.getState()==="SUCCESS"){
                component.set("v.recordId",response.getReturnValue());
                component.set("v.ShowPD",true);
                var a=component.get("v.recordId");
                console.log(component.get("v.ShowPD"));
            }
            else
            	console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
	},

	GetCertificateDetails : function (component) {
		var action = component.get("c.fetchCertificates");
        action.setCallback(this, function(response){
        	console.log(response);
            if(response.getState()==="SUCCESS"){
                component.set("v.Current_Contact_Certificate",response.getReturnValue());
            }
            else
            	console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
	},
    
	GetEmergencyContacts : function (component) {
		var action = component.get("c.fetchEmergencyContacts");
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS"){
                component.set("v.Current_Emergency_Contact",response.getReturnValue());
                component.set("v.Count_Emer",component.get("v.Current_Emergency_Contact.length"));
                console.log(component.get("v.Count_Emer"));
            }
            else
            	console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
	}
})