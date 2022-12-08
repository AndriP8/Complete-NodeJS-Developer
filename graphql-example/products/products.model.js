const products = [
  {
    id: "redshoe",
    description: "Red Shoe",
    price: 43.3
  },
  {
    id: "bluejeans",
    description: "Blue Jeans",
    price: 40.3,
    reviews: [
      {
        rating: 9,
        comment: "great product"
      }
    ]
  }
];

const getAllProducts = () => {
  return products;
};

const getProductsByPrice = (min, max) => {
  return products.filter((product) => {
    return product.price >= min && product.price <= max;
  });
};

const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById
};
