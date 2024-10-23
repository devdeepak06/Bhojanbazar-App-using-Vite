import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import PropTypes from "prop-types";

const RestaurantCard = (props) => {
  const { resData = {} } = props;
  const {
    id,
    cloudinaryImageId,
    name,
    cuisines = [],
    avgRating = "N/A",
    costForTwo = "N/A",
    deliveryTime = "N/A",
  } = resData?.info || {};

  return (
    <div
      className="w-48 p-1 m-1 cursor-pointer"
      id={"restaurantCard-" + id}
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <img
        className="w-full h-36"
        src={CDN_URL + cloudinaryImageId}
        alt={`Image of ${name}`}
      />
      <Link to={`/restaurants/${id}`}>
        <h3 className="m-0">{name}</h3>
        <h4 className="m-0">{cuisines.join(", ")}</h4>
      </Link>
      <p className="flex justify-between m-0">
        <span>{avgRating}</span>
        <span>{costForTwo}</span>
        <span>{deliveryTime}</span>
      </p>
    </div>
  );
};

RestaurantCard.propTypes = {
  resData: PropTypes.shape({
    info: PropTypes.shape({
      id: PropTypes.string.isRequired,
      cloudinaryImageId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cuisines: PropTypes.arrayOf(PropTypes.string),
      avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      costForTwo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      deliveryTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
};

export default RestaurantCard;
