

    var map;
    var Markers = {};
    var infowindow;
    var locations = [
      {exp:channel:entries channel="hotels" orderby="opening_date_timeline" status="open|Full Plan" limit="999" sort="asc" dynamic="no"}
      {hotels_coordinates}
    	[
    		'{title}',
    		'<strong>{title}</strong><p><a href="{url_title_path='hotels'}" target="_blank">Hotel\'s page</a></p>',
    		{hotels_coordinates:latitude},
    		{hotels_coordinates:longitude},
    		{entry_id}
    	],
      {/hotels_coordinates}
      {/exp:channel:entries}
    ];
    var origin = new google.maps.LatLng(locations[0][2], locations[0][3]);

    function initialize() {
      var mapOptions = {
        zoom: 3,
        center: origin
      };

      map = new google.maps.Map(document.getElementById('all-hotels-map-canvas'), mapOptions);

    	infowindow = new google.maps.InfoWindow();

        for(i=0; i<locations.length; i++) {
        	var position = new google.maps.LatLng(locations[i][2], locations[i][3]);
    		var marker = new google.maps.Marker({
    			position: position,
    			map: map,
    		});
    		google.maps.event.addListener(marker, 'click', (function(marker, i) {
    			return function() {
    				infowindow.setContent(locations[i][1]);
    				infowindow.setOptions({maxWidth: 200});
    				infowindow.open(map, marker);
    			}
    		}) (marker, i));
    		Markers[locations[i][4]] = marker;
    	}

    	locate(0);

    }

    function locate(marker_id) {
    	var myMarker = Markers[marker_id];
    	var markerPosition = myMarker.getPosition();
    	map.setCenter(markerPosition);
    	google.maps.event.trigger(myMarker, 'click');
    }

    window.onload = function() {
      initialize();
    }
