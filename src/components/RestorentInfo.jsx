import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShimmerCard } from "./ShimmerCard";
import useRestaurantsInfo from "../utils/useRestaurants";
const Restaurantsinfo = () => {
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);

  const [openDishId, setOpenDishId] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
    setOpenDishId(null); // Reset open dish when category changes
  };

  const toggleDish = (id) => {
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
  let tempItemCards =
    resInfo?.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (ele) =>
        ele.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );
  console.log(tempItemCards);

  const cuisineList = cuisines?.join(", ");

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {tempItemCards.map((category, index) => {
          const catData = category.card.card;
  
          return (
            <div
              key={catData.categoryId}
              className="mb-5 border border-gray-300 shadow-md rounded-xl overflow-hidden bg-white"
            >
              {/* Category Header */}
              <div
                className="bg-indigo-100 px-5 py-4 cursor-pointer hover:bg-indigo-200 transition-colors"
                onClick={() => toggleCategory(index)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-indigo-800">
                    {catData.title}
                  </h2>
                  <span className="text-indigo-600 text-lg">
                    {openCategoryIndex === index ? "▲" : "▼"}
                  </span>
                </div>
              </div>
  
              {/* Category Content */}
              {openCategoryIndex === index && (
                <div className="bg-white px-5 py-4 space-y-4">
                  {catData.categories.map((subCat) =>
                    subCat.itemCards?.map((item) => {
                      const dish = item.card.info;
                      return (
                        <div
                          key={dish.id}
                          className="border border-gray-200 rounded-lg shadow-sm"
                        >
                          {/* Dish Header */}
                          <div
                            className="bg-gray-100 px-4 py-2 cursor-pointer hover:bg-gray-200 transition"
                            onClick={() => toggleDish(dish.id)}
                          >
                            <div className="flex justify-between items-center">
                              <p className="text-base font-medium text-gray-800">
                                🍽️ {dish.name}
                              </p>
                              <span className="text-gray-500 text-sm">
                                {openDishId === dish.id ? "▲" : "▼"}
                              </span>
                            </div>
                          </div>
  
                          {/* Dish Content */}
                          {openDishId === dish.id && (
                            <div className="px-4 py-3 bg-white text-gray-700">
                              <p className="mb-2 italic text-sm">
                                {dish.description || "No description available."}
                              </p>
                              <p className="font-semibold text-green-700">
                                ₹{(dish.price || dish.defaultPrice) / 100}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
  
};
export default Restaurantsinfo;
