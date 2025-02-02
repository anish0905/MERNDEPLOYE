const mongoose = require("mongoose");

const executiveSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"Please add the user name"],
        },
        
        email:{
            type: String,
            required:[true,"Please add the user email address"],
            unique:[true,"Email address already taken"]
        },
        password:{
            type:String,
            required:[true,"Please add the user password"]
        },
        confirmPassword:{
            type:String,
            required:[true,"Please add the user confirm password"]
        },
        country:{
            type:String,
            required:true,
            enum:['India'],
            default:'India',
        },
        state:{
            type:String,
            required:true,
            // enum:['Assam','Bihar','Chhattisgarh','West Bengal','Jharkhand'],
            // default:'Bihar',
        },
        city:{
            type:String,
            required:[true,"please add the city "]
        },
        resetToken: String,
        resetTokenExpiration: Date
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("executives", executiveSchema);
