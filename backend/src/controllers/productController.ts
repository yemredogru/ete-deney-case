import { productModel } from "../models/productModel";


export const AddProduct = async (req, res, next) => {
    try {
            await productModel.create(req.body)
            res.status(201).json({status:true,message:'User created successfully'})
        
    }
    catch (err) {
    res.status(500)
}
}

export const UpdateProduct = async (req, res, next) => {
    try {
        const { id, name,category, amount, amountUnit, company } = req.body;
    
      console.log(company)
        // Şirketi güncellemek için tek bir işlem kullanın (yeni eklemeyin)
        const result = await productModel.findOneAndUpdate(
          { _id: id },
          {
            $set: { // Var olan şirketi güncellemek için kullanılacak alanlar
              name,
              category,
              amount,
              amountUnit,
              company
            },
          },
          {
            new: true, // Güncellenen şirketi geri döndürür
          }
        );
    
        res.status(200).json({ status: true, message: "Product updated", data: result });
      } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: "Server error" });
      }
}
export const GetProducts = async (req, res, next) => {
    try {
        var company = await productModel.find().populate({
          path: 'company',
          model: 'company',
        });
        res.status(201).json({status:true,message:company})
        
    }
    catch (err) {
    res.status(500)
}
}

export const DeleteProducts = async (req, res, next) => {
  try {
    var {product_list} = req.body
    await productModel.deleteMany({ _id: { $in: product_list } })
    res.status(200).json({status:true,message:true})
  }
  catch (err) {
  res.status(500)
}
}