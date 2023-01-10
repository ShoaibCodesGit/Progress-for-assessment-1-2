import { LightningElement, api, track } from "lwc";


export default class IFrameLwc extends LightningElement {
	
theIframe;
@track fullUrl;

@api isReloaded = false;


renderedCallback(){
    this.fullUrl='https://www.bing.com/';
    console.log('renderedCallBack called '+ this.theIframe);
    if(this.theIframe==undefined){
        this.theIframe=this.template.querySelector('iframe');
        this.theIframe.onload= ()=>{
            console.log('onload called '+this.isReloaded);
            if(!this.isReloaded){
                this.isReloaded=true;
                this.theIframe.src=this.theIframe.src;
            }
        }
    }

}


}