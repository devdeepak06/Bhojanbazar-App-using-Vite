import { useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { Shimmer } from "../utils/Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import PropTypes from "prop-types";
import { CDN_URL, MENU_IMG_URL } from "../utils/constants";
import RecommendedItem from "./RecommendedItem";
const SampleArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: "block", background: "grey" }}
    onClick={onClick}
  />
);
SampleArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { resInfo, loading, error } = useRestaurantMenu(resId);
  const [activeRecommendationIndex, setActiveRecommendationIndex] =
    useState(null);
  if (error) return <p>{error}</p>;

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleArrow direction="next" />,
    prevArrow: <SampleArrow direction="prev" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  if (loading) {
    return <Shimmer />;
  }
  const { cards = [] } = resInfo || {};
  const {
    name: resName,
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    sla: { slaString } = {},
  } = cards[2]?.card?.card?.info || {};

  const { title: resCardTitle, carousel: resInfoCards = [] } =
    cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || {};

  const resInCards = cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  console.log(cards);

  const indexesToSkip = [0, 1];

  return (
    <div>
      <div className="p-3 w-3/5 m-auto">
        {/* Restaurant Heading */}
        <h3 className="font-bold text-2xl my-5 mx-4">{resName}</h3>
        <div className="bg-custom-gradient font-bold p-0 px-4 pb-4 rounded-b-[36px]">
          <div className="rounded-2xl border border-solid border-gray-400 bg-white shadow-custom">
            <div className="m-4">
              <p>
                {avgRatingString} ({totalRatingsString})
                <span className="mx-2 text-gray-500">•</span>
                <span>{costForTwoMessage}</span>
              </p>
              <p className="underline text-orange-600 font-bold text-sm">
                {cuisines.join(", ")}
              </p>
              <p className="lowercase">{slaString}</p>
            </div>
          </div>
        </div>
        {/* Top pics heading */}
        <h4 className="font-bold text-xl my-10">{resCardTitle}</h4>
        {/* Top pics slider image banners */}
        {resInfoCards.length > 0 ? (
          <Slider {...settings}>
            {resInfoCards.map(
              ({
                creativeId,
                dish: {
                  info: { id, name, imageId, price, defaultPrice } = {},
                } = {},
              }) => (
                <div key={id}>
                  <div className="card-container mx-4 relative">
                    <img
                      className="m-auto"
                      loading="lazy"
                      height="144"
                      width="256"
                      src={`${CDN_URL}${creativeId ? creativeId : imageId}?${
                        creativeId ? creativeId : imageId
                      }`}
                      alt={name}
                    />
                    <div className="absolute bottom-2 right-0 left-0">
                      <div className="Card_meta flex justify-around items-center">
                        <div className="Card_price text-white">
                          {price
                            ? `₹${(price / 100).toFixed(2)}`
                            : `₹${(defaultPrice / 100).toFixed(2)}`}
                        </div>
                        <div className="Card_addButton relative bottom-0 text-center text-green-600 bg-white rounded-lg border border-solid w-20 font-bold p-1">
                          Add
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>
        ) : (
          <p>No offers found</p>
        )}
        {/* Recommended section start from here */}
        {resInCards
          .filter((_, index) => !indexesToSkip.includes(index))
          .map(({ card: { card: { title, itemCards = [] } = {} } }, index) => {
            // Check if title is present
            if (!title) return null; // Skip rendering if title is not present

            return (
              <div className="border-b border-solid" id={title} key={index}>
                <div
                  className="flex justify-between items-center my-3 cursor-pointer"
                  onClick={() =>
                    setActiveRecommendationIndex(
                      activeRecommendationIndex === index ? null : index
                    )
                  }
                >
                  <h4 className="font-bold text-xl leading-10">
                    {title}{" "}
                    {itemCards.length > 0 ? `(${itemCards.length})` : " "}
                  </h4>
                  {itemCards.length > 0 ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px"
                        viewBox="0 -960 960 960"
                        width="40px"
                        fill="darkgreen"
                        className={
                          activeRecommendationIndex === index
                            ? "rotate-90"
                            : "-rotate-90"
                        }
                      >
                        <path d="m414.67-480.67 170 170q9.66 9.67 9.33 23.34-.33 13.66-10 23.33-9.67 9.67-23.67 9.67-14 0-23.66-9.67L343.33-457.33q-5.33-5.34-7.5-11-2.16-5.67-2.16-12.34 0-6.66 2.16-12.33 2.17-5.67 7.5-11l194-194q9.67-9.67 23.67-9.67 14 0 23.67 9.67 9.66 9.67 9.66 23.67 0 14-9.66 23.66l-170 170Z" />
                      </svg>
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                {activeRecommendationIndex === index &&
                  itemCards.map(
                    ({
                      card: {
                        info: {
                          id,
                          name,
                          price,
                          description,
                          imageId,
                          offerTags: { title, subTitle } = {},
                          ratings: {
                            aggregatedRating: { rating, ratingCountV2 } = {},
                          } = {},
                        } = {},
                      },
                    }) => (
                      <RecommendedItem
                        key={id}
                        id={id}
                        name={name}
                        price={price}
                        description={description}
                        imageId={imageId}
                        title={title}
                        subTitle={subTitle}
                        rating={rating}
                        ratingCountV2={ratingCountV2}
                        MENU_IMG_URL={MENU_IMG_URL}
                      />
                    )
                  )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
