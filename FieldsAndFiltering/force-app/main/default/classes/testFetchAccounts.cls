public with sharing class testFetchAccounts {
    @AuraEnabled
    public static list<Account> getAccountsData(){
        return [Select id, Name, Industry, Rating, Phone 
                From Account];
    }
}









