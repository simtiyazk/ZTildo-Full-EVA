   /*
 * Popup tab logic
 */
export default () => {

   const tabPopup = $('.popup--tabs'),
         tabLinks = tabPopup.find('.tab-link a');

   if (tabPopup.length > 0){
      tabLinks.on('click', (e) => {
         e.preventDefault();
         const currentActive = tabPopup.find('.active');

         let targetTab = $(e.target).data('target');  

         currentActive.removeClass('active');
         $('#'+targetTab).addClass('active');
      });
   }
}; 
