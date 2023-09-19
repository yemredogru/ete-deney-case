import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';
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

export default function CreateCompany({status,setOpen,onCompanyCreated}){
  const [name,setName]=useState("")
  const [legalNumber,setLegalNumber]=useState("")
  const [incorporationCountry,setIncorporationCountry]=useState("")
  const [website,setWebsite]=useState("")
    const handleClose = () => {
        setOpen(false);
      };
    const addCompany=async()=>{
      const postData = {
        name: name,
        legalNumber: legalNumber,
        incorporationCountry:incorporationCountry,
        website:website
      };
      
      // Perform the POST request using Axios
      await axios.post('http://localhost:80/company/add-company', postData)
        .then(response => {
          // Handle the successful response here
          
          console.log('Response:', response.data);
          toast.success("Product added successfully")
          onCompanyCreated()
        })
        .catch(error => {
          // Handle any errors that occur during the POST request
          console.error('Error:', error);
        });
    }
    const checkNameExists=()=>{

    }

    return(
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
                            label="Company Name"
                            id="outlined-size-small"
                            onChange={(e)=>setName(e.target.value)}
                            style={{marginTop: '10px'}}
                            size="small"
                           />
                           <TextField
                            label="Company Legal Number"
                            id="outlined-size-small"
                            onChange={(e)=>setLegalNumber(e.target.value)}
                            style={{marginTop: '10px'}}
                            size="small"
                           />
                           <TextField
                            label="Incorporation Country"
                            id="outlined-size-small"
                            onChange={(e)=>setIncorporationCountry(e.target.value)}
                            style={{marginTop: '10px'}}
                            size="small"
                           />
                           <TextField
                            label="Company Website"
                            id="outlined-size-small"
                            onChange={(e)=>setWebsite(e.target.value)}
                            style={{marginTop: '10px'}}
                            size="small"
                           />
          <Stack spacing={2} direction="row">
                       <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                       <Button variant="contained" onClick={addCompany}>Save</Button>
                     </Stack>
        </Box>
      </Modal>
        </div>
    )
}