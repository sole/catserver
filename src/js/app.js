window.addEventListener('load', function() {

  'use strict';

  var getNetworkInfo = require('get-network-info');
  var HTTPServer = require('fxos-web-server');
  var WWW = 'www';
  var divInfo = document.getElementById('info');
  var divMessages = document.getElementById('messages');


  // network info
  var info = getNetworkInfo();
  if(info) {
    divInfo.innerHTML = `<strong>${info.ip}</strong>`;
  } else {
    divInfo.innerHTML = 'UH OH';
  }

  // setting up server
  var server = new HTTPServer(80);

  server.addEventListener('request', function(evt) {
    var request = evt.request;
    var response = evt.response;

    log('requested? ' + request.path);

    if (request.path.substr(-1) === '/') {
      request.path = request.path.substring(0, request.path.length - 1);
    }

    var path = decodeURIComponent(request.path) || '/';
    log('p... ' + path);

    // It's a dir
    if(path.substr(-1) === '/') {
      // is there an index.html in that directory?
      //    yes? serve it
      //    no? return 403
      response.send('NO DIRS FOR YOU');
    } else {
      // Find full path in www
      var wwwPath = WWW + path;
      log('www ' + wwwPath);

      response.headers['Content-Type'] = 'image/gif'; // TODO unhardcode this
      response.sendFile(wwwPath); // how to detect if the file doesn't exist & return 404?
    }
    
    //var result = `requested: ${request.path}, thank you`;
    //response.send(result);
  });

  server.start(); // TODO is this sync? do we get errors returned?

  log('server up? ' + server.running);

  window.addEventListener('beforeunload', function() {
    server.stop();
  });

  function log(message) {
    divMessages.innerHTML += message + '<br />';
  }

});
