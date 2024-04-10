'use client'
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, useTheme, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { addProduct } from '@/redux/slice/product-slice';
import ProductAddMsg from '../components/ProductAddMsg/ProductAddMsg';
import Navbar from '../components/Navbar/Navbar';



const AddProductPage = () => {

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [productAddMsg,setProductAddMsg] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const theme = useTheme()

  const handleAddProduct = async () => {
    try{
      if(!title || !description || price <= 0){
        alert('Please fill all fields');
      }else{
        dispatch(addProduct({ title, price, description}));
        setTimeout(()=>{
          setProductAddMsg(true);
        },1500);
        setTimeout(()=>{
          setProductAddMsg(false);
        },4500);
        setTimeout(()=>{
          router.push('/products');
        },5000)
      }
    }catch(error){
        console.log('something wrong',error);  
    } 
  }
    
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar/>
      <Box component="main" sx={{ flexGrow: 1, pt: 12,paddingLeft:3,paddingRight:3 }}>
      <Grid sx={{height:'100vh',backgroundColor:theme.palette.primary.dark}}>
      <Grid container justifyContent="center" spacing={2} style={{margin:0,paddingTop:30,paddingBottom:30}}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Add New Product
            </Typography>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              label="Price"
              fullWidth
              type="number"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              margin="normal"
              required
            />
            <Grid style={{textAlign:'center'}}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddProduct()}
                style={{ marginTop: 20,marginRight:20}}
              >
                Submit 
              </Button>
            </Grid>
          </Paper>
        </Grid>
        {productAddMsg && (
                  <ProductAddMsg productAddMsg={productAddMsg}/>
              )}
      </Grid>
      </Grid>
      </Box>
    </Box>
  );
};

export default AddProductPage;