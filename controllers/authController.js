const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

const authController = {
  register: async (req, res) => {
    const { username, email, password, fname, lname, dob } = req.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      User.createUser(
        { username, password: hashedPassword, dob, email, fname, lname },
        (err, result) => {
          if (err) {
            console.error('Database error:', err)
            return res.status(500).send('Server error')
          }
          res.redirect('/login')
        }
      )
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).send('Server error')
    }
  },
  login: (req, res) => {
    const { email, password } = req.body

    User.findUserByEmail(email, async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).send('Invalid email or password')
      }

      const user = results[0]
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(401).send('Invalid email or password')
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })
      res.cookie('token', token, { httpOnly: true })
      res.redirect('/dashboard')
    })
  },
  resetPasswordRequest: (req, res) => {
    const { email } = req.body
    const otp = Math.floor(100000 + Math.random() * 900000)

    User.findUserByEmail(email, (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).send('Email not found')
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP is ${otp}`,
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send('Email could not be sent')
        }

        // Store OTP in session or database
        req.session.otp = otp
        req.session.email = email
        res.redirect('/reset-password')
      })
    })
  },
  resetPassword: (req, res) => {
    const { email, otp, newPassword } = req.body

    if (req.session.otp === otp && req.session.email === email) {
      const hashedPassword = bcrypt.hashSync(newPassword, 10)

      const sql = 'UPDATE users SET password = ? WHERE email = ?'
      db.query(sql, [hashedPassword, email], (err, result) => {
        if (err) {
          return res.status(500).send('Server error')
        }
        res.redirect('/login')
      })
    } else {
      res.status(400).send('Invalid OTP')
    }
  },
}

module.exports = authController
