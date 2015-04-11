window.addEventListener('load', function() {

  'use strict';

  var getNetworkInfo = require('get-network-info');
  var HTTPServer = require('fxos-web-server');
  var divInfo = document.getElementById('info');
  var divMessages = document.getElementById('messages');

  // network info
  var info = getNetworkInfo();
  if(info) {
    divInfo.innerHTML = `<strong>${info.ip}</strong>`;
  }

  // setting up server
  var server = new HTTPServer(80);

  server.addEventListener('request', function(evt) {
    var request = evt.request;
    var response = evt.response;

    var result = `requested: ${request.path}, thank you`;

    log('requested? ' + request.path);

    response.send(result);
  });

  server.start(); // TODO is this sync? do we get errors returned?

  log('server up');

  window.addEventListener('beforeunload', function() {
    server.stop();
  });

  function log(message) {
    divMessages.innerHTML += message + '<br />';
  }

});
