'use strict';

class utility {
    constructor(){
        // nothing
    }
    /* video要素でMediaStreamを再生する
    * @param element
    * @param stream
    */
   static async playMediaStream(element,stream) {
       element.srcObject = stream;
       let playPromise = await element.play();
       if(playPromise !== undefined){
           playPromise.then(() => {
               console.log('play video');
           }).catch(error => {
               console.log('error auto play:' + error);
           });
       }
   }
}
export default utility;
