import User from '../model/userSchema.js'
import jwt from "jsonwebtoken";
const authenticate = async (req,res,next)=>{
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        
        const rootuser = await User.findOne({_id:verifyToken._id,"tokens.token":token});

        if(!rootuser){
            throw new Error("user not found in token")
        }
        req.token = token;
        req.rootuser=rootuser;
        req.userId = rootuser._id;

        next();
    } catch (error) {
        res.status(401).send('Unauthorized:no token provided')
        console.log(error)
    }
}
export default authenticate;