import { userModel } from "../models/userModel";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

async function createToken(payload,time) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, "secretkey", { expiresIn: time }, (err, token) => { if (err) reject(err); resolve(token) })
    })
}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        var user = await userModel.findOne({ email: email.trim() });
        if (!user) {
            user = await userModel.findOne({ phone: email.trim() })
            if (!user) {
                res.status(500).json({status:false,message:"user not found"})
            }
        }
        const isEqual = await bcrypt.compare(password.toString(), user!.password);
        if (!isEqual) {
            res.status(500).json({status:false,message:"password mismatch"})
        }


        const payload = {
            id: user!._id,
            email: user!.email,
            firstName: user!.firstName,
            lastName: user!.lastName,
        };

        const token = await createToken(payload,'24h');
        await user!.save();
        res.status(200).json({status:true,message:token})
    }
    catch (err) {
    res.status(500)
}
}

export const Register = async (req, res, next) => {
    try {
        const { email } = req.body
        var user = await userModel.findOne({email:email.trim(' ')})
        if(user){
            res.status(401).json({status:false,message:'Email already exist'})
        }
        else{
            await userModel.create(req.body)
            res.status(201).json({status:true,message:'User created successfully'})
        }
        
    }
    catch (err) {
    res.status(500)
}
}