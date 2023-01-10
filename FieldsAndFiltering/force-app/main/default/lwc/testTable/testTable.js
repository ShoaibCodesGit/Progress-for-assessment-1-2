import { LightningElement, api } from "lwc";
import getAccountLst from '@salesforce/apex/testFetchAccounts.getAccountsData';

export default class TestTable extends LightningElement {
	
    filterBy='Name';
	fullTableData= [];
    filteredData = [];

    connectedCallback(){        
        getAccountLst({}).then( (data)=>{
            console.log('data -', data);
            this.fullTableData =data;
            this.filteredData =data;
        })
    }


    get filterByOPtions(){
        return [

            {label:'All', value:'All'},            
            {label:'Name', value:'Name'},            
            {label:'Industry', value:'Industry'},
            {label:'Rating', value:'Rating'},
            {label:'Phone', value:'Phone'}
        ]
    }

    filterByHandler(event){
        this.filterBy = event.target.value;
    }

    
    filterHandler(event){
        
            if(event.target.value){
                if(event.target.value.length>3){
                    this.filteredData = this.fullTableData.filter(eachObj=>{
                        if(this.filterBy === 'All'){
                            /**Below logic will filter each and every property of object */
                            return Object.keys(eachObj).some(key=>{
                                return eachObj[key].toLowerCase().includes(event.target.value);
                            })
                        } else {
                             /**Below logic will filter only selected fields */
                            const val = eachObj[this.filterBy] ? eachObj[this.filterBy]:''
                            return val.toLowerCase().includes(event.target.value)
                        }
                    })
                }
               

            }else{
                this.filteredData = [...this.fullTableData]
            }
        
    }









    
}