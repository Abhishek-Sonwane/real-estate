"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";

const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchAddresss] = useState();
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, setHomeType] = useState();
  const [coordinates, setCoordinates] = useState();
  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(
        `*, listingImages(
            url, listing_id
            )`
      )
      .eq("active", true)
      .eq("type", type)
      .order("id", { ascending: false });

    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server Side Error");
    }
  };
  useEffect(() => {
    getLatestListing();
  }, []);

  const handleSearchClick = async () => {
    const searchTerm = searchedAddress?.value?.structured_formatting?.main_text;

    let query = supabase
      .from("listing")
      .select(
        `*, listingImages(
          url, listing_id
          )`
      )
      .eq("active", true)
      .eq("type", type)
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount)
      .like("address", "%" + searchTerm + "%")
      .order("id", { ascending: false });

    if (homeType) {
      query = query.eq("propertyType", homeType);
    }

    const { data, error } = await query;
    if (data) {
      setListing(data);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          searchedAddress={(v) => setSearchAddresss(v)}
          setBathCount={setBathCount}
          setBedCount={setBedCount}
          setParkingCount={setParkingCount}
          setHomeType={setHomeType}
          setCoordinates={setCoordinates}
        />
      </div>
      <div className="fixed right-10 top-30 h-full hidden md:block md:w-[350px] lg:w-[450px] xl:w-[630px]">
        <GoogleMapSection coordinates={coordinates} listing={listing} />
      </div>
    </div>
  );
};

export default ListingMapView;
