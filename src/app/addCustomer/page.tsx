'use client'
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'
import { useRouter } from 'next/navigation'
import { addCustomer } from '@/redux/slice/customers-slice'
import MsgAlert from '../components/MsgAlert/MsgAlert'
import BackBtn from '../components/BackBtn/BackBtn'

const AddCustomerPage = () => {

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone,setPhone] = useState<string>('');
  const [customerAddMsg,setCustomerAddMsg] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleAddCustomer = async () => {
    try{
      if(!firstName || !lastName || !email || !phone){
        alert('Please fill all fields');
      }else{
        dispatch(addCustomer({ fName:firstName, lName:lastName, email, phone }));
        setTimeout(()=>{
            setCustomerAddMsg(true);
        },1500);
        setTimeout(()=>{
            setCustomerAddMsg(false);
        },4500);
        setTimeout(()=>{
          router.push('/customers');
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
        <BackBtn BtnName={'customers'}/>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Add New Customer
            </Typography>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              multiline
              required
            />
            <TextField
              label="Email"
              fullWidth
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Phone"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
              required
            />
            <Grid style={{textAlign:'center'}}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddCustomer()}
                style={{ marginTop: 20,marginRight:20}}
              >
                Submit 
              </Button>
            </Grid>
          </Paper>
        </Grid>
        { customerAddMsg && (
                  <MsgAlert DeleteMsg={customerAddMsg} msg={'Customer added successfully'}/>
              )}
      </Box>
    </Box>
  )
}

export default AddCustomerPage