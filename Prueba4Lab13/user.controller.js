const bcrypt = require('bcryptjs');
const User = require('../models/users.model');
const message = 'hola';

exports.get_login = (req, res, next) => {
    res.render('logIn',{ message: message })
  }

exports.get_signup = (req, res, next) => {
    res.render('signUp',{ message: message })
  }
  
  exports.post_signup = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
  
    if (password !== confirmPassword) {
      return res.status(422).render('signUp', { message: "Passwords don't match" });
    }
  
    User.fetchOne(name)
      .then(([rows]) => {
        if (rows.length > 0) {
          return res.status(422).render('signUp', { message: "Username already exists" });
        }
        return bcrypt.hash(password, 12);
      })
      .then(hashedPassword => {
        const user = new User({
          name: name,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => {
        console.log('User created!');
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
      });
  }
