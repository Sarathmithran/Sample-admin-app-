'use client'
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { editCustomer } from '@/redux/slice/customers-slice';

const EditCustomer = (props:any) => {

  const [open, setOpen] = useState(true);
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
    
  const {setEditCustomer, editCustomerId, setCustomerEditedMsg} = props;  

  const handleClose = () => {
    setOpen(false);
    setEditCustomer(false);
  };

  const handleEditCustomer = () => {
    if(!firstname || !lastname || !email || !phone){
      alert('Please fill all fields !!')
    }else{
      dispatch(editCustomer({ id: editCustomerId, Fname:firstname,  Sname:lastname, email, phone }));
      setCustomerEditedMsg(true);
      setTimeout(()=>{
        setCustomerEditedMsg(false);
      },4500);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{handleClose(),handleEditCustomer()}}  color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCustomer;
