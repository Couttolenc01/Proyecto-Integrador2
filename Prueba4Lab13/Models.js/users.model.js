const bcrypt = require('bcryptjs');
const db = require('../util/database');

module.exports = class User {

  constructor(user) {
    this.name = user.name || 'John Doe';
    this.password = user.password || 'password';
  }


  save() {
    return bcrypt.hash(this.password, 12)
      .then((passwordHashed) => {
        return db.execute(`
          INSERT INTO users (name, password)
          VALUES (?, ?)
        `, [this.name, passwordHashed]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static fetchOne(name) {
    return db.execute(`
      SELECT * 
      FROM users
      WHERE name = ?
    `, [name]);
  }

  static getPrivileges(name) {
    return db.execute(`
      SELECT p.action
      FROM privileges p, role_privilege rp, roles r, user_role ur, users u
      WHERE u.name = ? AND u.id = ur.userId AND ur.roleId = r.id 
          AND rp.roleId = r.id AND rp.privilegeId = p.id
    `, [name]);
  }
}
