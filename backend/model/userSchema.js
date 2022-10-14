import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    c_password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})
// Hashing
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    if (this.isModified('c_password')) {
        this.c_password = await bcrypt.hash(this.c_password, 12);
    }
    next();
});
// Geneartinng tokens
userSchema.methods.generateAuthToken = async function(){
    try {
        let token1 = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token1});
        await this.save();
        return token1;
    } catch (error) {
        console.log(err);
    }
}
const User = mongoose.model('USER', userSchema);
export default User;
