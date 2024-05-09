const mongoose = require("mongoose");

const qrGeneraterBoySignupSchema = mongoose.Schema(
  {
    
      "username": {
        "type": "String",
        "required": true,
        "errorMessage": "Please add the user name"
      },
      "email": {
        "type": "String",
        "required": true,
        "unique": true,
        "errorMessage": "Please add the user email address"
      },
      "password": {
        "type": "String",
        "required": true,
        "errorMessage": "Please add the user password"
      },
      "confirmPassword": {
        "type": "String",
        "required": true,
        "errorMessage": "Please add the user confirm password"
      },
      "phoneNo": {
        "type": "Number",
        "required": true,
        "errorMessage": "Please add the user phone number"
      },
      "address": {
        "type": "String",
        "required": true,
        "errorMessage": "Please add the user address"
      },
      
    
    stockistEmailId: {
      type:String,
      ref: "executives",
    },
  },
  {
    timestamps: true, // Corrected spelling
  }
);

module.exports = mongoose.model("QrGeneraterBoySignup", qrGeneraterBoySignupSchema);