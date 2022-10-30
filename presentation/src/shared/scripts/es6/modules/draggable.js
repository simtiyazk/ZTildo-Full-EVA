// import interact from 'interactjs';
import { zoomed } from '../helpers/zoom-flag'; 

export default () => {

  let mainSection = $('.section-image-wrapper');
  var isExpanded = false;

  function hammerIt(elm) {
      let hammertime = new Hammer(elm, {});
      hammertime.get('pinch').set({ 
          enable: true
      });
      var posX = 0,
          posY = 0,
          scale = 1,
          lastScale = 1,
          lastPosX = 0,
          lastPosY = 0,
          maxPosX = 0,
          maxPosY = 0,
          transform = '',
          el = elm;

      hammertime.on('tap doubletap pan pinch panend pinchend swipeleft swiperight swipedown swipeup', function(ev) {
          if (ev.type === 'doubletap') {
              transform =
                  'translate3d(0, 0, 0) ' +
                  'scale3d(2, 2, 1) ';
              scale = 2;
              lastScale = 2;
              try {
                  if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() !== 'matrix(1, 0, 0, 1, 0, 0)') {
                      transform =
                          'translate3d(0, 0, 0) ' +
                          'scale3d(1, 1, 1) ';
                      scale = 1;
                      lastScale = 1;
                  }
              } catch (err) {
                console.log(err);
              }
              //set transform Anchor point
              $(el).css({'transform-origin': ev.center.x + 'px ' + ev.center.y + 'px 0px'});
              el.style.webkitTransform = transform;
              transform = '';
          }

          //pan    
          if (scale !== 1) {
              posX = lastPosX + ev.deltaX;
              posY = lastPosY + ev.deltaY;
              maxPosX = Math.ceil((scale - 1) * el.clientWidth / 2);
              maxPosY = Math.ceil((scale - 1) * el.clientHeight / 2);
              if (posX > maxPosX) {
                  posX = maxPosX;
              }
              if (posX < -maxPosX) {
                  posX = -maxPosX;
              }
              if (posY > maxPosY) {
                  posY = maxPosY;
              }
              if (posY < -maxPosY) {
                  posY = -maxPosY;
              }
          } 


          //pinch

          if (ev.type === 'pinch') {
              $(el).css({'transform-origin': ev.center.x + 'px ' + ev.center.y + 'px 0px'}); 
              scale = Math.max(.999, Math.min(lastScale * (ev.scale), 4)); 
          }

          if(ev.type === 'pinchend'){ lastScale = scale; }

          //panend
          if(ev.type === 'panend'){
              lastPosX = posX < maxPosX ? posX : maxPosX;
              lastPosY = posY < maxPosY ? posY : maxPosY;
          }

          if (scale !== 1) {
              transform =
                  'translate3d(' + posX + 'px,' + posY + 'px, 0) ' +
                  'scale3d(' + scale + ', ' + scale + ', 1)';
          }

          if (transform) {
              //set transform Anchor point
              el.style.webkitTransform = transform;
          }

          if (scale <= 1) {
            zoomed.setZoomed(false);
          } else {
            zoomed.setZoomed(true);
          } 
      });
  } 

  //Showing overlay for one of the interactive slides
  function showOverlay() {
    $('#overlay-container').fadeIn('fast', function() {});
  }

  //Showing overlay for the slide 30
  function showOverlay30(){
    $('#overlay-container-30').fadeIn('fast', function() {});
    if (!$('.swiper-container-vertical').hasClass('swiper-container-vertical')) {
      var slide30Swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          clickable: true 
        }
      });    
    }
  }

  //Hiding overlays
  function hideOverlay(){
    console.log('hideOverlay ');
    $('#overlay-container').fadeOut('fast', function() {});
  }

  function hideOverlay30(){
    console.log('hideOverlay 30');
    $('#overlay-container-30').fadeOut('fast', function() {});
  }

  //Toggle sub section expandable states
  function toogleSubSection(elem) {
      if(isExpanded === false) {
        expandSubSection(elem);
      }else{
        collapseSubSection(elem);
      }
  }

  //Expands the secondary overlay to fullscreen
  function expandSubSection(el) {
    
    if(isExpanded === false) {

      $('.open-overlay').removeClass('hide');
      $('.open-overlay-30').removeClass('hide');
      $('.interactive').addClass('hide-on-expand');

      mainSection.slideUp('slow');

      var currentCarousel = $(el);
      var value = 'none';
      currentCarousel.css({'-webkit-transform': value, '-moz-transform': value, '-o-transform': value, 'msTransform': value, 'transform': value});

      try {
        currentCarousel.slick('unslick');
      } catch(e) {
        //
      }

      isExpanded = true;
    }
  }

  //Collaps the secondary overlay to fullscreen
  function collapseSubSection(el) {
    var currentCarousel = $(el);

    if(isExpanded === true) {

      $('.open-overlay').addClass('hide');
      $('.open-overlay-30').addClass('hide');
      $('.interactive').removeClass('hide-on-expand');

      mainSection.slideDown('slow');

      try{
          currentCarousel.slick('unslick');
        }catch(e) {
          console.log(e);
        }

        currentCarousel.slick({
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
          draggable: false,
          initialSlide: 0, // needs to be reset, so next slide (secundary carousel) won't be affected
          cssEase: 'easeOutElastic'
        });

        var value = 'none';
        $('.section-carousel').css({'-webkit-transform': value, '-moz-transform': value, '-o-transform': value, 'msTransform': value, 'transform': value});

      // Remove from the setTimeout
      $('.slick-dots').css('display', 'block');
      currentCarousel.on('init', function(event, slick) {
        currentCarousel.find('.slide').removeClass('auto-height');
      });

      setTimeout(function() {

        $('.slick-dots').css('display', 'block');

        currentCarousel.on('init', function(event, slick) {
          currentCarousel.find('.slide').removeClass('auto-height');
        });

        isExpanded = false;
      }, 600);
    }
  }

 
 $('.slide').each(function() {
    hammerIt(this);
  });
};


