({
    //Add or Edit Certificate
    AddCertificate : function(component, event, helper){
		var Name = component.find("Certificate_Name").get("v.value");
        var Link = component.find("Certificate_Link").get("v.value");
        var Valid = component.find("Certificate_Date").get("v.value");
        var action = component.get("c.AddCerti");
        var id=component.get("v.certiId");
        var certifId;
        //Add Certificate
        if(!id || /^\s*$/.test(id)) {
            certifId=null;
        }
        //Edit Certificate
        else
        {  
            certifId=id;
        }
        action.setParams({certiId: certifId,NewName : Name, NewLink : Link, NewDate : Valid});
        action.setCallback(this, function(response){
            
            if(response.getState()==="SUCCESS"){
                $A.get('e.force:refreshView').fire();
                component.find("overlayLib").notifyClose();
            }
            else
            	console.log("Error Fetching Data");
        });
        $A.enqueueAction(action);
       
	}
})