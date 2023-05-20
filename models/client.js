import mongoose from "mongoose"
const userSchema=mongoose.Schema({
    username:{type:String, require:true},
    password:{type:String, require:true},
    email:{type:String, require:true},
    statoIscrizione:{type:String }},
    {timestamps:true})
export const Client=mongoose.model('client',userSchema)