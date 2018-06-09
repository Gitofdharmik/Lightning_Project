({
	getActions : function()
    {
        var actions = [{ label: 'Show details', name: 'show_details' }
                       
                      ];
        return actions;
    },
    
    getActions_emergency_contact : function()
    {
        var actions = [
                       { label: 'Delete', name: 'delete_contact' }
                      ];
        return actions;
    },
    
	edit_certificate : function()
    {
        var actions = [
                       { label: 'Edit', name: 'edit_certificate' }
                      ];
        return actions;
    },  
    
    setTableData : function(component, columns, result)
    {
        
        console.log('---> ' + columns);
        
        component.set("v.columns", columns);
        console.log(result);
        component.set("v.data1", result);
    },
    
	getPersonalDetails : function(component)
    {
        var action = component.get("c.getContactsPersonalDetails");
        console.log("Executing h.Personal Details");
        action.setCallback(this, function(response)
        {
            if(response.getState() === 'SUCCESS')
            {
                var columns = [
                    {label: 'First Name', fieldName: 'FirstName', type: 'text'},
                    {label: 'Last name', fieldName: 'LastName', type: 'text'},
                    {label: 'Email', fieldName: 'Email', type: 'email'},
                    {label: 'Designation', fieldName: 'Designation__c', type: 'text'},
                    {label: 'Relationship Status', fieldName: 'Relationship__c', type: 'text'},
                    {label: 'Technology', fieldName: 'Technology__c', type: 'text'},
                    {label: 'Interests', fieldName: 'interest__c', type: 'text'}
                ];
                this.setTableData(component, columns, response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    
    getCertifications : function(component) {
        var action = component.get("c.getContactsCertificates");
        action.setCallback(this, function(response)
        {
            var state = response.getState();
            if(state === 'SUCCESS')
            {
                var result = response.getReturnValue();

                console.log(result);
                var columns = [
                    {label: 'Certificate Name', fieldName: 'Name', type: 'text'},
                    {label: 'Link', fieldName: 'Link__c', type: 'text'},
                    {label: 'Valid Till', fieldName: 'Valid_till__c', type: 'date'},
                    {type: 'action', typeAttributes: { rowActions: this.edit_certificate() } }
                    ];
                component.set("v.columns", columns);
				this.setTableData(component, columns, response.getReturnValue());
                component.set("v.data1", result);
            }
        });
        $A.enqueueAction(action);
    },
    
    getEmergencyContact : function(component) {
        var action = component.get("c.getContactsEmergencyContact");
        action.setCallback(this, function(response)
        {
            var state = response.getState();
            if(state === 'SUCCESS')
            {
                var result = response.getReturnValue();

                console.log(result);

                component.set("v.columns", [
                    {label: 'Name', fieldName: 'Name', type: 'text'},
                    {label: 'Email', fieldName: 'Email', type: 'email'},
                    {label: 'Phone', fieldName: 'Phone', type: 'phone'},
                    {label: 'Relationship', fieldName: 'Relationship__c', type: 'text'},
                    {type: 'action', typeAttributes: { rowActions: this.getActions_emergency_contact() }}
                ]);

                component.set("v.data1", result);
            }
        });
        $A.enqueueAction(action);
    },
    
    getSearchNames : function(component, str) {
        var action = component.get("c.getContactsFromSearch");
        action.setParams({s: str});
        action.setCallback(this, function(response)
        {
            var state = response.getState();
            if(state === 'SUCCESS')
            {
                var columns = [
                        {label: 'Id', fieldName: 'Id', type: 'text'},
                        {label: 'Name', fieldName: 'Name', type: 'text'},
                        {type: 'action', typeAttributes: { rowActions: this.getActions() }}
                    ];
                    this.setTableData(component, columns, response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    insertCerti : function(component) {
        var action = component.get("c.insertContactsCertification");
        action.setCallback(this, function(a)
        {
            var state = response.getState();
            if(state === 'SUCCESS')
            {
                console.log(response.getReturnValue());
                component.set("v.username_text", a.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	},
    
    navigateToSearchObject : function(event, contId)
    {
        console.log("Executing Navigate To Search Object");

        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": contId,
            "slideDevName": 'related'
        });
        navEvt.fire();

        /*var contUrl = "https://" + window.location.hostname + "/one/one.app#/sObject/" + contId + "/view";
        console.log("URL is : " + contUrl);
        
        window.open(contUrl);*/
    },
   
    DeleteEmgObject : function(component,conid)
    {
        console.log("Executing DELETE  Object");
        var action = component.get("c.deleteemgcontact");
        action.setParams({
            "recordId": conid,
           
        });
       
        $A.enqueueAction(action);
    }
    
})