import React, { useEffect, useState } from "react";
import ResCard, { promotedResCard, promoteResCard } from "./ResCard";
import { ShimmerCard } from "./ShimmerCard";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

export function BodyComponent() {
  let [RestaurantsLst, setRestaurantsLst] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [FilteredRestaurantsLst, setFilteredRestaurantsLst] = useState([]);

  useEffect(() => {
    fetchResturents();
  }, []);

  let fetchResturents = async () => {
    const restorentData = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9655152&lng=77.7184444&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    if (restorentData.status === 200) {
      const jsonData = await restorentData.json();
      const extractedData =
        jsonData?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      console.log(extractedData);

      setRestaurantsLst(extractedData);
      setFilteredRestaurantsLst(extractedData);
    }
  };
  let AddpromoteResCard = promoteResCard(ResCard)
  let serachBasedOnText = () => {
    const temp = RestaurantsLst.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurantsLst(temp);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return <h3>Oop's something went wrong, Please check your internet.</h3>;
  }

  // console.log("am from outside the body..!");
  // conditional rendering
  if (!RestaurantsLst || RestaurantsLst.length === 0) {
    const shimmerArray = [];
    for (let index = 0; index < 20; index++) {
      shimmerArray.push(<ShimmerCard key={index} />);
    }
    return <div className="shimmer-container">{shimmerArray}</div>;
  }
  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for restaurants..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(ele) => {
            setSearchText(ele.target.value);
          }}
        />
        <button
          onClick={serachBasedOnText}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          onClick={() => {
            const temp = RestaurantsLst.filter(
              (ele) => ele.info.avgRating > 4.3
            );
            setRestaurantsLst(temp);
          }}
        >
          Top rated restaurants
        </button>
      </div>

      {/* Restaurant Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {FilteredRestaurantsLst.map((element) => (
          <Link key={element.info.id} to={"/restoreInfo/" + element.info.id}>
            {(element.info.avgRating < 4.1) ? <AddpromoteResCard data={element.info}/> : <ResCard data={element.info}/>}
          </Link>
        ))}
      </div>
    </div>
  );
}
