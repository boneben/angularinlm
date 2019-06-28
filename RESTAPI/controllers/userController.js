const db = require('mongoose');
const encrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.register = function(req, res) {    
    User
        .find({ email: req.body.email })
        .exec()
        .then(function(user) {
            if(user.length > 0) {
                return res.status(400).json({
                    message: `A user with that email address ${req.body.email} already exists.`,
                    statuscode: 400
                })
            }
            else {
                encrypt.hash(req.body.password, 10, function(error, hash) {
                    if(error) {
                        return res.status(500).json({ 
                            error: error,
                            message: ` ${req.body.email}`
                        });
                    }
                    else {
                        let user = new User(
                            {
                                _id:                    new db.Types.ObjectId,
                                firstName:              req.body.firstName,
                                lastName:               req.body.lastName,
                                email:                  req.body.email,
                                password:               hash,
                                birthDate:              req.body.birthDate,
                                billingAddress:         req.body.billingAddress,
                                billingPostalNumber:    req.body.billingPostalNumber,
                                billingCity:            req.body.billingCity,
                                billingCountry:         req.body.billingCountry,
                                shippingAddress:        req.body.shippingAddress,
                                shippingPostalNumber:   req.body.shippingPostalNumber,
                                shippingCity:           req.body.shippingCity,
                                shippingCountry:        req.body.shippingCountry

                            }
                        );
                        user
                            .save()
                            .then(function() {
                                res.status(201).json({
                                   message: `User ${req.body.firstName} ${req.body.lastName} was created successfully.`,
                                   statuscode: 201,
                                   success: true 
                                })
                            })
                            .catch(function(error) {
                                res.status(500).json({
                                    message: `Unable to create user ${req.body.firstName} ${req.body.lastName}.`,
                                    statuscode: 500,
                                    success: false
                                })
                            })
                    }
                })
            }
        }) 
}

exports.login = function(req, res) {
    User
        .find({ email: req.body.email })
        .then(function(user) {
            if(user.length === 0) {
                return res.status(401).json({
                    message: "Wrong email or password",
                    statuscode: 401,
                    success: false
                })
            } 
            else {
                encrypt.compare(req.body.password, user[0].password, function(error, result) {
                    if(error) {
                        return res.status(401).json({
                            message: "Wrong email or password",
                            statuscode: 401,
                            success: false
                        })
                    }

                    if(result) {
                        const token = jwt.sign(
                            { id: user[0]._id, email: user[0].email },
                            process.env.PRIVATE_SECRET_KEY,
                            { expiresIn: "1h" }
                        )

                        return res.status(200).json({
                            message: "Authentication was successful",
                            success: true,
                            token: token,
                            id: user[0]._id,
                            email: user[0].email
                        })
                    }

                    return res.status(401).json({
                        message: "Wrong email or password",
                        statuscode: 401,
                        success: false
                    })
                })
            }       
        })
}

exports.getUser = function(req, res) {
    User
        .find({ _id: req.params.id })
        .then((data) => res.status(200).json(data))
}

exports.updateUser = function(req, res) {
    if( req.body.password.length > 0 ) {
        console.log("Password changed")
        encrypt.hash(req.body.password, 10, function(error, hash) {
            if(error) {
                return res.status(500).json({
                    error: error,
                    message: "Error | failed to encrypt password"
                })
            }
            else {
                User
                .updateOne({ _id:req.params.id },
                {$set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    billingAddress: req.body.billingAddress,
                    billingPostalNumber: req.body.billingPostalNumber,
                    billingCity: req.body.billingCity,
                    billingCountry: req.body.billingCountry,
                    shippingAddress: req.body.shippingAddress,
                    shippingPostalNumber: req.body.shippingPostalNumber,
                    shippingCity: req.body.shippingCity,
                    shippingCountry: req.body.shippingCountry
                }})
                .then( result => {
                    res.json({succes: true});
                })
                .catch(function(error, affected, resp) {
                    console.log(error);
                })
            }
        });
    } else {
        User
        .updateOne({ _id:req.params.id },
        {$set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            billingAddress: req.body.billingAddress,
            billingPostalNumber: req.body.billingPostalNumber,
            billingCity: req.body.billingCity,
            billingCountry: req.body.billingCountry,
            shippingAddress: req.body.shippingAddress,
            shippingPostalNumber: req.body.shippingPostalNumber,
            shippingCity: req.body.shippingCity,
            shippingCountry: req.body.shippingCountry
        }})
        .then( result => {
            res.json({succes: true});
        })
        .catch(function(error, affected, resp) {
            console.log(error);
        })
    }
}