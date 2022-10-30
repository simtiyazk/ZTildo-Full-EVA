// Helpers
import helper from './helpers/helper';
import utils from './helpers/utils';

//libs: library is wrapped in UMD: https://www.npmjs.com/package/veevalibrary
// import veevaLibrary from './libs/veeva-library';

// Modules
import globalSwipeNav from './modules/global-swipe-nav';
import popup from './modules/popup';
import tabs from './modules/tabs';
import popupTabs from './modules/popup-tabs';
import clickstream from './modules/clickstream';
import slider from './modules/slider';

$(() => {
   // Helpers
   helper();
   utils();
   tabs();
   // veevaLibrary();
   globalSwipeNav();
   popup();
   popupTabs();
   clickstream();
   slider();
});
