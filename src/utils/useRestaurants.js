import { useState, useEffect } from "react";
import { useEffect, useState } from "react";

const useRestaurantsInfo = (resid) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (resid) {
      fetchData();
    }
  }, [resid]); // 👈 resid should be a dependency

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9655152&lng=77.7184444&restaurantId=${resid}`
      );
      const jsonData = await response.json();
      setResInfo(jsonData); 
    } catch (err) {
      console.error("Error fetching restaurant info:", err);
    }
  };

  return resInfo; 
};

export default useRestaurantsInfo;

