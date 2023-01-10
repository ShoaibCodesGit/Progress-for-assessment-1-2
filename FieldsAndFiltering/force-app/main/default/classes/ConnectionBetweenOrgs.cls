public with sharing class ConnectionBetweenOrgs {
    
    @AuraEnabled
    public static Object getAccountsFromOrgB(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('callout:ConnectToOrgB/services/apexrest/Accounts');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if(response.getStatusCode() == 200) {
            // list<Object> results = (list<object>)JSON.deserializeUntyped(response.getBody());
           system.debug('response-----'+response.getBody());

               return JSON.deserializeUntyped(response.getBody());
        }
        return '';
    }
       

    // Query=UserCode = \''+userCode+ '\'
    
}