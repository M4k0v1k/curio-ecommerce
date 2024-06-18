const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// Register routes
router.get('/register', (req, res) => {
  const type = req.query.type || 'individual' // default to individual if type is not specified
  res.render('register', { type })
})

router.post('/register', authController.register)

// Login routes
router.get('/login', (req, res) => {
  const type = req.query.type || 'individual' // default to individual if type is not specified
  res.render('login', { type })
})

router.post('/login', authController.login)

module.exports = router
