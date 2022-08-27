const Txn = require('../models/transaction');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getTransactions = (req, res, next) => {
   const currentPage = req.query.page || 1;
   const perPage = Number(req.body.itemsToDisplay);
   let totalItems;
   Txn.find()
    .countDocuments()
    .then(count => {
     totalItems = count;
     return Txn.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(txnData => {
       res.status(200).json({
          message: "Fetched Transactions successfully", Transactions: txnData
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
   
};