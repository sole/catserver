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
    var wwwPath = WWW + path;
    var fileToSend = wwwPath;
    
    log('p... ' + path);

    // It's a dir
    if(path.substr(-1) === '/') {
      // TODO: actually implement this logic-need a way to catch fails in response (or do it without sendFile)
      // is there an index.html in that directory?
      //    yes? serve it
      //    no? return 403

      fileToSend = wwwPath + 'index.html';
      
    } 
    
    // TODO how to detect if the file doesn't exist & return 404?

    var t0;
    log('will send ' + fileToSend);
    response.addEventListener('complete', function(e) {
      var now = Date.now();
      var elapsedTime = ((now - t0) * 0.001).toFixed(2);
      log(fileToSend + ': response complete ' + elapsedTime + ' seconds');
    });

    response.headers['Content-Type'] = getContentType(fileToSend);
    t0 = Date.now();
    response.sendFile(fileToSend); // how to detect if the file doesn't exist & return 404?

    
  });

  server.start(); // TODO is this sync? do we get errors returned?

  log('server up? ' + server.running);

  window.addEventListener('beforeunload', function() {
    console.log('STOPPING SERVER');
    server.stop();
  });

  function log(message) {
    divMessages.innerHTML += message + '<br />';
    console.log(message);
  }

  function getContentType(filePath) {

    var extension = getExtension(filePath);
    var extToType = {
      'gif': 'image/gif',
      'jpg': 'image/jpg',
      'css': 'text/stylesheet',
      'js': 'text/javascript',
      'html': 'text/html'
    };

    log(filePath + ' -- ' + extension);

    if(extension.length > 0) {
      var type = extToType[extension];
      log('Content type of ' + filePath + ' is ' + type);
      if(type !== undefined) {
        return type;
      }
    }

    // falling back to text/html
    return 'text/html';

  }

  function getExtension(filePath) {
    var parts = filePath.split('.');
    if(parts.length < 2) {
      return "";
    } else {
      return parts.pop();
    }
  }

});
