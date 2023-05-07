import mongoose from "mongoose"
const userSchema=mongoose.Schema({
    nome:{type:String, require:true},
    gender:{type:String, require:true},
    materiale:{type:String, require:true}
}, {timestamps:true})
export const Occhiale = mongoose.model('prodotti',userSchema)