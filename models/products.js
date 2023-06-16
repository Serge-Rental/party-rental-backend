const Sequelize = require('sequelize');
const db = require('../util/database');

const Products = db.define('products', {
    name: {
        type: Sequelize.STRING,
        allownull: false
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue: 100
      },
      description: {
        type: Sequelize.TEXT
        // validate: {
        //   notEmpty: true
        // }
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      imageURL: {
        type: Sequelize.STRING,
        defaultValue:''
      },
      category: {
        type: Sequelize.STRING,
        allownull: false
        // validate: {
        //   notEmpty: true
        // }
      }
});

module.exports = Products;