import veevaLibrary from '../libs/veeva-library';

export default () => {
  const selectors = $('.clickstream');

  selectors.on('click', e => {
    const data = e.currentTarget.getAttribute('data-clickstream').split('|');

    const myObject = {
      /* eslint-disable camelcase */
      Track_Element_Id_vod__c: data[0],
      /* eslint-disable camelcase */
      Track_Element_Type_vod__c: data[1],
      /* eslint-disable camelcase */
      Track_Element_Description_vod__c: data[2]
    };

    if(window.isVeeva) {
      veevaLibrary();
      //Create a new Call Clickstream record in the CRM and assign the contents
      com.veeva.clm.createRecord('Call_Clickstream_vod__c', myObject);
    } else {
      console.log(myObject);
    }
  });
};