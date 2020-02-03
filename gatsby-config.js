require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `The Urban Wilderness`,
    description: `Your gear for the city`,
    author: `Josef Rousek`
  },
  plugins: [
    {
      resolve: "gatsby-source-shopify",
      options: {
        shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,

        // An API access token to your Shopify shop. This is required.
        // You can generate an access token in the "Manage private apps" section
        // of your shop's Apps settings. In the Storefront API section, be sure
        // to select "Allow this app to access your storefront data using the
        // Storefront API".
        // See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,

        apiVersion: "2020-01",

        // Set verbose to true to display a verbose output on `npm run develop`
        // or `npm run build`. This prints which nodes are being fetched and how
        // much time was required to fetch and process the data.
        // Defaults to true.
        verbose: true,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { path: `${__dirname}/src/images/` }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        tailwind: true,
        purgeOnly: ["src/css/style.css"]
      }
    }
  ]
};
