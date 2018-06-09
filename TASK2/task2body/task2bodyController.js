({
    doInit : function(component, event, helper)
    {
        console.log("Executing DoInit in Body");
        try
        {
            var sd = component.get("v.switchData");
            console.log('switch data ' + sd + ' type ' + typeof sd);
            
            switch(sd)
            {
                case "1": 
					
                    helper.getPersonalDetails(component);
                    console.log("Showing Personal Details");
                    break;
                    
                case "2": helper.getCertifications(component);
                    console.log("Showing Certifications");
                    break;
                    
                case "3": helper.getEmergencyContact(component);
                    console.log("Showing Emergency Contacts");
                    break;
                    
                case "4": helper.getSearchNames(component);
                    console.log("Showing Search");
                    break;
            }
        }
        catch(ex)
        {
            console.log(ex.message);
        }
        
        //component.find("table1").set("v.data", "v.cont");
    },
    
    handleShowModal: function(component, evt, helper) {
            var modalBody;
            $A.createComponent("c:NewCertificate", {},
               function(content, status) {
                   if (status === "SUCCESS") {
                       modalBody = content;
                       component.find('overlayLib').showCustomModal({
                           header: "Application Confirmation",
                           body: modalBody, 
                           showCloseButton: true,
                           cssClass: "mymodal",
                           closeCallback: function() {
                               
                           }
                       })
                   }                               
               });
        },
    
    
    edit : function(component, event, helper) {
            var a =event.getSource().get("v.value");
            var cname = component.get("v.certiInfo");
            console.log(a);
            console.log("CNAME : " + cname[a].Name);
            var modalBody;
            $A.createComponent("c:modalContent", {"certiId":cname[a].Name,"certiName":cname[a].Name, "certiLink":cname[a].Link__c, "certiValid":cname[a].Valid_Till__c},
               function(content, status) {
                   if (status === "SUCCESS") {
                       modalBody = content;
                       component.find('overlayLib').showCustomModal({
                           header: "Application Confirmation",
                           body: modalBody, 
                           showCloseButton: true,
                           cssClass: "mymodal",
                           closeCallback: function() {
                               
                           }
                       })
                   }                               
               });
            },
    
    searchString : function(component, event, helper)
    {
        var str = component.find("search").get("v.value");
        console.log("Executing Search for : " + str);
        
        if(str )
        {
            helper.getSearchNames(component, str);
            component.set("v.hidecomp",false);
        }
        else
        {
            component.set("v.data1", null);
            component.set("v.hidecomp",true);
        }
        
    },
    
   
    
    handleRowAction: function (component, event, helper)
    {
        console.log("Row clicked!");
        var row = event.getParam('row');
        console.log(row.Id);
        console.log(event.getParam('action').name);
        //If Action 'Show Details' clicked on Row
        if(event.getParam('action').name === 'show_details')
        {
            var ev = $A.get("e.force:navigateToSObject");
            ev.setParams({
                "recordId": row.Id,
                "slideDevName" : "Details"
            });
            ev.fire();
        }
        else if(event.getParam('action').name === 'delete_contact')
        //If Action 'Delete' clicked on Row
       
        {
            console.log("executing else if");
           
            var conid = row.Id;
            console.log("new conid"+ conid);
            helper.DeleteEmgObject(component,conid);
            
        }
        else if(event.getParam('action').name === 'edit_certificate')
        //If Action 'edit' clicked on Row
       
        {
           
           
            var conid = row.Id;
            console.log(conid);
               var evt = $A.get("e.force:navigateToComponent");
                        evt.setParams({
                            componentDef: "c:NewCertificate",
                            componentAttributes: {
                                "certiid" : conid,
                                "certiName" : row.Name,
                                "certiLink" : row.Link__c,
                                "certiValid" : row.Valid_till__c
                            }
                        });
            evt.fire(); 
            
        }
        
        //If Action 'Show Details' clicked on Row
        //if(event.getParam('action').name === 'show_details')
    }
})