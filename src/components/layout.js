import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div className="flex flex-col font-body leading-normal min-h-screen text-gray-900">
          {children}
          <footer className="bg-gray-800">
            <div className="flex justify-between flex-row-reverse max-w-4xl mx-auto p-4 md:p-8 text-sm">
              <p className="text-white">
                Created by{" "}
                <a
                  href="https://rousek.name/"
                  className="font-bold no-underline text-white"
                >
                  Josef Rousek
                </a>
                . Sold by{" "}
                <a
                  href="#"
                  className="font-bold no-underline text-white"
                >
                  *seller*
                </a>
                .
              </p>
            </div>
          </footer>
        </div>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
