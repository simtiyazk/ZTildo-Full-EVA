/*
* Popup logic
*/
export default () => {

   const scroll = $('.scroller'),
      scrollVelocity = 15,
      scrollContent = scroll.find('.scroller-content'),
      scrollOffset = scroll.offset().top;

   let lastY,
      currentY,
      currentScroll,
      isiScrollPosition,
      checkFontLoad;

   const scrollToSection = (element) => {
      console.log(scrollContent.height());
      console.log(element.offset().top);
      console.log(scrollOffset);
      // let scrollDistance = Math.floor((element.offset().top - scrollOffset));
      let scrollDistance = 0;
      switch (element.attr('id')) {
         case 'indication':
            scrollDistance = 0;
            break;
         case 'warnings-precautions':
            scrollDistance = 101;
            break;
         case 'retinal-abnormalities':
            scrollDistance = 205;
            break;
         case 'increased-intraocular':
            scrollDistance = 307;
            break;
         case 'cataract':
            scrollDistance = 409;
            break;
         case 'common-sense':
            scrollDistance = 528;
            break;
         case 'immunogenicity':
            scrollDistance = 611;
            break;
         case 'pediatric-use':
            scrollDistance = 740;
            break;
      }
      scroll.scrollTop(scrollDistance);
   };

   if (scroll) {
      scroll.on('touchmove', function (e) {
         currentY = e.originalEvent.touches[0].clientY;
         currentScroll = $(this).scrollTop();

         if (currentY > lastY) {
            $(this).scrollTop(currentScroll - scrollVelocity);
         } else if (currentY < lastY) {
            $(this).scrollTop(currentScroll + scrollVelocity);
         }

         lastY = currentY;
      });
   }

   $(document).ready(function () {
      const scrollElem = $('.slide').data('isiscroll');

      if (scrollElem) {
         // setTimeout(function(){ scrollToSection($(`#${scrollElem}`)); }, 100);
         // scrollToSection($(`#${scrollElem}`));
         checkFontLoad = setInterval(function () {
            if (scrollContent.height() >= 891) {
               scrollToSection($(`#${scrollElem}`));
               clearInterval(checkFontLoad);
            }
         }, 100);
      }
   });
};
