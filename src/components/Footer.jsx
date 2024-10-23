import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="sticky bg-slate-500 text-white font-bold">
      <div className="p-5 flex justify-between items-center">
        <div className="footer-copyright">
          &copy;2024 Dev Technology Pvt Ltd
        </div>
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About us</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/policies">Our Policies</Link>
        </div>
        <div className="footer-address">Company</div>
        <div className="footer-contact">Contact us</div>
      </div>
      <div className="text-sm leading-5 p-6 flex justify-center items-center w-3/4 m-auto text-white">
        Made with
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="heart"
          className="svg-inline--fa fa-heart text-red-500 h-6 overflow-visible box-content mx-1"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
          ></path>
        </svg>
        India
      </div>
    </div>
  );
};

export default Footer;
