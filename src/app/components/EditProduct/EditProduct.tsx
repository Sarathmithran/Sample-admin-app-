'use client'
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { editProduct } from '@/redux/slice/product-slice';

const EditProduct = (props:any) => {

  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
    
  const {setEditProduct, setProdEditedMsg} = props;  
  const editProductId = props.deleteProductId;

  const handleClose = () => {
    setOpen(false);
    setEditProduct(false);
  };

  const handleEditProduct = () => {
    if(!title || price <= 0 || !description){
      alert('Please fill all fields !!')
    }else{
      dispatch(editProduct({ id: editProductId, title, price, description }));
      setProdEditedMsg(true);
      setTimeout(()=>{
        setProdEditedMsg(false);
      },4500);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            type='number'
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{handleClose(),handleEditProduct()}}  color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProduct;
