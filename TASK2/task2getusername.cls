public class task2getusername {
    
    //Get user's Name
    @AuraEnabled
  public static String getUserName() {
    return userinfo.getName();
  }
    
    @AuraEnabled
  public static String getUserId() {
    return userinfo.getUserId();
  }
    
    @AuraEnabled
  public static id getusercontactid() {
    Contact cont = [select Id, Name from contact where master__r.Id =: userinfo.getUserId() LIMIT 1];
      return cont.Id;
  }
    
    @AuraEnabled
    public static contact deleteemgcontact(id recordId)
    {
        delete [ select id , name from contact where id =: recordId];
         return null;
        
	}
    
    @AuraEnabled
    public static Contact getContactsPersonalDetails()
    {
        return [SELECT FirstName,
                LastName,
                Email,
                Designation__c,
                Relationship__c,
                Technology__c,
                interest__c
                FROM Contact WHERE Id =: getusercontactid()];
    }
    
    @AuraEnabled
    public static List<Cerificate__c> getContactsCertificates()
    {
        return [SELECT Name, Link__c, Valid_Till__c FROM Cerificate__c WHERE Contact__c =: getusercontactid()];
    }
    
    @AuraEnabled
    public static boolean getContactsCertificate(Cerificate__c certi)
    {
        try
        {
            insert certi;
            return true;
        }
        catch(Exception ex)
        {
            System.debug(ex.getMessage());
            return false;
        }
    }
    
 
   @AuraEnabled
    public static list<Contact> getContactsEmergencyContact()
    {
        //Id x = [SELECT emergencyContact__c FROM Contact WHERE Id =: getusercontactid()].get(0).id;
        //return [SELECT Name, Email, Phone, Relationship__c FROM Contact WHERE Id =: x];
        list<Contact> lstcon = [select id,name,Relationship__c, email, Phone from Contact where emergencyContact__r.id =:  getusercontactid()];
        return lstcon;
    }
    
    @AuraEnabled
    public static List<Contact> getContactsFromSearch(String s)
    {
        String matching = s + '%';
        return [SELECT Name FROM Contact WHERE Name LIKE :matching];
    }
    
     @AuraEnabled
 public static ContactPagerWrapper fetchContact(Decimal pageNumber ,Integer recordToDisply) {
      Integer pageSize = recordToDisply;
      Integer offset = ((Integer)pageNumber - 1) * pageSize;
    
    // create a instance of wrapper class.
    ContactPagerWrapper obj =  new ContactPagerWrapper();
    // set the pageSize,Page(Number), total records and Contact List(using OFFSET)   
        obj.pageSize = pageSize;
        obj.page = (Integer) pageNumber;
        obj.total = [SELECT count() FROM contact];
        obj.Contacts = [SELECT Id, Name,Phone FROM Contact ORDER BY Name LIMIT :recordToDisply OFFSET :offset];
    // return the wrapper class instance .
        return obj;
     }
    
 // create a wrapper class with @AuraEnabled Properties    
 public class ContactPagerWrapper {
    @AuraEnabled public Integer pageSize {get;set;}
    @AuraEnabled public Integer page {get;set;}
    @AuraEnabled public Integer total {get;set;}
    @AuraEnabled public List<Contact> Contacts {get;set;}
   }
    
    
     @AuraEnabled
 public static Cerificate__c AddCerti(string certiName1,string Certificate_Link1,string Certificate_Date1){
     
     String[] strDate = Certificate_Date1.split('-');
      Integer myIntDate = integer.valueOf(strDate[2]);
      Integer myIntMonth = integer.valueOf(strDate[1]);
      Integer myIntYear = integer.valueOf(strDate[0]);
      Date d = Date.newInstance(myIntYear, myIntMonth, myIntDate);
     
 		Cerificate__c c1 = new Cerificate__c();
     	c1.Contact__c = getusercontactid();
     	c1.Link__c = Certificate_Link1;
     	c1.Valid_till__c = d;
     	c1.Name = certiName1;
     system.debug('c1--------->' + c1);
     insert c1;
     return c1;
  
 }
}