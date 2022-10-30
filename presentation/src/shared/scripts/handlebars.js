/* eslint-disable camelcase */

'use strict';

//Use this file for any data, helpers or partial strings you want to use in your slide .hbs files

exports.data = {
   global: {
      prefix: 'h&s'
   },
   slides: {
   }
};
/* eslint-enable camelcase */
exports.nav = {
   links: [
      {
         slide: 'test_00_00'
      },
      {
         slide: 'test_10_00'
      }
   ]
};

exports.partials = {
   // footer: '<footer>the end</footer>'
   homeIsi: {
      indication: {
         title: 'INDICATION'
      }
   }
};

exports.helpers = {
   checkExternalLink : function(val) {
      return val.includes('http');
   },
   times : function(n, block) {
      var accum = '';
      for(var i = 0; i < n; ++i)
          accum += block.fn(i);
      return accum;
  },
  ifEquals : function(arg1, arg2, options) {
   return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
   }
};

