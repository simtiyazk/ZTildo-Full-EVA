const http = require('http');
const url = require('url');
const routes = require('../routes.js');
var Controller = require('../controller.js');


module.exports = http.createServer((req, res) => {
    const reqUrl =  url.parse(req.url, true);

    //Get routes
    var i;
    var validRoute = false;
    for (i = 0; i < routes.length; i++) {
        var route = new RegExp(routes[i].url);
        if(reqUrl.pathname.match(route) && req.method === routes[i].method) {
            var match = route.exec(reqUrl.pathname);
            var controller = routes[i].controller
            validRoute = true;
            Controller[controller](req, res, match);
        }
    }

    if(!validRoute){
        Controller.invalidUrl(req, res);
    }

})