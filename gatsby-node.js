const path = require("path");

exports.createPages = async function createPages({ actions, graphql }) {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allShopifyProduct(filter: { tags: { eq: "men" } }) {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `);


  if (result.errors) {
    throw new Error(result.errors)
  }

  result.data.allShopifyProduct.edges.forEach(edge => {
    createPage({
      path: `/product/${edge.node.handle}`,
      component: path.resolve("./src/templates/product.js"),
      context: {
        id: edge.node.id
      }
    });
  });
}
