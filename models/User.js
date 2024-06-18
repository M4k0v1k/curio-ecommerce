const db = require('../config/db')

const User = {
  createUser: (user, callback) => {
    const sql =
      'INSERT INTO users (username, email, password, type) VALUES (?, ?, ?, ?)'
    db.query(
      sql,
      [user.username, user.email, user.password, user.type],
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
