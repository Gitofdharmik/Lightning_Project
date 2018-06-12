({
 get_Details : function(component, event, helper) {
      //Fetch details for personal details tab
      helper.GetPersonalDetails(component);
      //Fetch details for certifications tab
    	helper.GetCertificateDetails(component);
      //Fetch details for Emergency Contact tab
    	helper.GetEmergencyContacts(component);
    },
  //creates a new component to display pop up to add new certificate   
	handleShowModal: function(component, evt, helper) {
        var modalBody;
        $A.createComponent("c:NewCertificate", {},
           function(content, status) {
               if (status === "SUCCESS") {
                  modalBody = content;
                  component.find('overlayLib').showCustomModal({
                    header: "Create a New Certification",
                    body: modalBody, 
                    showCloseButton: true,
                    cssClass: "mymodal",
                       
                   });
                }                              
           });
    },
  //method to navigate to the record page  
  showContact: function(component, event, helper){
    	var idx =  event.getSource().get("v.value").Id;
      var navEvt = $A.get("e.force:navigateToSObject");
      navEvt.setParams({
          "recordId": idx,
          "slideDevName": "detail"
      });
      navEvt.fire();
    },
  //Delete emergency contact
  Delete_Emer_Contact : function(component, event, helper){
        console.log("Entering Delete Stage");
        var a =event.getSource().get("v.value");
		    component.set("v.DeleterecordId",event.getSource().get("v.value"));
        console.log(component.get("v.DeleterecordId"));
        component.set("v.ShowEmergencyCon",true);
        component.find("deleteRecorddetails").reloadRecord();
    },
  //Called when the emergency Contact is deleted
  recordUpdated : function(component){
        component.find("deleteRecorddetails").deleteRecord($A.getCallback(function(deleteResult){
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                var resultsToast = $A.get("e.force:showToast");
           		 resultsToast.setParams({
                			"title": "Deleted",
                			"message": "The record was deleted."
            	 });
           		 resultsToast.fire();
               component.set("v.Count_Emer","v.Count_Emer.length-1");
            }
        }))
        $A.get('e.force:refreshView').fire();
    },
  //Method to edit the certificate using the same modal component to pop up
  edit : function(component, event, helper) {
            var a =event.getSource().get("v.value");
            var cname = component.get("v.Current_Contact_Certificate");
            var modalBody;
            $A.createComponent("c:NewCertificate", {"certiId":cname[a].Id,"certiName":cname[a].Name, "certiLink":cname[a].Link__c, "certiValid":cname[a].Valid_Till__c},
               function(content, status) {
                   if (status === "SUCCESS") {
                       modalBody = content;
                       component.find('overlayLib').showCustomModal({
                           header: "Application Confirmation",
                           body: modalBody, 
                           showCloseButton: true,
                           cssClass: "mymodal",
                           
                       })
                       
                   }                               
               });

            }
})