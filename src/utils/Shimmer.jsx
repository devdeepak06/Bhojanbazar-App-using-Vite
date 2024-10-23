export const RestaurantCardShimmer = () => {
  return (
    <div
      className="w-48 p-1 m-1 cursor-pointer"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      {/* Shimmer for the image */}
      <div className="w-full h-36 bg-gray-200 animate-pulse"></div>

      {/* Shimmer for the restaurant name */}
      <div className="w-3/4 h-5 bg-gray-200 animate-pulse my-2"></div>

      {/* Shimmer for the cuisines */}
      <div className="w-2/3 h-4 bg-gray-200 animate-pulse my-2"></div>

      {/* Shimmer for the ratings, cost for two, and delivery time */}
      <div className="flex justify-between">
        <div className="w-1/4 h-4 bg-gray-200 animate-pulse"></div>
        <div className="w-1/4 h-4 bg-gray-200 animate-pulse"></div>
        <div className="w-1/4 h-4 bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export const Shimmer = () => {
  return (
    <div className="shimmer-container w-1/2 m-auto">
      <div className="shimmer w-1/2 h-10 bg-gray-200 rounded-md my-3"></div>
      <div className="shimmer w-full h-48 bg-gray-200 rounded-md my-3"></div>
      <div className="shimmer w-full h-10 bg-gray-200 rounded-md my-3"></div>
      <div className="shimmer w-full h-48 bg-gray-200 rounded-md my-3"></div>
    </div>
  );
};
