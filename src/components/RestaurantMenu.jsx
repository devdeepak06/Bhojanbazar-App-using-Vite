import { useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { Shimmer } from "../utils/Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { CDN_URL, MENU_IMG_URL } from "../utils/constants";
import RecommendedItem from "./RecommendedItem";
import ResMenuHeading from "./ResMenuHeading";
import SampleArrow from "./SampleArrow";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { resInfo, loading, error } = useRestaurantMenu(resId);
  const [activeIndex, setActiveIndex] = useState(0);
  const toggleActiveIndex = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

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
  console.log(resInCards);
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
                <div key={`top-pics-${id}`}>
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
          <p>No offers</p>
        )}
        {/* Recommended section start from here */}
        {resInCards
          .filter((_, index) => !indexesToSkip.includes(index))
          .map(
            (
              {
                card: { card: { title, itemCards = [], categories = [] } = {} },
              },
              index
            ) => {
              if (!title) return null;

              return (
                <div
                  className="border-b border-solid"
                  id={title}
                  key={`section-${index}-${title}`}
                >
                  {itemCards.length > 0 ? (
                    <>
                      <ResMenuHeading
                        index={index}
                        title={title}
                        itemCardsLength={itemCards.length}
                        isActive={activeIndex === index}
                        setActiveIndexes={toggleActiveIndex}
                      />
                      {activeIndex === index &&
                        itemCards.map(
                          ({
                            card: {
                              info: {
                                id,
                                name,
                                price,
                                description,
                                imageId,
                                offerTags = {},
                                ratings = {},
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
                              title={offerTags.title}
                              subTitle={offerTags.subTitle}
                              rating={ratings.aggregatedRating?.rating}
                              ratingCountV2={
                                ratings.aggregatedRating?.ratingCountV2
                              }
                              MENU_IMG_URL={MENU_IMG_URL}
                            />
                          )
                        )}
                    </>
                  ) : (
                    <>
                      <h4 className="font-bold text-gray-500 text-xl leading-10">
                        {title}
                      </h4>
                      {categories.length > 0 &&
                        categories.map(
                          ({ title, itemCards = [] }, catIndex) => (
                            <div key={catIndex}>
                              <ResMenuHeading
                                index={catIndex}
                                title={title}
                                itemCardsLength={itemCards.length}
                                isActive={
                                  activeIndex === `${index}-${catIndex}`
                                }
                                setActiveIndexes={() =>
                                  toggleActiveIndex(`${index}-${catIndex}`)
                                }
                              />
                              {activeIndex === `${index}-${catIndex}` &&
                                itemCards.map(
                                  ({
                                    card: {
                                      info: {
                                        id,
                                        name,
                                        price,
                                        description,
                                        imageId,
                                        offerTags = {},
                                        ratings = {},
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
                                      title={offerTags.title}
                                      subTitle={offerTags.subTitle}
                                      rating={ratings.aggregatedRating?.rating}
                                      ratingCountV2={
                                        ratings.aggregatedRating?.ratingCountV2
                                      }
                                      MENU_IMG_URL={MENU_IMG_URL}
                                    />
                                  )
                                )}
                            </div>
                          )
                        )}
                    </>
                  )}
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
