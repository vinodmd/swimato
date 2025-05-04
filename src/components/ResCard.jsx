import React from "react";
import { CDN_URL } from "../utils/constents";
export const value = "1222";

export default function ResCard({ data }) {
  if (!data) {
    return null; // Don't render anything if data is missing
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 w-64 h-96 flex flex-col justify-between">
      <img
        className="w-full h-40 object-cover rounded-lg mb-4"
        src={CDN_URL + data.cloudinaryImageId}
        alt="Restaurant"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-1 truncate">{data.name}</h3>
        <h4 className="text-sm text-gray-700 mb-1">
          ⭐ {data.avgRating} stars
        </h4>
        <p className="text-sm text-gray-600 mb-1 line-clamp-2">
          {data.cuisines.join(", ")}
        </p>
        <p className="text-sm font-medium text-gray-800">{data.costForTwo}</p>
      </div>
    </div>
  );
}


export const promoteResCard =(ResCard)=>{
  return (props)=>{
    return (
      <div className="relative">
        <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded shadow-md z-10">
          PROMOTED
        </span>
        <ResCard {...props} />
      </div>
    );
  }
}