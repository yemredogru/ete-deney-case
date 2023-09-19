import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateProduct({ status, setOpen,onProductCreated }) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [amountUnit, setAmountUnit] = useState("")
  const [company, setCompany] = useState("")
  const [data, setData] = useState([])
  const handleClose = () => {
    setOpen(false);
  };
  const addCompany = async () => {
    const postData = {
      name: name,
      category: category,
      amount: amount,
      amountUnit: amountUnit,
      company: company

    };

    // Perform the POST request using Axios
    await axios.post('http://localhost:80/product/add-product', postData)
      .then(response => {
        // Handle the successful response here

        console.log('Response:', response.data);
        toast.success("Product added successfully")
        onProductCreated()
      })
      .catch(error => {
        // Handle any errors that occur during the POST request
        console.error('Error:', error);
      });
  }
  const checkNameExists = () => {

  }
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:80/company/all-companies'); // API endpointini buraya ekleyin
      setData(response.data.message); // Verileri state'e kaydedin
    } catch (error) {
      console.error('Veri alma hatası:', error);
    }
  };

  // İlk render'da verileri getirin
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Modal
        keepMounted
        open={status}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="Product Name"
            id="outlined-size-small"
            onChange={(e) => setName(e.target.value)}
            style={{ marginTop: '10px' }}
            size="small"
          />
          <TextField
            label="Amount"
            id="outlined-size-small"
            onChange={(e) => setAmount(e.target.value)}
            style={{ marginTop: '10px' }}
            size="small"
          />
          <TextField
            label="Amount Unit"
            id="outlined-size-small"
            onChange={(e) => setAmountUnit(e.target.value)}
            style={{ marginTop: '10px' }}
            size="small"
          />
          <TextField
            label="Category"
            id="outlined-size-small"
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginTop: '10px' }}
            size="small"
          />

            <InputLabel id='demo-simple-select-label'>Company</InputLabel>
            <Select 
            sx={{minWidth:"120px",marginTop:"10px",marginBottom:"10px"}}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Role'
              onChange={e => {
                setCompany(e.target.value)

              }}
            >
             {data.map((item, index) => (
  <MenuItem key={index} value={item._id}>
    {item.name}
  </MenuItem>
))} 
            </Select>
        
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={addCompany}>Save</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}