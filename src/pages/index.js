import React from "react";
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"

import Layout from "../components/layout";
import SEO from "../components/seo";

function IndexPage({data}) {
  return (
    <Layout>
      <SEO
        title=""
        keywords={[]}
      />
        <Img
          fluid={data.file.childImageSharp.fluid}
          className="object-cover object-center h-screen w-full overlay"
          alt=""
        />
      <div class="inset-0 absolute overlay">
        <div class="flex h-screen w-full items-center justify-center text-center">
          <div class="text-white">
            <p class="font-display uppercase tracking-widest font-semibold text-lg mb-2">
            An introductory
            </p>
            <h2 class="text-6xl font-thin">
              Hero Banner
            </h2>
          </div>
        </div>
      </div>

      <nav class="absolute top-0 right-0 left-0 p-6 font-display uppercase tracking-widest">
        <div class="flex items-center justify-between flex-wrap max-w-4xl mx-auto w-full">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <span class="text-2xl font-bold">The Urban Wilderness</span>
        </div>
          <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-white border-white-400 hover:text-white hover:border-white">
              <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
            </button>
          </div>
          <div class="w-full block lg:flex lg:items-center lg:w-auto">
            <div class="text-sm font-semibold">
              <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-white mr-8">
                About
              </a>
            </div>
        </div>
          </div>
        </nav>

      <div class="max-w-2xl mx-auto my-20 text-center">
        <h2 class="text-3xl my-6">Talk about your brand</h2>
        <p class="text-md">Use this text to share information about your brand with your customers. Describe a product, share announcements, or welcome customers to your store.</p>
      </div>

    </Layout>
  );
}

export default IndexPage;


export const pageQuery = graphql`
  {
    file(relativePath: { eq: "bike.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 2400) {
              ...GatsbyImageSharpFluid
            }
          }
    }
  }
`