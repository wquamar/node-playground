console.log('Proxy js');

var http = require('http'),
    httpProxy = require('http-proxy');


//This sample just redirects to www.google.com
//##################################################################


// var proxy = httpProxy.createProxyServer({});
// http.createServer(function(req, res) {
//     proxy.web(req, res, { target: 'http://www.google.com' });
// }).listen(3000);

//##################################################################


http.createServer(onRequest).listen(3000);

function onRequest(client_req, client_res) {
  console.log('serve: ' + client_req.url);

  var options = {
    hostname: 'www.omegawatches.com',
    port: 80,
    path: client_req.url,
    method: 'GET'
  };

  var proxy = http.request(options, function (res) {
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}