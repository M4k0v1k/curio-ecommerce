const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const ensureAuth = require('../middleware/ensureAuth') // Importing the authentication middleware

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

// Dashboard route
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', { user: req.user })
})

module.exports = router
