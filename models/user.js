const userSchema=mongoose.Schema({
    nome:{type:String, require:true},
    gender:{type:String, require:true},
    materiale:{type:String, require:true}
}, {timestamps:true})
export const User = mongoose.model('User',userSchema)