const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

//POST/PUT  /auth/signup
router.put('/signup', authController.signup);

router.post('/login', authController.login);

module.exports = router;

// [
//     body('email')
//     .isEmail()
//     .withMessage('please enter a valid email')
//     .custom((value, { req }) => {
//         return User.findOne({email: value}).then(userDoc => {
//             if (userDoc) {
//                 return Promise.reject('E-mail address already exists!')
//             }
//         });
//     })
//     .normalizeEmail(),
//     body()
// ]