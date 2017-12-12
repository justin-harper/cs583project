
var store = [];
var timeout = 0;
var markers = [];
var coords = [];
var map;
var datacolection = false;
function thisOne()
{
  //pullman: Lat: 46.739106299999996, Lng: -117.17546879999999
  var pullman = { lat: 46.734, lng: -117.16 };
  map = new google.maps.Map(document.getElementById('map'),
  {
      zoom: 14,
      center: pullman
  });
}


function getLocation()
{
  var output = document.getElementById('output');
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(showPosition,errorCallback,{maximumAge:1, timeout:2000, enableHighAccuracy: true})
  }
  else
  {
    output.innerHTML = "GeoLocation is not supported on this browser";
  }

}
function doTimeout()
{
  if(timeout < 1000)
  {
    timeout++;
    setTimeout(doTimeout, 1000);
    getLocation();
  }
}

function showPosition(position)
{
  store.push(position.coords);

  //var output = document.getElementById('output');
  //output.innerHTML = ShowStore();
  var x = {lat: position.coords.latitude, lng: position.coords.longitude};
  coords.push(x);
  // var map = new google.maps.Map(document.getElementById('map'),
  // {
  //   zoom: 20,
  //   center: x
  // });
  // var j = document.getElementById('json');
  //markers.push(new google.maps.Marker({position: x, map: map}));
  output.innerHTML = JSON.stringify(coords);


}
function errorCallback(error)
{
  var output = document.getElementById('output');
  output.innerHTML = "ERROR getting location";
  console.log(error);
}

function ShowStore()
{
  var x = "[ "
  for(var i = 0; i < store.length; i++)
  {
    x += "<br>" +  "Lat: " + store[i].latitude + ", Lng: " + store[i].longitude;
  }
  x += "<br>]";

  return x;
}

function postToServer()
{
  var req = new XMLHttpRequest();

  //req.open("POST", "https://localhost:7070");
  req.open("GET", "https://martell.eecs.wsu.edu:7070");
  console.log("1");
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  console.log("2");
  var j = JSON.stringify(coords);
  req.send(j);
  console.log("3");
}

function collectData()
{
  if(datacollect == false)
  {
    var controlls = document.getElementById('controlls');
    var button = document.createElement("button");
    button.innerHTML = "Post Data";
    button.addEventListener("click", postToServer);
    controlls.appendChild(button);

    var p = document.createElement("p");
    controlls.appendChild(p);
    doTimeout();
  }
  else
  {
    timeout = 200000;
  }
}

function getDataSet1()
{
  var req = new XMLHttpRequest();
  //req.open("GET", "https://localhost:7070/dataset1", true);
  req.open("GET", "https://martell.eecs.wsu.edu:7070/dataset1", true);
  req.send();

  req.onreadystatechange = function(e)
  {
    if(req.readyState === 4 && req.status === 200)
    {
      var r = JSON.parse(req.response);
      displayPath(r);
    }
  };

}

function getDataSet2()
{
  var req = new XMLHttpRequest();
  //req.open("GET", "https://localhost:7070/dataset2", true);
  req.open("GET", "https://martell.eecs.wsu.edu:7070/dataset2", true);
  req.send();

  req.onreadystatechange = function(e)
  {
    if(req.readyState === 4 && req.status === 200)
    {
      var r = JSON.parse(req.response);
      displayPath(r);
    }
  };
}

function displayPath(data)
{
  //markers.push(new google.maps.Marker({position: x, map: map}));

  // for(var coords of data)
  // {
  //   markers.push(new google.maps.Marker({position: coords, map: map}));
  // }

  var path = new google.maps.Polyline(
  {
    path: data,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  path.setMap(map);

}


