const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// Root route
router.get('/', (req, res) => {
  Product.getAllProducts((err, results) => {
    if (err) {
      console.error('Error fetching products:', err)
      return res.status(500).send('Server error')
    }
    res.render('index', { products: results })
  })
})

module.exports = router
