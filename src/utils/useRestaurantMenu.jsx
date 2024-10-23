import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchResMenu();
  }, []);

  const fetchResMenu = async () => {
    try {
      const response = await fetch(MENU_API + resId);
      const data = await response.json();
      setResInfo(data?.data);
    } catch (error) {
      console.error("Failed to fetch restaurant menu:", error);
    } finally {
      setLoading(false);
    }
  };
  return resInfo;
};

export default useRestaurantMenu;
