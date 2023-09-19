import { companyModel } from "../models/companyModel";
import { productModel } from "../models/productModel";
import { userModel } from "../models/userModel";

export const AddCompany = async (req, res, next) => {
    try {
        const { name,legalNumber,incorporationCountry,website } = req.body
        const existingCompany = await companyModel.findOne({
          $or: [
            { name }, // Şirket adı eşleşirse
            { legalNumber }, // Legal numara eşleşirse
          ],
        });
    
        if (existingCompany) {
          // Şirket adı veya legalNumber ile mevcut bir kayıt bulunursa hata dönün
          return res.status(400).json({ status: false, message: "Name or Legal Number already exist" });
        }
        else{
            await companyModel.create(req.body)
            res.status(201).json({status:true,message:'User created successfully'})
        }
        
    }
    catch (err) {
    res.status(500)
}
}

export const UpdateCompany = async (req, res, next) => {
    try {
        const { id, name, legalNumber, incorporationCountry, website } = req.body;
    
        // Şirket adı ve legalNumber ile veritabanında mevcut bir kayıt var mı kontrol edin
        const existingCompany = await companyModel.findOne({
          $or: [
            { name }, // Şirket adı eşleşirse
            { legalNumber }, // Legal numara eşleşirse
          ],
          _id: { $ne: id }, // Güncellenen şirket dışındaki kayıtları kontrol etmek için
        });
    
        if (existingCompany) {
          // Şirket adı veya legalNumber ile mevcut bir kayıt bulunursa hata dönün
          return res.status(400).json({ status: false, message: "Name or Legal Number already exist" });
        }
    
        // Şirketi güncellemek için tek bir işlem kullanın (yeni eklemeyin)
        const result = await companyModel.findOneAndUpdate(
          { _id: id },
          {
            $set: { // Var olan şirketi güncellemek için kullanılacak alanlar
              name,
              legalNumber,
              incorporationCountry,
              website,
            },
          },
          {
            new: true, // Güncellenen şirketi geri döndürür
          }
        );
    
        res.status(200).json({ status: true, message: "Company updated", data: result });
      } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: "Server error" });
      }
}
export const GetCompanies = async (req, res, next) => {
    try {
        var company = await companyModel.find()
        res.status(200).json({status:true,message:company})
        
    }
    catch (err) {
    res.status(500)
}
}
export const DeleteCompanies = async (req, res, next) => {
  try {
    var {company_list} = req.body
    await companyModel.deleteMany({ _id: { $in: company_list } })
    await productModel.deleteMany({company:{$in:company_list}})
    res.status(200).json({status:true,message:true})
  }
  catch (err) {
  res.status(500)
}
}

export const DashboardData = async (req, res, next) => {
  try {
    var company_count = await companyModel.count()
    var latest_companies = await companyModel.find().sort({createdAt:-1}).limit(3)
    var products = await productModel.find()
    res.status(200).json({status:true,message:{company_count,latest_companies,products}})
  }
  catch (err) {
  res.status(500)
}
}