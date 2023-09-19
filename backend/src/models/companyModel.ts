import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{type:String},
    legalNumber:{type:String},
    incorporationCountry:{type:String},
    website:{type:String}

}, { timestamps: true })


export const companyModel = mongoose.model('company', companySchema);
