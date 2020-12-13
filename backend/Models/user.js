const mongoose=require('mongoose');
const uniquValidator=require('mongoose-unique-validator')

const userSchema=new mongoose.Schema({
   email:{
        type: String,
        required: true,
        unique:true
    },
   password:{
        type: String,
        required:true
    }
})

userSchema.plugin(uniquValidator)
module.exports= mongoose.model("User",userSchema)