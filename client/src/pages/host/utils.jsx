// utils.js
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["places"]
});

export const getReverseGeocode = async ({ lat, lng }) => {
  await loader.load();

  const geocoder = new window.google.maps.Geocoder();
  const latlng = { lat, lng };

  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          resolve(results);
        } else {
          reject("No results found");
        }
      } else {
        reject("Geocoder failed due to: " + status);
      }
    });
  });
};
