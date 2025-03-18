"use client";
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import React, { useState, useRef } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

const api_key = process.env.GOOGLE_PLACE_MAP_API_KEY;

// const Google_address_Search = () => {
//   const [value, setValue] = useState(null);
//   const inputRef = useRef(null);

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: api_key,
//     libraries: ["places"],
//   });

//   const handleOnPlacesChanged = () => {
//     let address = inputRef.current.getPlaces();
//     console.log("address", address);
//   };

//   console.log(isLoaded);

//   return (
//     <div className="mt-[10%] text-center">
//       {isLoaded && (
//         <StandaloneSearchBox
//           onLoad={(ref) => (inputRef.current = ref)}
//           onPlacesChanged={handleOnPlacesChanged}
//         >
//           <input
//             type="text"
//             placeholder="Start Typing your Address"
//             className="border border-transparent w-[50vh] h-[50px] px-3 rounded-[3px] shadow-sm text-base outline-none mt-[30px] overflow-ellipsis"
//           />
//         </StandaloneSearchBox>
//       )}
//     </div>
//   );
// };

const Google_address_Search = ({ selectedAddress, setCoordinates }) => {
  return (
    <div className="flex items-center w-full">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />
      <GooglePlacesAutocomplete
        apiKey={api_key}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full ",
          onChange: (place) => {
            selectedAddress(place);
            geocodeByAddress(place.label)
              .then((result) => getLatLng(result[0]))
              .then(({ lat, lng }) => {
                setCoordinates({ lat, lng });
              });
          },
        }}
      />
    </div>
  );
};

export default Google_address_Search;
