const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
)

// Routes setup
const authRoutes = require('./routes/authRoutes')
app.use(authRoutes)

// Root route
app.get('/', (req, res) => {
  res.render('index')
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
