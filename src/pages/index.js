import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Header from "../components/header";
import Price from "../components/Price"

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

      <Header stickToTop />

      <div className="max-w-2xl mx-auto my-20 text-center">
        <h2 className="text-3xl my-6">travelling, coffee and bikes</h2>
        <p className="text-md">show your pride</p>
      </div>

      <div className="flex items-center justify-between flex-wrap mx-auto w-full max-w-5xl my-8">
        {data.allShopifyProduct.edges.map(
          ({ node }) => (
            <div key={node.id} className="w-full sm:w-1/2 px-4">
              <Link to={`/product/${node.handle}`} className="block px-8 py-4 product-link hover:opacity-75">
                <Img
                  fluid={node.images[0].localFile.childImageSharp.fluid}
                  className="h-64"
                  imgStyle={{ objectFit: "contain" }}
                  alt=""
                />
              </Link>
              <Link
                to={`/product/${node.handle}`}
                className="m-4 mx-auto flex justify-center items-center"
              >
                <span className="text-xl italic">{node.title}</span>
                <span className="text-sm font-display uppercase tracking-widest">
                  &nbsp;—{" "}
                  <span className="font-semibold">
                    <Price amount={node.priceRange.minVariantPrice.amount} currency={node.priceRange.minVariantPrice.currencyCode} />
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
          handle
          title
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
