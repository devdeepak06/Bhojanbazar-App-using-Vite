import PropTypes from "prop-types";
const SampleArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey" }}
      onClick={onClick}
    />
  );
};

SampleArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
export default SampleArrow;
