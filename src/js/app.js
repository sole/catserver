window.addEventListener('load', function() {

  'use strict';

  var getNetworkInfo = require('get-network-info');
  var HttpServer = require('fxos-web-server');
  var divInfo = document.getElementById('info'); 

  // network info
  getNetworkInfo().then(info => {
	  divInfo.innerHTML = `<strong>${info.ip}</strong>`;
  });

  // requests below

});
