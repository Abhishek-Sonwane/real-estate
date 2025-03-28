import { MarkerF, OverlayView } from "@react-google-maps/api";
import React, { useState } from "react";
import MarkerListingItem from "./MarkerListingItem";

const MarkerItem = ({ item }) => {
  const [selectedListing, setSelectedListing] = useState();

  return (
    <div>
      <MarkerF
        position={item?.coordinates}
        onClick={() => {
          setSelectedListing(item);
        }}
      >
        {selectedListing && (
          <OverlayView
            position={selectedListing?.coordinates}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div>
              <MarkerListingItem
                item={selectedListing}
                closeHandler={() => setSelectedListing(null)}
              />
            </div>
          </OverlayView>
        )}
      </MarkerF>
    </div>
  );
};

export default MarkerItem;
