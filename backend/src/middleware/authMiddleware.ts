import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel';




export async function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != 'undefined'){
       try{

          const bearerToken = bearerHeader;

          const decoded = jwt.verify(bearerToken, "secretkey");
        req.user = decoded
        res.status(200).send({ status:true,message: decoded });
        }
        
       
       catch(err){
            res.status(403).send({ status:false,message: "Invalid Token" });
       }
    }
    else{
        res.status(403).json({status:false,message:"Unauthorized"})
    }
}