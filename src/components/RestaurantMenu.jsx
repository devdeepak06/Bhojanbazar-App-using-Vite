import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { Shimmer } from "../utils/Shimmer";
import { MENU_API } from "../utils/constants";

import PropTypes from "prop-types";

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
  const [resInfo, setResInfo] = useState();
  const [activeRecommendationIndex, setActiveRecommendationIndex] =
    useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    let isMounted = true;
    const fetchResMenu = async () => {
      try {
        const response = await fetch(`${MENU_API}${resId}`);
        const data = await response.json();
        if (isMounted) setResInfo(data?.data);
      } catch (error) {
        console.error("Failed to fetch restaurant menu:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchResMenu();
    return () => {
      isMounted = false;
    };
  }, [resId]);

  if (loading) {
    return <Shimmer />;
  }
  const { cards = [] } = resInfo || {};

  const {
    name: resName,
    avgRatingString,
    totalRatingsString,
    cuisines,
    sla: { slaString } = {},
  } = cards[2]?.card?.card?.info || {};

  const { title: resCardTitle, carousel: resInfoCards = [] } =
    cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || {};

  const resInCards = cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  const indexesToSkip = [0];

  return (
    <div>
      <div className="p-3 w-1/2 m-auto">
        <h3 className="font-bold text-2xl my-5 mx-4">{resName}</h3>
        <div className="bg-custom-gradient p-0 px-4 pb-4 rounded-b-[36px]">
          <div className="rounded-2xl border border-solid border-slate-50 bg-white shadow-custom">
            <div className="m-4">
              <p>
                {avgRatingString} ({totalRatingsString})
              </p>
              <p className="underline text-orange-600 font-bold text-sm">
                {cuisines.join(", ")}
              </p>
              <p className="lowercase">{slaString}</p>
            </div>
          </div>
        </div>
        <h4 className="font-bold text-xl my-10">{resCardTitle}</h4>

        {resInfoCards.length > 0 ? (
          <Slider {...settings}>
            {resInfoCards.map(
              ({ dish: { info: { id, imageId, name, price } = {} } = {} }) => (
                <div key={id} className="card-container w-1/2 relative">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                    alt={name}
                  />
                  <div className="absolute bottom-2 right-0 left-0">
                    <div className="Card_meta flex justify-between items-center">
                      <div className="Card_price">{price / 100} ₹</div>
                      <div className="Card_addButton relative -bottom-2 text-center text-green-600 bg-white rounded-lg border border-solid w-20 font-bold p-1">
                        Add
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

        {resInCards
          .filter((_, index) => !indexesToSkip.includes(index))
          .map(({ card: { card: { title, itemCards = [] } = {} } }, index) => (
            <div className="border-b border-solid" key={index}>
              <div
                className="flex justify-between items-center my-3 cursor-pointer"
                onClick={() =>
                  setActiveRecommendationIndex(
                    activeRecommendationIndex === index ? null : index
                  )
                }
              >
                <h4 className="font-bold text-xl leading-10">
                  {title} ({itemCards.length})
                </h4>
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
                    <div key={id} className="recommended-item">
                      <div className="menuItem py-3 border-b border-solid flex justify-center items-center">
                        <div className="menu-item-info w-3/4">
                          <div className="menuItemTitle text-gray-800 font-bold">
                            {name}
                          </div>

                          <>
                            <div className="offer flex gap-1 items-center font-bold">
                              <span className="itemPrice">₹{price / 100}</span>
                              <span className="text-xs">{title}</span>
                              <span className="text-xs text-gray-800">
                                {subTitle}
                              </span>
                            </div>
                            <div className="ratings font-bold">
                              <span className="avgRating text-green-800">
                                {rating}
                              </span>
                              <span className="totalRating text-slate-700">
                                ({ratingCountV2})
                              </span>
                            </div>
                          </>
                          <p className="menuItemDescription text-base text-gray-700 leading-tight w-11/12">
                            {description}
                          </p>
                        </div>
                        <div className="w-1/4">
                          <img
                            loading="lazy"
                            height="144"
                            width="256"
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                            alt={name}
                          />
                          <div className="flex flex-col items-center justify-center">
                            <div className="atcButton -bottom-2 text-center text-green-600 bg-white rounded-lg border border-solid w-1/2  font-bold p-1">
                              Add
                            </div>
                            <span className="customizeText text-xs">
                              Customisable
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
