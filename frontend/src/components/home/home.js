import { useEffect,useState } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import axios from "axios";

export default function HomeData(){
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:80/company/dashboard-data'); // API endpointini buraya ekleyin
          setData(response.data.message); // Verileri state'e kaydedin
          setLoading(false)
        } catch (error) {
          console.error('Veri alma hatası:', error);
        }
      };
    
      // İlk render'da verileri getirin
      useEffect(() => {
        fetchData();
      }, []);

    return loading ? "loading...":(
        <div style={{display:'flex',flexDirection:'row'}}>
         
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <h2>Latest Added Companies</h2>
          {data.latest_companies.map((item, index) => {
               return  <ListItem key={index}>
               <ListItemAvatar>
                 <Avatar>
                   <ImageIcon />
                 </Avatar>
               </ListItemAvatar>
               <ListItemText primary={item.name} secondary={item.createdAt} />
             </ListItem>;
             })}

     </List>
     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
     <h2>Total Company Count : {data.company_count}</h2>

     </List>
     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
     <h2>Total Product Count : {data.products.length}</h2>

     </List>
   
        </div>
     )
}