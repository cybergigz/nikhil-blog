
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    mobileNo: { type: String, unique: true, index: true },
    email: { type: String, unique: true, index: true },
    DOB: String,
    SSN: String,
    usCity : Boolean,
    address:{
        country:String,
        AddressLine1:String,
        AddressLine2:String,
        city:String,
        state:String,
        zipCode:String
    },
    password:String,
    Active:Boolean


}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
