const db = require('../config/db')

const User = {
  createUser: (user, callback) => {
    const sql =
      'INSERT INTO users (username, password, dob, email, fname, lname) VALUES (?, ?, ?, ?, ?, ?)'
    db.query(
      sql,
      [
        user.username,
        user.password,
        user.dob,
        user.email,
        user.fname,
        user.lname,
      ],
      callback
    )
  },
  findUserByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    db.query(sql, [email], callback)
  },
  findUserById: (id, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?'
    db.query(sql, [id], callback)
  },
}

module.exports = User
