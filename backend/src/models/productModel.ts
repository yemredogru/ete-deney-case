import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String},
    category:{type:String},
    amount:{type:Number},
    amountUnit:{type:String},
    company:{type:mongoose.Types.ObjectId,
    ref:'company'}
}, { timestamps: true })


export const productModel = mongoose.model('product', productSchema);
