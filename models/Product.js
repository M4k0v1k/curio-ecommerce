const db = require('../config/db') // Adjust this path to your actual db configuration

const Product = {
  getAllProducts: (callback) => {
    const sql = 'SELECT * FROM products'
    db.query(sql, callback)
  },
}

module.exports = Product
