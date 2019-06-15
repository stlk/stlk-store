import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";

function Header({ stickToTop }) {
  const [isExpanded, toggleExpansion] = useState(false);

  return (
    <nav
      className={`${
        stickToTop
          ? "absolute top-0 right-0 left-0 text-white"
          : "text-gray-900"
      } p-6 font-display uppercase tracking-widest`}
    >
      <div className="flex items-center justify-between flex-wrap max-w-4xl mx-auto w-full">
        <Link to="/" className="flex items-center flex-shrink-0 mr-6">
          <span className="text-2xl font-bold">The Urban Wilderness</span>
        </Link>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded border-white-400 hover:border-white"
            onClick={() => toggleExpansion(!isExpanded)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isExpanded ? `block` : `hidden`
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm font-semibold">
            <a
              href="#about"
              className="block mt-4 lg:inline-block lg:mt-0 mr-8"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``,
  stickToTop: false
};

export default Header;
