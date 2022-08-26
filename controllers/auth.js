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
        res.status(201).json({message: 'User Created',userId: result._id })
      })
      .catch(err => {console.log(err)})

};

exports.login = (req, res, next) => {
    const mobile = req.body.mobile;
    const password = req.body.password;
    let loadedUser;
    User.findOne({mobile: mobile})
    .then(user => {
        if (!user) {
            console.log('A user with this mobile no does not exist');
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            console.log('wrong password');            
        }
        const token = jwt.sign(
          {
            email: loadedUser.email, 
            userId: loadedUser._id.toString()
          }, 
          'secretkey', 
          {expiresIn: '5m'}  //expiry of the token
        );
        res.status(200).json({token: token});
    })
    .catch(err => {console.log(err);});
    
};