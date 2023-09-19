import { useEffect, useState } from "react"
import CreateCompany from "../components/companies/CompanyForm"
import EnhancedTable from "../components/companies/CompanyTable"
import { Button } from "antd"

export default function CompanyPage(){
    const [open,setOpen]=useState(false)
    const [isCompanyCreated, setIsCompanyCreated] = useState(false);
    const handleCreateCompanyClick = () => {
        setOpen(true);
      };
      const handleCompanyCreated = () => {
        // Yeni ürün oluşturulduğunda veya güncellendiğinde bu fonksiyonu çağırın
        setIsCompanyCreated(true);
      };
    
      useEffect(() => {
        // isProductCreated state'i değiştiğinde ProductTable yeniden render edilecek
        if (isCompanyCreated) {
          setIsCompanyCreated(false); // State'i sıfırla
        }
      }, [isCompanyCreated]);
    return(
        <div style={{ marginLeft: '250px' }}>
        <Button onClick={handleCreateCompanyClick}>Create Company</Button>
        {open && <CreateCompany status={open} setOpen={setOpen} onCompanyCreated={handleCompanyCreated} />}
        <EnhancedTable change={isCompanyCreated}/>
      </div>
    )
}