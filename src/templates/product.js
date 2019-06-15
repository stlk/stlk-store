import React, {useState} from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Header from "../components/header";
import Price from "../components/Price"

export default ( {data: {shopifyProduct}} )  => {
  const [variant, setVariant] = useState(shopifyProduct.variants[0]);

  return (
    <Layout>
      <SEO title={shopifyProduct.title} keywords={[]} />
      <Header />

      <div className="flex justify-between max-w-2xl mx-auto mt-10 mb-24 w-full max-w-5xl">
        <div className="w-1/2">
          {shopifyProduct.images.map(({localFile})=>
        <Img
              fluid={localFile.childImageSharp.fluid}
          alt=""
        />)
          }
        </div>
        <div className="pl-8 w-1/2">
          <h2 className="text-3xl my-6">{shopifyProduct.title}</h2>
          <h2 className="font-display uppercase tracking-widest font-semibold text-2xl my-2">
            <Price amount={variant.price} currency="USD" />
            </h2>
          <p className="text-md" dangerouslySetInnerHTML={{
            __html: shopifyProduct.descriptionHtml,
          }} />
        </div>
      </div>

    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    shopifyProduct(id: {eq: $id}) {
      id
      handle
      title
      descriptionHtml
      variants {
        id
        price
        title
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
`