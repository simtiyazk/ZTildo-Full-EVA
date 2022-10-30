/*
 * Popup logic
 */
export default () => {

   const popupCta = $('.popup-trigger');
   const navBtn = $('.hamburger-menu');
   const megaNav = $('.mega-nav');
   const barGraphanimte = $('.bar-graph-animation');

   if (popupCta.length === 0){
      return;
   } else {
      popupCta.on('click', function togglePopUp (e){
         e.preventDefault();
         if ($(this).attr('disabled')) {
            return;
         } else {
            let popUps = $('.popup'),
                activePopUp = popUps.filter('.active'),
                openingPopUp = $(this).data('popup'),
                sdpopup = $('#sd-popup.study-popup'),
                refpopup = $('#ref-popup.popup'),
                contentpopup = $('.popup.content-popup');
                

            if(activePopUp.length > 0 && activePopUp.find('.tab').filter('.active').data('ref')) {
               openingPopUp = activePopUp.find('.tab').filter('.active').data('ref');
            }

            popUps.addClass('hide');
            popUps.removeClass('active');
            let $openingPopUp = $(`#${openingPopUp}`);
            $openingPopUp.toggleClass('hide active');
            $(this).toggleClass('active');

            megaNav.removeClass('open');
            navBtn.removeClass('active');

            if($openingPopUp.hasClass('popup--tabs')) {
              let tabs = $openingPopUp.find('.tab');
              tabs.removeClass('active');
              tabs.first().addClass('active');
            }

            if(sdpopup.hasClass('active')) {
               $('.sd-btn').addClass('actv');
             }
             
            if(refpopup.hasClass('active')) {
               $('.ref-btn').addClass('actv');
            }

            if(contentpopup.hasClass('active')) {
               barGraphanimte.addClass('barchart-animate');
            }

         }
      });

      const closePopup = (target) => {
         let closetPopUp = $(target).closest('.popup'),
             currentVideo = closetPopUp.find('video');

         if(currentVideo.length > 0) {
            currentVideo[0].pause();
            currentVideo[0].currentTime = 0;
         }
         closetPopUp.addClass('hide');
         closetPopUp.removeClass('active');
      };

      $('.popup-close').on('click', function closeCurrentPopUp(){
         closePopup(this);
         $('.sd-btn,.ref-btn').removeClass('actv');
      });

      $('.overlay').on('click', function closeCurrentPopUp(){
         closePopup(this);
         $('.sd-btn,.ref-btn').removeClass('actv');
      });
   }
};
