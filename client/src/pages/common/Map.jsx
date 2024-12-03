import React, { useEffect, useRef } from 'react';
import mapStyles from './mapStyles';

const Map = ({ location, radius, properties }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapRef.current && location.latitude && location.longitude) {
      // Initialize the map
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: location.latitude, lng: location.longitude },
        zoom: 12,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
      });

      // Add center marker
      new window.google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: 'red',
          fillOpacity: 1,
          strokeWeight: 1,
        },
        title: 'Search Center',
      });

      // Clear previous markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Add property markers
      properties.forEach((property) => {
        if (property.location.latitude && property.location.longitude) {
          const marker = new window.google.maps.Marker({
            position: { lat: property.location.latitude, lng: property.location.longitude },
            map: map,
            title: property.title,
          });

          // Add hover event listener to show InfoWindow
          const distance = property.distance
            ? `${property.distance.toFixed(2)} km`
            : 'Distance not available';
            const infoWindow = new window.google.maps.InfoWindow({
                content: `
                  <div style="
                    font-size: 24px;
                    font-weight: bold;
                    max-width: 350px;
                    max-height: 200px;
                    line-height: 1.8;
                    padding: 15px;
                   
                    
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                    overflow: auto;
                    
                    white-space: normal;
                    
                  ">
                    <div style="margin-bottom: 8px; color: #000; font-weight: bold;">${property.title}</div>
                    <div style="font-size: 20px; color: #333;">
                      Distance: <span style="font-weight: normal;">${distance}</span>
                    </div>
                  </div>
                `,
              });
              

          marker.addListener('mouseover', () => infoWindow.open(map, marker));
          marker.addListener('mouseout', () => infoWindow.close());

          markersRef.current.push(marker);

          // Remove scrollbars and scroll arrows
          google.maps.event.addListener(infoWindow, 'domready', () => {
            const infoWindowElements = document.getElementsByClassName('gm-style-iw');
            for (let i = 0; i < infoWindowElements.length; i++) {
              const element = infoWindowElements[i];

              // Apply styles to prevent scrolling or scroll arrows
              element.style.overflow = 'hidden';
              element.style.whiteSpace = 'normal'; // Allow wrapping of text
              element.style.maxWidth = '350px';
              element.style.maxHeight = '200px';

              // Forcefully hide all scrollbars and arrows
              element.style.scrollbarWidth = 'none'; // For modern browsers
              element.style.msOverflowStyle = 'none'; // For IE and Edge
              element.style.overflowX = 'hidden';
              element.style.overflowY = 'hidden';

              // Ensure no close button
              const closeButton = element.parentElement.querySelector('button[title="Close"]');
              if (closeButton) {
                closeButton.style.display = 'none';
              }
            }
          });
        }
      });

      // Draw radius circle
      new window.google.maps.Circle({
        map: map,
        radius: radius * 1000, // Convert radius to meters
        center: { lat: location.latitude, lng: location.longitude },
        fillColor: 'rgba(34, 139, 34, 0.3)', // Semi-transparent ForestGreen
        strokeColor: 'rgba(34, 139, 34, 0.8)', // Slightly darker ForestGreen
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
    }
  }, [location, radius, properties]);

  return <div ref={mapRef} style={{ width: '100%', height: '800px', borderRadius: '10px' }}></div>;
};

export default Map;
