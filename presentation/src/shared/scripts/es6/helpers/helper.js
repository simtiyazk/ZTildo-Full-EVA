import { StageHostname, StageFolder } from './constants';

export default () => {
   const touchclick = ('ontouchend' in document.documentElement) ? 'touchend' : (window.navigator.pointerEnabled) ? 'pointerup' : 'click';
   const isVeeva = navigator.userAgent.match(/iP(hone|ad)/i) != null;
   window.isVeeva = isVeeva;
   const hostname = window.location.hostname;
   console.log('veeva presentation:', isVeeva);

   if (!isVeeva) {
      $('html').addClass('localhost');
      $('.goToSlide').on(touchclick, (e) => {
         e.preventDefault();
         const slide = $(e.target).data('slide');
         let href = '/';
         if (hostname === 'localhost') {
            href = `/${slide}/${slide}.html`;
         } else if (hostname === StageHostname) {
            href = `http://${hostname}/${StageFolder}/${slide}/${slide}.html`;
         }
         window.location.href = href;
      });
   } else {
      $('.goToSlide').on(touchclick, (e) => {
         e.preventDefault();
         const slide = $(e.target).data('slide');
         const presentation = $(e.target).data('presentation');
         window.location.href = `veeva:gotoSlide(${slide}.zip${presentation ? `, ${presentation}`: ''})`;
      });
   }
};
