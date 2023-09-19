import { useEffect, useState } from "react"
import ProductTable from "../components/products/ProductTable";
import { Button } from "antd"
import CreateProduct from "../components/products/ProductForm";

export default function ProductPage(){
    const [open,setOpen]=useState(false)
    const [isProductCreated, setIsProductCreated] = useState(false);
    const handleCreateProductClick = () => {
        setOpen(true);
      };
      const handleProductCreated = () => {
        // Yeni ürün oluşturulduğunda veya güncellendiğinde bu fonksiyonu çağırın
        setIsProductCreated(true);
      };
    
      useEffect(() => {
        // isProductCreated state'i değiştiğinde ProductTable yeniden render edilecek
        if (isProductCreated) {
          setIsProductCreated(false); // State'i sıfırla
        }
      }, [isProductCreated]);
    return(
        <div style={{ marginLeft: '250px' }}>
        <Button onClick={handleCreateProductClick}>Create Product</Button>
        {open && <CreateProduct  status={open} setOpen={setOpen} onProductCreated={handleProductCreated}/>} 
        <ProductTable change={isProductCreated}/>
      </div>
    )
}