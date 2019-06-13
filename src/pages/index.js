import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="" keywords={[]} />
      <Img
        fluid={data.hero.childImageSharp.fluid}
        className="object-cover object-center h-screen w-full overlay"
        alt=""
      />
      <div className="inset-0 absolute overlay">
        <div className="flex h-screen w-full items-center justify-center text-center">
          <div className="text-white">
            <p className="font-display uppercase tracking-widest font-semibold text-lg mb-2">
              in pursuit of
            </p>
            <h2 className="text-6xl font-thin">fulfillment</h2>
          </div>
        </div>
      </div>

      <nav className="absolute top-0 right-0 left-0 p-6 font-display uppercase tracking-widest">
        <div className="flex items-center justify-between flex-wrap max-w-4xl mx-auto w-full">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="text-2xl font-bold">The Urban Wilderness</span>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-white border-white-400 hover:text-white hover:border-white">
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
          <div className="w-full block lg:flex lg:items-center lg:w-auto">
            <div className="text-sm font-semibold">
              <a
                href="#about"
                className="block mt-4 lg:inline-block lg:mt-0 text-white mr-8"
              >
                About
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto my-20 text-center">
        <h2 className="text-3xl my-6">travelling, coffee and bikes</h2>
        <p className="text-md">show your pride</p>
      </div>

      <div className="flex items-center justify-between flex-wrap mx-auto w-full max-w-5xl my-8">
        {data.allShopifyProduct.edges.map(
          ({ node }) => (
            <div key={node.id} className="w-full sm:w-1/2 px-4">
              <Link className="block px-8 py-4 product-link hover:opacity-75">
                <Img
                  fluid={node.images[0].localFile.childImageSharp.fluid}
                  className="h-64"
                  imgStyle={{ objectFit: "contain" }}
                  alt=""
                />
              </Link>
              <Link
                href="#"
                className="m-4 mx-auto flex justify-center items-center"
              >
                <span className="text-xl italic">{node.title}</span>
                <span className="text-sm font-display uppercase tracking-widest">
                  &nbsp;—{" "}
                  <span className="font-semibold">
                    {new Intl.NumberFormat(window.navigator.language, {
                      style: "currency",
                      currency: node.priceRange.minVariantPrice.currencyCode
                    }).format(node.priceRange.minVariantPrice.amount)}
                  </span>
                </span>
              </Link>
            </div>
          )
        )}
      </div>

      <div id="about" className="max-w-2xl mx-auto my-12 text-center">
        <h2 className="text-3xl my-6">About</h2>
        <hr className="w-10 border-b border-gray-900" />
      </div>

      <div className="flex justify-between items-center max-w-2xl mx-auto mt-10 mb-24 w-full max-w-5xl">
        <Img
          fluid={data.about.childImageSharp.fluid}
          className="w-full"
          style={{ flex: '0 1 50%'}}
          alt=""
        />
        <div className="pl-8">
        <h2 className="font-display uppercase tracking-widest font-semibold text-2xl my-2">We are couple</h2>
      <p className="text-md">
        who share their passion for good coffee, bikes and exploring new cities.
      </p>
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  {
    hero: file(relativePath: { eq: "bike.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    about: file(relativePath: { eq: "about.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allShopifyProduct(filter: { tags: { eq: "josef" } }) {
      edges {
        node {
          id
          title
          descriptionHtml
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            localFile {
              childImageSharp {
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
