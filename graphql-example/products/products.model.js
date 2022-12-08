const products = [
  {
    id: "redshoe",
    description: "Red Shoe",
    price: 43.3,
    reviews: []
  },
  {
    id: "bluejeans",
    description: "Blue Jeans",
    price: 40.3,
    reviews: []
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

const addNewProduct = (id, description, price) => {
  const newProduct = {
    id,
    price,
    description,
    reviews: []
  };

  products.push(newProduct);
  return newProduct;
};

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct
};
