const db = require('mongoose');
db.model
const userSchema = db.Schema({

    _id:                    db.Schema.Types.ObjectId,
    firstName:              { type: String, required: true },
    lastName:               { type: String, required: true },
    email:                  { type: String, required: true, unique: true},
    password:               { type: String, required: true },
    birthDate:              { type: String, required: true}, 
    billingAddress:         { type: String, required: true },
    billingPostalNumber:    { type: String, required: true },
    billingCity:            { type: String, required: true },
    billingCountry:         { type: String, required: true },
    shippingAddress:        { type: String, required: true },
    shippingPostalNumber:   { type: String, required: true },
    shippingCity:           { type: String, required: true },
    shippingCountry:        { type: String, required: true }
    
});

module.exports = db.model("User", userSchema);