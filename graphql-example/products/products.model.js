const products = [
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

const getAllProducts = () => {
  return products;
};

const getProductsByPrice = (min, max) => {
  return products.filter((product) => {
    return product.price >= min && product.price <= max;
  });
};

module.exports = {
  getAllProducts,
  getProductsByPrice
};
