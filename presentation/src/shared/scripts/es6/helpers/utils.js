export default () => {

  //global listeners
  document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false); //prevent webview window from scrolling

  FastClick.attach(document.body); //fastclick for mobile

};
