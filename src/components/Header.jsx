import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="z-10 flex items-center justify-between px-2 sticky top-0 gap-5 bg-slate-500 text-white font-bold">
      <Link to="/" className="logo" aria-label="Bhojan Bazaar Logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-40"
          viewBox="0 0 100 100"
          width="100"
          height="100"
          fill="currentColor"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#5fad82"
            strokeWidth="3"
            fill="#4CAF50"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fill="#fff"
            fontSize="20px"
            dy=".3em"
          >
            Bhojan Bazaar
          </text>
        </svg>
      </Link>
      <nav className="navItems">
        <ul className="flex justify-between gap-16 px-5 list-none text-lg font-bold items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/restaurants">Restaurants</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
