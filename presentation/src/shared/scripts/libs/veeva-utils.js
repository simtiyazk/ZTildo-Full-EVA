window.veevaUtils = (function(veeva) {
   // Checking is the presentation is running in Veeva or in browser
   var isVeeva = navigator.userAgent.match(/iP(hone|ad)/i) != null;
   console.log('veeva presentation:', isVeeva);

   // https://developer.veevacrm.com/api/CLMLibrary/#gotoslide-key-presentation
   var gotoSlide = function(keymessage, tracking) {
       var keymsg = keymessage.replace(/\.zip/g, '');
       if(isVeeva){
           trackEvent(tracking.id, tracking.type, tracking.description, function(result) {
               if(keymessage !== ''){
                   veeva.gotoSlide(keymessage, '');
               }
           });
       }else{
           window.location.href = '/' + keymsg + '/index.html';
       }
   };

   var trackEvent = function(id, type, description, callback) {
       var myObject = {};
       /* eslint-disable camelcase */
       myObject.Track_Element_Id_vod__c = id;
       myObject.Track_Element_Description_vod__c = description;
       myObject.Usage_Duration_vod__c = 0;
       myObject.Answer_vod__c = '';
       myObject.Usage_Start_Time_vod__c = new Date();
       myObject.Track_Element_Type_vod__c = type;
       veeva.createRecord('Call_Clickstream_vod__c', myObject, callback);
       /* eslint-enable camelcase */
   };
   return {
       gotoSlide: gotoSlide,
       isVeeva: isVeeva,
       trackEvent: trackEvent
   };
})(com.veeva.clm);
