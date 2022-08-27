const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const mobile = req.body.mobile;
    bcrypt
      .hash(password, 12)
      .then(hashedPw => {
        const user = new User({
            name: name,
            email: email,
            password: hashedPw,
            mobile: mobile
        });
        return user.save();
      })
      .then(result => {
        const AccessToken = jwt.sign(
          {
            email: email,
            userId: result._id.toString()
          },
          'accessTokenKey',
        );
        const refreshToken = jwt.sign(
          {
            email: email,
            userId: result._id.toString()
          },
          'refreshTokenKey'
        );
        res.status(201).json({message: 'User Created', userId: result._id, accessToken: AccessToken, refreshToken: refreshToken })
      })
      .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
      })

};


exports.login = (req, res, next) => {
    const mobile = req.body.mobile;
    const password = req.body.password;
    let loadedUser;
    User.findOne({mobile: mobile})
    .then(user => {
        if (!user) {
            const error = new Error('A user with this mobile no. does not exist');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            const error = new Error('wrong password');
            error.statusCode = 404;
            throw error;            
        }
        const token = jwt.sign(
          {
            email: loadedUser.email, 
            userId: loadedUser._id.toString()
          }, 
          'accessTokenKey', 
          {expiresIn: '1h'}  //expiry of the token is 5 minutes
        );
        const refreshToken = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
          },
          'refreshTokenKey',
          { expiresIn: '5m'}  //expiry of the token is 5 minutes
        );
        res.status(200).json({accessToken: token, refreshToken: refreshToken});
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
    
};