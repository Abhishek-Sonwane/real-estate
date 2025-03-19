import { Bath, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Google_address_Search from "./Google_address_Search";
import { Button } from "@/components/ui/button";

const Listing = ({ listing, handleSearchClick, searchedAddress }) => {
  // console.log(listing);
  const [address, setAddress] = useState();

  return (
    <div>
      <div className="p-3 flex gap-6">
        <Google_address_Search
          selectedAddress={(v) => {
            searchedAddress(v);
            setAddress(v);
          }}
          setCoordinates={(v) => console.log(v)}
        />
        <Button className={`flex gap-2`} onClick={handleSearchClick}>
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
      <div>
        {address && (
          <div className="px-3 my-5">
            <h2 className="text-xl">
              Found <span className="font-bold">{listing?.length}</span> Result
              in{" "}
              <span className="text-primary font-bold">{address?.label}</span>
            </h2>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {listing?.length > 0
          ? listing.map((item, index) => (
              <div
                key={index}
                className="p-3 hover:border hover:border-primary rounded-lg cursor-pointer"
              >
                <Image
                  src={item?.listingImages[0]?.url}
                  alt=""
                  width={800}
                  height={150}
                  className="rounded-lg object-cover h-[170px] "
                />
                <div className="flex mt-2 flex-col gap-2 justify-center">
                  <h2 className="font-bold text-xl">${item?.price}</h2>
                  <h2 className="flex gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    {item?.address}
                  </h2>
                  <div className="flex gap-2 mt-2 justify-between">
                    <h2 className="flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                      <BedDouble className="h-4 w-4" />
                      {item?.bedroom}
                    </h2>
                    <h2 className="flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                      <Bath className="h-4 w-4" />
                      {item?.bathroom}
                    </h2>
                    <h2 className="flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center">
                      <Ruler className="h-4 w-4" />
                      {item?.area}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Listing;
