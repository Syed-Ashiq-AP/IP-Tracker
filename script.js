

function get_ip(){
    let location =''
    let ip = document.getElementById("ip").value;
    let q = 'ipAddress='+ip;
    if(ip.includes('www.')){
        q = 'domain='+ip;
    }
    fetch('https://geo.ipify.org/api/v2/country?apiKey=at_Og3KEYEi9Dyo6Ix3rdaVz6rUr38S3&'+q)
    .then(response => response.json())
    .then(data => {
        location = data.location.country+","+data.location.region;
        document.getElementById("ip-address").innerHTML = ip;
        document.getElementById("location").innerHTML = data.location.country+", "+data.location.region;
        document.getElementById("timezone").innerHTML = data.location.timezone;
        document.getElementById("isp").innerHTML = data.isp;
    fetch('https://api.opencagedata.com/geocode/v1/json?q='+location+'&key=9c292ce6c84945a78a8f0d4470d43020')
    .then(response => response.json())
    .then(data => {let lat = data.results[0].geometry.lat,long=data.results[0].geometry.lng; map.setView([lat,long], 16);})
    });
}

var map = L.map('map',{trackResize:false,doubleClickZoom:false,boxZoom:false,zoomControl:false,dragging:false,scrollWheelZoom:false});
L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=480b51b9-368d-47d7-b272-20a3b41da245', {
    maxZoom: 20
}).addTo(map);
let tf ={
    "ip": "192.212.174.101",
    "location": {
        "country": "US",
        "region": "California",
        "timezone": "-08:00"
    },
    "as": {
        "asn": 7127,
        "name": "SCE",
        "route": "192.212.0.0/15",
        "domain": "",
        "type": ""
    },
    "isp": "Southern California Edison"
}

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
    map.setView([position.coords.latitude ,position.coords.longitude] , 16);
}
