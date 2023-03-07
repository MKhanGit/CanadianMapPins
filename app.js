// PostalCode Pinner by M.Khan
// March 3, 2023

var savedColorKey = null;

var locationData = null;
var geocoder = null;
var colors = ['purple', 'orange', 'yellow', 'green']
var rateDelay = 400;
var map = null;
var myButton = null;
var downloadBtn = null;
var shareButton = null;
var copyButton = null;
var shareLink = null;

var fileInput = null;
var fileLabel = null;
var mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "weight": 2
      }
    ]
  },
];

function mapInit() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 60, lng: -96 }, // Canada as default center
    zoom: 4,
    styles: mapStyle
  });
  geocoder = new google.maps.Geocoder();
  fileInput = document.getElementById('csvFile');
  downloadBtn = document.getElementById('download-btn');
  shareButton = document.getElementById('share-btn');
  resetButton = document.getElementById('reset-map');
  fileLabel = document.getElementById('file-label');
  copyButton = document.getElementById('copy-btn');
  shareLink = document.getElementById("share-link")
  resetButton.disabled = true;
  resetButton.classList.add('btn-disable');
  resetButton.style.pointerEvents = 'none';
  copyButton.disabled = true;
  copyButton.classList.add('btn-disable');
  copyButton.style.pointerEvents = 'none';
  shareButton.disabled = true;
  shareButton.classList.add('btn-disable');
  shareButton.style.pointerEvents = 'none';
  shareLink.style.display = "none";
  const savedMapId = getUrlParameter('savedMap');
  const colorKeyId = getUrlParameter('colorKey');
  const savedMapData = decodeData(savedMapId);
  savedColorKey = decodeData(colorKeyId);
  console.log(savedMapId);
  console.log(savedMapData);
  if(savedMapData != null){
    locationData = JSON.parse(JSON.stringify(savedMapData));;
    generateShareLink(savedMapId, colorKeyId);
    resetButton.style.display = "none";
    downloadBtn.style.display = "none";
    fileLabel.style.display = "none";
    shareButton.style.display = "none";
    var app = document.getElementById('app-title');
    app.style.display = 'block';
    app.style.justifyContent = 'normal';
    var appspan = document.getElementById('app-title-spanner');
    appspan.style.marginRight = 'auto';
    generateSavedMap();
  }
  else{
    const storedDictString = localStorage.getItem("postal_pinner_locations");
    locationData = JSON.parse(storedDictString);
    if (locationData == null){
      console.log("Local store not set!");
      locationData = {};
    }
    else{
      console.log("Local store:");
      console.log(locationData);
    }
  }
  // Add listeners for input elements
  downloadBtn.addEventListener('click', downloadCSV);
  shareButton.addEventListener('click', clickGenerateShareLink);
  copyButton.addEventListener('click', copyTextToClipboard);
  fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
    // Run code using the selected file here
    loadCSV();
  });
}

function getUrlParameter(paramName) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramName);
}

async function delayedValueSplit(lines) {
  for (let i = 1; i < lines.length; i++)
  {
      const valuesArray = lines[i].split(',');
      // Trim whitespace from each item in the array
      const trimmedArray = valuesArray.map((value) => value.trim());
      console.log(trimmedArray); // Output: Array of trimmed values
      if (savedColorKey == null) savedColorKey = {};
      for (let i = 0; i < trimmedArray.length; i++) {
        if (trimmedArray[i] == "") continue;
        savedColorKey[trimmedArray[i]] = colors[i];
        if (trimmedArray[i] in locationData){
          console.log("Writing from saved location data");
          var marker = new google.maps.Marker({
            position: locationData[trimmedArray[i]],
            map: map,
            title: trimmedArray[i],
            icon: { url: `http://maps.google.com/mapfiles/ms/icons/${colors[i]}-dot.png` }
          });
        }
        else{
          await sleep(rateDelay);
          console.log("Fetching unknown location data from geocoder API");
          getLatLong(trimmedArray[i], colors[i]);
        }
      }
  }
}

function getLatLong(postalCode, color) {
  if (postalCode == "") return;
  geocoder.geocode({ 'address': postalCode + ', Canada' }, (results, status) => {
    if (status === 'OK') {
      const location = results[0].geometry.location;
      const latitude = location.lat();
      const longitude = location.lng();
      var longlat = { lat: latitude, lng: longitude };
      locationData[postalCode] = longlat;
      localStorage.setItem("postal_pinner_locations", JSON.stringify(locationData));
      console.log(`[${Date.now()}] '${postalCode}' - Latitude: ${latitude}, Longitude: ${longitude}`);

      var marker = new google.maps.Marker({
        position: longlat,
        map: map,
        title: postalCode,
        icon: { url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png` }
      });

    } else {
      console.log(`Geocode was not successful for '${postalCode}' for the following reason: ${status}`);
    }
  });
}

function generateShareLink(linkid, colorid){
  // var shareLink = document.getElementById("share-link")
  var linkText = location.pathname + `?savedMap=${linkid}&colorKey=${colorid}`;
  shareLink.innerText = "Saved Map Link";
  shareLink.setAttribute("href", linkText);
  copyButton.disabled = false;
  copyButton.classList.remove('btn-disable');
  copyButton.style.pointerEvents = 'auto';
  shareLink.style.display = "inline-block";
}

function clickGenerateShareLink(){
  if(locationData != null){
    generateShareLink(encodeData(locationData), encodeData(savedColorKey));
  }
}

function copyTextToClipboard(){
  var textToCopy = document.getElementById("share-link").href;
  
  navigator.clipboard.writeText(textToCopy)
  .then(() => {
    console.log(`Link copied to clipboard: ${textToCopy}`);
    document.getElementById('copy-msg').innerText = 'Copied to Clipboard!'
  })
  .catch((error) => {
    console.error("Error copying text to clipboard:", error);
  });
}

function generateSavedMap(){
  for (var key in locationData) {
    if (key == "") continue;
    var color = null;
    if (savedColorKey != null && key in savedColorKey){
      color = savedColorKey[key];
    }
    else{
      color = 'red'; 
    }
      var marker = new google.maps.Marker({
        position: locationData[key],
        map: map,
        title: key,
        icon: { url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png` }
      });
    }
}

// Function to encode a key-value pairs object into a base64 encoded string
function encodeData(data) {
  const json = JSON.stringify(data); // Convert the object to a JSON string
  const encoded = btoa(json); // Encode the JSON string in base64
  return encoded;
}

// Function to decode a base64 encoded string back into a key-value pairs object
function decodeData(encodedData) {
  try {
    const decoded = atob(encodedData); // Decode the base64 string
    const data = JSON.parse(decoded); // Parse the decoded JSON string into an object
    return data;
  } catch (error) {
    console.log("Unable to Decode saved map");
    return null
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function downloadCSV() {
  const url = './postal_code_template.csv'; 
  const filename = 'postalcode_pins_template.csv';
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
}

function loadCSV() {
  //const input = document.getElementById("csvFile");
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const contents = reader.result;
    const lines = contents.split("\n");
    // Process the CSV data here
    console.log(lines);
    delayedValueSplit(lines);
    shareButton.disabled = false;
    shareButton.classList.remove('btn-disable');
    shareButton.style.pointerEvents = 'auto';
  };
  reader.readAsText(file);
  resetButton.disabled = false;
  resetButton.classList.remove('btn-disable');
  resetButton.style.pointerEvents = 'auto';
  fileInput.disabled = true;
  fileLabel.classList.add('btn-disable');
  fileLabel.style.pointerEvents = 'none';
}

