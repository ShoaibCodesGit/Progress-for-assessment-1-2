import { LightningElement, api } from "lwc";
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import ACCOUNTSList from '@salesforce/apex/ConnectionBetweenOrgs.getAccountsFromOrgB';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';



export default class FilterOrgBRecords extends LightningElement {
        
    objectName= ACCOUNT_OBJECT;

    fields={
        nameField:NAME_FIELD,
        websiteField:WEBSITE_FIELD,
        typeField:TYPE_FIELD,
        industryField:INDUSTRY_FIELD
    }

    handleReset(event){
        const filds =this.template.querySelectorAll('lightning-input-field');
        if(filds){
            Array.from(filds).forEach(element => {
                element.reset();
            });
        }
    }


    HndleSave(event){
        this.showToast();
    }


    showToast(){
        const tst = new ShowToastEvent({
            title:'successfully Created',
            message:'successfully Created',
            variant:'success'
        })
        this.dispatchEvent(tst);
    }


   
    //////


	data;
    filterByAccountName='Name';
    filterByAccountWebsite='Website';
	fullTableData= [];
    filteredData = [];

    connectedCallback(){

        ACCOUNTSList({}).then( (data)=>{            
            this.data=JSON.parse(JSON.stringify(data));  
            console.log('data -', data);          
            this.fullTableData =[...this.data];
            this.filteredData =[...this.data];                      
        })
    }






    Namevalue='';
    searchNameKeyword(event) {
        this.Namevalue = event.target.value;

    }
    

    
    websiteValue='';
    searchWebsiteKeyword(event) {
        this.websiteValue = event.target.value;

    }

   

    anyways(){
        const any = new ShowToastEvent({
            title:'Account Already exists',
            message:'Account Already exists',
            variant:'success'
        })
        this.dispatchEvent(any);
    }

   
    handleTrue=false;  
    handleAnyway(){
        this.anyways();
        this.handleTrue=true;
    }

    

        handleNameKeyword(){
            if(this.Namevalue!=null&&this.Namevalue.length>2){ 
                   this.filteredData = this.fullTableData.filter( (eachrec) =>{ 
                    const nval = eachrec[this.filterByAccountName] ? eachrec[this.filterByAccountName]:'';
                    return nval.toLowerCase().includes(this.Namevalue);
                                    
                })
                this.handleAnyway();

            }else{
                this.filteredData=[...this.fullTableData];
            }   
                                                                                
        }



        handleWebsiteKeyword(){

            if(this.websiteValue!=null&&this.websiteValue.length>2){ 
                this.filteredData = this.fullTableData.filter( (eachrec) =>{ 
                    const ival = eachrec[this.filterByAccountWebsite] ? eachrec[this.filterByAccountWebsite]:'';
                    return ival.toLowerCase().includes(this.websiteValue);
                    
                })

                this.handleAnyway();
            }else{
                this.filteredData=[...this.fullTableData];
            }
        }



        valueForName='';
        onsubmitrecord(){
            if(this.Namevalue!=null&&this.Namevalue.length>2){ 
                this.filteredData = this.fullTableData.filter( (eachrec) =>{ 
                 const nval = eachrec[this.filterByAccountName] ? eachrec[this.filterByAccountName]:'';
                 return nval.toLowerCase().includes(this.Namevalue);
                                 
            })
            this.handleAnyway();

            }else{
                this.filteredData=[...this.fullTableData];
            }
        }









    MoreOptions= false;

    MoreOptionsHandler(event){
        this.MoreOptions= true;
    }










    



}
