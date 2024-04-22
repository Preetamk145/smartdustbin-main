var map;

document.addEventListener("DOMContentLoaded",function() {
    var mapcont =  document.getElementById("map");
    map = L.map(mapcont).setView([13.184894, 74.928932],13);
    var clickedLocationMarker = null; 
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
   
    // function MapOnClick(e){
    //     if (clickedLocationMarker) {
    //         map.removeLayer(clickedLocationMarker); 
    //         clickedLocationMarker = null; 
    //       } else {
    //         var clickedLocation = e.latlng;
    //         clickedLocationMarker = L.marker(clickedLocation).addTo(map).bindPopup("You clicked here! "+e.latlng).openPopup();
    //       }
    // }

    // map.on("click",MapOnClick)

    // L.Routing.control({
    //   waypoints: [
    //     L.latLng(51.505, -0.09), // Starting point (latitude, longitude)
    //     L.latLng(51.511181, -0.101)  // Destination point (latitude, longitude)
    //   ],
    //   routeWhileDragging: true, // Allow route to update when dragging waypoints
    //     draggableWaypoints: true
    // }).addTo(map);

    // var lat = [12.9716, 13.0041, 15.3477, 17.3796, 12.2230, 13.3404, 13.3207, 14.4127, 15.3929, 12.9095, 12.6834, 14.8356, 11.9527, 13.2907, 15.4648, 12.3600, 12.3393, 16.0897, 13.1511, 13.9611, 13.4238, 14.2717, 14.8201, 16.8288, 17.0957];
    // var lng = [77.5946, 77.6444, 74.9951, 77.3005, 76.7121, 77.5643, 75.9837, 75.7354, 75.1655, 74.8629, 76.1267, 75.7757, 75.8711, 78.0389, 76.0753, 76.9978, 76.6388, 77.5311, 77.3300, 75.5575, 76.9250, 74.4332, 74.1826, 75.8809, 77.4061];
    
    // for (var i = 0; i < lat.length; i++) {
    // var marker = L.marker([lat[i], lng[i]]).addTo(map);
    // marker.bindPopup( " " +lat[i]+" "+lng[i] ).openPopup()
    // }
    const locations = [
      { name: "Dustbin 1", latitude:13.184986, longitude:74.947867},
      { name: "Dustbin 2", latitude:13.185664, longitude:74.938824},
      { name: "Dustbin 3", latitude:13.193798, longitude:74.928438},
      { name: "Dustbin 4", latitude:13.176169, longitude:74.926974},
      
  ];
  

    locations.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude]).addTo(map);
      marker.bindPopup(location.name); // Display location name as a popup
  });
    
})



function display(n)
{
  if(n==1)
  {
    document.getElementById("map1").style.display="flex";
    document.getElementById("info").style.display="none";
    document.getElementById("profile").style.display="none"
  }
  else
  if(n==2)
  {
    document.getElementById("map1").style.display="none";
    document.getElementById("info").style.display="grid";
    document.getElementById("profile").style.display="none"
  }
  else
  if(n==3)
  {
    document.getElementById("map1").style.display="none";
    document.getElementById("info").style.display="none";
    document.getElementById("profile").style.display="flex"
  }
}

function hov( k){
  document.getElementsByTagName("hr")[k].style.display="block";}
  function nhov( k){
  document.getElementsByTagName("hr")[k].style.display="none";}


function findRoute(){
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
  if (checkboxes.length === 0) {
      alert('Please tick at least one checkbox.');
  } else {

      var startingLocation = L.latLng(13.184057, 74.933446); // Fixed starting location (San Francisco)
        var waypoints = [startingLocation];
      checkboxes.forEach(function(checkbox) {
          var latLng = checkbox.value.split(',');
          waypoints.push(L.latLng(parseFloat(latLng[0]), parseFloat(latLng[1])));
      });
      // Clear previous routes
      map.eachLayer(function (layer) {
        if (layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });

    map.createPane('routePane');
    map.getPane('routePane').style.zIndex = 450;
    
    // Generate route
    L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: true,
      lineOptions: {
          pane: 'routePane' // Render route on custom pane
      },
      container: '#minfo'
    }).addTo(map);

      console.log('Checked checkboxes:', waypoints);
  }
}


// details tab
// Function to fetch and update values from the server
    function updateValues() {
      fetch('http://localhost:3000/get-values')
          .then(response => response.json())
          .then(data => {
              document.getElementById('value1').textContent = `Wet level = ${data.value1} `;
              document.getElementById('value2').textContent =`Dry level = ${data.value2} `;

              // if (data.value1<=2 || data.value2<=2)
              //   alert(" dustbin 1 is full");
          })
              .catch(error => console.error('Error fetching values:', error));
  }

  // Initial call to update values
  updateValues();

  // Set interval to update values every 10 seconds
  setInterval(updateValues, 1000);