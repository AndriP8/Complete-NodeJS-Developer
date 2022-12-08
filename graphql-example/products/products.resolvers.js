const productsModel = require("./products.model");

module.exports = {
  Query: {
    products: () => {
      return [
        {
          id: "redshoe",
          description: "Red Shoe",
          price: 43.3
        },
        {
          id: "bluejeans",
          description: "Blue Jeans",
          price: 40.3
        }
      ];
    },
    productsByPrice: (_, args) => {
      return productsModel.getProductsByPrice(args.min, args.max);
    }
  }
};
