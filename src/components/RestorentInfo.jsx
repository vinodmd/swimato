import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShimmerCard } from "./ShimmerCard";
import useRestaurantsInfo from "../utils/useRestaurants";
const Restaurantsinfo = () => {
  const [openDishId, setOpenDishId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenDishId(openDishId === id ? null : id);
  };
  const { resid } = useParams();

  const resInfo = useRestaurantsInfo(resid);

  if (resInfo === null) {
    return <ShimmerCard></ShimmerCard>;
  }
  console.log(resInfo);

  const { name, id, costForTwoMessage, avgRating, cuisines } =
    resInfo?.data.cards[2]?.card?.card?.info;
  const itemCards =
    resInfo?.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card?.itemCards;
  const cuisineList = cuisines?.join(", ");

  return (
    <div className="p-6 flex justify-center bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-2xl">
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-1">
          <strong>Cuisines:</strong> {cuisineList}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Cost for Two:</strong> {costForTwoMessage}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Rating:</strong> {avgRating} ⭐
        </p>

        <h4 className="text-xl font-semibold mb-3">Menu</h4>
        <div className="space-y-4">
          {itemCards?.map((item) => {
            const dish = item.card.info;
            return (
              <div
                key={dish.id}
                className="border border-gray-200 rounded-md overflow-hidden"
              >
                <div
                  className="bg-gray-100 px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => toggleAccordion(dish.id)}
                >
                  <p className="text-md font-medium">{dish.name}</p>
                </div>
                {openDishId === dish.id && (
                  <div className="px-4 py-3 bg-white text-gray-700">
                    <p className="mb-2">
                      {dish.description || "No description available."}
                    </p>
                    <p className="font-semibold">
                      ₹{(dish.price || dish.defaultPrice) / 100}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Restaurantsinfo;
