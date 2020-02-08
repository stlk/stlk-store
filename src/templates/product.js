import React, { useState, Fragment } from "react";
import {  graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Header from "../components/header";
import Price from "../components/Price";

export default ({ data: { shopifyProduct } }) => {
  const [variant, setVariant] = useState(shopifyProduct.variants[0]);
  function optionSelected(option, value) {
    const newOptions = {};
    variant.selectedOptions.forEach(so => newOptions[so.name] = so.value)
    newOptions[option] = value

    setVariant(
      shopifyProduct.variants.find(v =>
        v.selectedOptions.every(so => newOptions[so.name] === so.value)
      )
    );
  }

  function checkout() {
    if (!variant.availableForSale) {
      return;
    }
    const variantId = window
      .atob(variant.shopifyId)
      .replace("gid://shopify/ProductVariant/", "");
    window.location.href = `https://${process.env.GATSBY_SHOPIFY_SHOP_NAME}/cart/${variantId}:1?channel=buy_button`;
  }

  return (
    <Layout>
      <SEO title={shopifyProduct.title} description={shopifyProduct.description} />
      <Header />

      <div className="md:flex justify-between mx-auto mt-10 mb-24 w-full max-w-5xl mt-20">
        <div className="w-full">
          {shopifyProduct.images.map(({ localFile }, idx) => (
            <Img
              key={idx}
              fluid={localFile.childImageSharp.fluid}
              alt=""
              className="my-8"
            />
          ))}
        </div>
        <div className="pl-8 md:w-5/12 flex-none pl-12 pr-6">
          <div className="text-center">
            <h2 className="text-4xl my-6">{shopifyProduct.title}</h2>
            <h2 className="font-display uppercase tracking-widest font-semibold">
              <Price amount={variant.price} currency="USD" />
            </h2>
            <div className="mt-4 mb-6">Tax included.</div>
            <hr className="w-10 border-b border-gray-900 mb-6 mx-auto" />
            {shopifyProduct.options.map(option => {
              if (option.name === "Title") {
                return null
              }
              const optionId = `product-select-option-${option.name}`;
              const selectedOption = variant.selectedOptions.find(
                so => so.name === option.name
              );

              return (
                <Fragment key={optionId}>
                  <label className="block mb-3" htmlFor={optionId}>
                    {option.name}
                  </label>
                  <fieldset
                    id={optionId}
                    className="single-option-radio px-4 pb-4"
                  >
                    {option.values.map(value => {
                      const id = `${option.name}-${value}`;
                      return (
                        <Fragment key={id}>
                          <input
                            id={id}
                            name={option.name}
                            type="radio"
                            value={value}
                            checked={selectedOption.value === value}
                            onChange={() => {
                              optionSelected(option.name, value);
                            }}
                          />
                          <label
                            htmlFor={id}
                            className="font-display font-semibold uppercase tracking-widest"
                          >
                            {value}
                          </label>
                        </Fragment>
                      );
                    })}
                  </fieldset>
                </Fragment>
              );
            })}
            <button
              onClick={checkout}
              disabled={!variant.availableForSale}
              className="block w-full bg-gray-900 hover:bg-gray-800 text-white p-4 my-6 font-display font-semibold uppercase tracking-widest text-sm disabled:opacity-50"
            >
              Buy now
            </button>
          </div>
          <p
            className="description"
            dangerouslySetInnerHTML={{
              __html: shopifyProduct.descriptionHtml
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export const productQuery = graphql`
  query BlogPostBySlug($id: String!) {
    shopifyProduct(id: { eq: $id }) {
      id
      handle
      title
      description
      descriptionHtml
      variants {
        shopifyId
        availableForSale
        price
        title
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
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
`;
