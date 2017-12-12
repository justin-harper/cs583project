var https = require('https');
var fs = require('fs');
var util = require('util');
var url = require('url');


var options =
{
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// var a = https.createServer(options, function(req, res)
// {

//   if(req.method === "GET")
//   {
//     res.writeHead(200, {"Content-Type" : "text/html", "Access-Control-Allow-Origin": "*"});
//     res.write(fs.readFileSync('hw8.html'));
//     res.writeHead(200, {"Content-Type" : "text/javascript", "Access-Control-Allow-Origin": "*"});
//     res.end(fs.readFileSync('hw8.js'));
//   }
//   else if(req.method === "POST")
//   {
//     res.writeHead(200);
//     res.on('data', function(chunk)
//     {
//       //res.writeHead(200, {"Content-Type" : "text/html", "Access-Control-Allow-Origin": "*"});
//       console.log("responce: ", chunk);
//       res.end("");
//     });
//     console.log("poop");
//   }
// }).listen(7070);

//console.log("listening on https:localhost:7070");

// var p = https.createServer(function(req, res)
// {

// })

https.createServer(options, function(request, responce)
{
  var path = url.parse(request.url).pathname
  console.log("Request for " + path);


  if(request.method === "GET")
  {
    responce.writeHead(200, {"Access-Control-Allow-Origin": "*"});
    if(path === '/')
    {
      html = fs.readFileSync("hw8.html");
      responce.write(html);
    }
    else if(path === "/hw8.js")
    {
      script = fs.readFileSync("hw8.js");
      responce.write(script);
    }
    else if(path === "/dataset1")
    {
      j = fs.readFileSync("dataset1.json");
      responce.write(j);
    }
    else if(path ==="/dataset2")
    {
      j = fs.readFileSync("dataset2.json");
      responce.write(j);
    }

    responce.end();
  }
  else if(request.method === "POST")
  {
    var body = "";
    request.on('data', function(chunk)
    {
      body += chunk;
    });
    request.on('end', function()
    {
      var jsonOb = JSON.parse(body);
      var fileName = 'data' + new Date().toString() + ".json";
      fs.writeFileSync(fileName, body);
    });
    responce.end("YEP");
  }

}).listen(7070);

console.log("Server listening @7070");


