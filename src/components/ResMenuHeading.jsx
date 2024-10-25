import PropTypes from "prop-types";

const ResMenuHeading = ({
  title,
  itemCardsLength,
  index,
  setActiveIndexes,
  isActive,
}) => {
  return (
    <div
      className="flex justify-between items-center my-3 cursor-pointer"
      onClick={() => setActiveIndexes(index)} // Toggle active state on click
    >
      <h4 className="font-bold text-xl leading-10">
        {title} {itemCardsLength > 0 ? `(${itemCardsLength})` : " "}
      </h4>
      {itemCardsLength > 0 && (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="darkgreen"
            className={isActive ? "rotate-90" : "-rotate-90"} // Rotate based on active state
          >
            <path d="m414.67-480.67 170 170q9.66 9.67 9.33 23.34-.33 13.66-10 23.33-9.67 9.67-23.67 9.67-14 0-23.66-9.67L343.33-457.33q-5.33-5.34-7.5-11-2.16-5.67-2.16-12.34 0-6.66 2.16-12.33 2.17-5.67 7.5-11l194-194q9.67-9.67 23.67-9.67 14 0 23.67 9.67 9.66 9.67 9.66 23.67 0 14-9.66 23.66l-170 170Z" />
          </svg>
        </span>
      )}
    </div>
  );
};

ResMenuHeading.propTypes = {
  title: PropTypes.string.isRequired,
  itemCardsLength: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  setActiveIndexes: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default ResMenuHeading;
