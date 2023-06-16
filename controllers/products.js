/** @format */

const Products = require("../models/products");

//CRUD Controllers

//get all products
exports.getProducts = (req, res, next) => {
  Products.findAll()
    .then((products) => {
      res.status(200).json({ products: products });
    })
    .catch((err) => console.log(err));
};

//get product by id
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Products.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }
      res.status(200).json({ product: product });
    })
    .catch((err) => console.log(err));
};

//create product
exports.createProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const imageURL = req.body.imageURL;
  const category = req.body.category;

  User.create({
    name: name,
    price: price,
    description: description,
    quantity: quantity,
    imageURL: imageURL,
    category: category,
  })
    .then((result) => {
      console.log("Created Product");
      res.status(201).json({
        message: "Product created successfully!",
        product: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//update product
exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;

  const updateName = req.body.name;
  const updatePrice = req.body.price;
  const updateDescription = req.body.description;
  const updateQuantity = req.body.quantity;
  const updateImageURL = req.body.imageURL;
  const updateCategory = req.body.category;

  User.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }
      product.name = updateName;
      product.price = updatePrice;
      product.description = updateDescription;
      product.quantity = updateQuantity;
      product.imageURL = updateImageURL;
      product.category = updateCategory;

      return product.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Product updated!", product: result });
    })
    .catch((err) => console.log(err));
};

//delete product
exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  User.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }
      return Product.destroy({
        where: {
          id: productId,
        },
      });
    })
    .then((result) => {
      res.status(200).json({ message: "Product deleted!" });
    })
    .catch((err) => console.log(err));
};
