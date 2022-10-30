import { zoomed } from '../helpers/zoom-flag';
import { slidesConfig, presentationName } from '../helpers/swipenav-config';
import { StageHostname, StageFolder } from '../helpers/constants';
/*
 * Global Swipe Nav
 */
export default () => {

  var dragging = false,
      mousePosX = 0,
      mousePosXEnd = 0;

  const prefixPresentation = (presentation) => {
    if (typeof presentation === 'undefined'){
      return presentationName;
    } else {
      return presentationName + '_' + presentation;
    }
  };

  const prefixSlide = (slide, presentation) => {
    presentation = prefixPresentation(presentation);
    if (slide.includes(presentation)) {
      return slide;
    } else {
      return presentation + '_' + slide;
    }
  };

  const goTo = (slideId, presentation) => {
    var activePopUp = $('.popup').hasClass('active');
    const isVeeva = navigator.userAgent.match(/iP(hone|ad)/i) != null;
    const hostname = window.location.hostname;


    if (typeof slideId === 'undefined' || activePopUp){
      return;
    }

    if (zoomed.getZoomed()) {
      return;
    }

    var href = '';
    var slide = prefixSlide(slideId, presentation);

    if (typeof presentation === 'undefined') {
      presentation = presentationName;
    }
    else {
      presentation = prefixPresentation(presentation);
    }

    // Local and stage navigation
    if (hostname === 'localhost' && !isVeeva ) {
      href = `/${slide}/${slide}.html`;
    } else if (hostname === StageHostname) {
      href = `http://${hostname}/${StageFolder}/${slide}/${slide}.html`;
    } else if (isVeeva) {
      href = 'veeva:gotoSlide(' + slide + '.zip)';
      console.log('veeva:gotoSlide(' + slide + '.zip)');
    }
    window.location = href;
  };

  const assignEvent = (element, event, callback, useCapture) => {
    useCapture = typeof useCapture !== 'undefined' ? useCapture : false;

    if (element !== null) {

      if (event === 'tap press') {
        var ev = 'touchend';

        //On touch start we reset values and set the start position
        element.addEventListener('touchstart', function(e){
          dragging = false;
          mousePosX = e.touches[0].pageX;
          mousePosXEnd = e.touches[0].pageX;
        });

        //When moving we record the last position
        element.addEventListener('touchmove', function(e){
          mousePosXEnd = e.touches[0].pageX;
        });

        //When the touch finishes, we calculate the distance from the start position
        //if it's bigger than the treshold we set the flag to trigger the swipe
        element.addEventListener('touchend', function(e){
          //Treshold set to a third of the screen width, if bigger than this we trigger the swipe
          var treshold = $(window).width()/3;

          //This covers the swipe to the right and to the left
          if(mousePosXEnd - mousePosX > treshold || mousePosXEnd - mousePosX < -treshold){
            dragging = true;
          }else{
            dragging = false;
          }

          //For testing
          console.log(mousePosX + ' ' + mousePosXEnd + ' ' + dragging);
        });
          element.addEventListener(ev, callback);
        // }
      }
      else {
        var mc = new Hammer(element);
        mc.get('swipe').set({direction: Hammer.DIRECTION_ALL});
        mc.on(event, callback);
      }
    }
  };

  const configureListener = () => {
    if (typeof SlideSwipeConfig !== 'undefined' && typeof SlideSwipeConfig.id !== 'undefined' && SlideSwipeConfig.id && (typeof SlideSwipeConfig.disableSwipe === 'undefined' || !SlideSwipeConfig.disableSwipe) && typeof slidesConfig !== 'undefined' && slidesConfig.length > 0) {
      let slideId = typeof SlideSwipeConfig.swipeId !== 'undefined' && SlideSwipeConfig.swipeId ? SlideSwipeConfig.swipeId : SlideSwipeConfig.id;
      let slideIndex;
      let curreSlideConfig;

      if (SlideSwipeConfig.subSwipe) {
        curreSlideConfig = SlideSwipeConfig.subSwipe;
      } else {
        curreSlideConfig = slidesConfig;
      }

      slideIndex = curreSlideConfig.indexOf(slideId);
      assignEvent(document.body, 'swipeleft', function() {
        console.log('swipe left is go');
        if(slideIndex < curreSlideConfig.length - 1) {
          goTo(curreSlideConfig[slideIndex + 1]);
        }

      });

      assignEvent(document.body, 'swiperight', function() {
        console.log('swipe right is go');
        if(slideIndex > 0) {
          goTo(curreSlideConfig[slideIndex - 1]);
        }
      });
    }

    //Check if the slide has vertical navigation
    // Currently disabled to be worked at a later date
    // if (SlideSwipeConfig.vSwipeId) {
    //   let vSlideId = SlideSwipeConfig.vSwipeId,
    //       vSlideIndex,
    //       vSlideConfig;
    //   //Filter wich vertical slide config will be used
    //   switch (vSlideId.split('_')[0]) {
    //     case '10':
    //       vSlideConfig = v10SlideConfig;
    //       break;
    //     case '30':
    //       vSlideConfig = v30SlideConfig;
    //       break;
    //     case '40':
    //       vSlideConfig = v40SlideConfig;
    //       break;
    //     case '60':
    //       vSlideConfig = v60SlideConfig;
    //       break;
    //     case '120':
    //       vSlideConfig = v120SlideConfig;
    //       break;
    //     default:
    //       break;
    //   }

    //   //Asign vertical slide index of slide
    //   vSlideIndex = vSlideConfig.indexOf(vSlideId);

    //   //Assign up and down swipe events from Hammer
    //   assignEvent(document.body, 'swipeup', function() {
    //     console.log('swipe up is go');
    //     if(vSlideIndex < vSlideConfig.length - 1) {
    //       goTo(vSlideConfig[vSlideIndex + 1]);
    //     }

    //   });

    //   assignEvent(document.body, 'swipedown', function() {
    //     console.log('swipe down is go');
    //     if(vSlideIndex > 0) {
    //       goTo(vSlideConfig[vSlideIndex - 1]);
    //     }
    //   });
    // }

    //Assign events for tab pop ups navigation
    //Validate if tab pop up exists on slide
    //Note: this will not create conflict with global
    //vertical navigation because all navigation is
    //disabled when pop ups are active
    if(!$('.patient-profile-popup').hasClass('disabled')) {
      let tabPopUp = $('.tab-popup'),
          tab1 = tabPopUp.find('.tab-1'),
          tab2 = tabPopUp.find('.tab-2');

      assignEvent(document.body, 'swipeup', function() {
        //Validate if pop up is active and if tab1 is active to
        //switch active classes with tab2
        if(tabPopUp.hasClass('active') && tab1.hasClass('active')) {
          console.log('tabpopup swipe up is go');
          tab1.removeClass('active');
          tab2.addClass('active');
        }
      });

      //Validate if pop up is active and if tab2 is active to
      //switch active classes with tab1
      assignEvent(document.body, 'swipedown', function() {
        if(tabPopUp.hasClass('active') && tab2.hasClass('active')) {
          console.log('tabpopup swipe down is go');
          tab2.removeClass('active');
          tab1.addClass('active');
        }
      });
    }
  };

  const initSwipeNav = () => {
    configureListener();
  };

  initSwipeNav();

};
