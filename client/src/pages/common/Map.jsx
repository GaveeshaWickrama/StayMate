import React, { useEffect, useRef } from 'react';

const Map = ({ location, radius, properties }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#052366"
            },
            {
                "saturation": "-70"
            },
            {
                "lightness": "85"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "lightness": "-53"
            },
            {
                "weight": "1.00"
            },
            {
                "gamma": "0.98"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "-18"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#57677a"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

useEffect(() => {
    if (mapRef.current && location.latitude && location.longitude) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: location.latitude, lng: location.longitude },
        zoom: 12,
        styles: mapStyles,
        disableDefaultUI: true,  // Disable default UI
        zoomControl: true,       // Enable zoom control
      });

      // Clear previous markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add new markers
      properties.forEach(property => {
        if (property.location.latitude && property.location.longitude) {
          const marker = new window.google.maps.Marker({
            position: { lat: property.location.latitude, lng: property.location.longitude },
            map: map,
            title: property.title,
          });
          markersRef.current.push(marker);
        }
      });

      // Draw radius circle
      new window.google.maps.Circle({
        map: map,
        radius: radius * 1000, // convert radius to meters
        center: { lat: location.latitude, lng: location.longitude },
        fillColor: 'rgba(34, 139, 34, 0.5)', // semi-transparent ForestGreen
        strokeColor: 'rgba(34, 139, 34, 0.8)', // slightly darker ForestGreen
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
    }
  }, [location, radius, properties]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default Map;
