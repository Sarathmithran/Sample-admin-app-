import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { deleteCustomer } from '@/redux/slice/customers-slice';

export default function DeleteCustomerAlert(props:any) {

  const {setDeleteCustomer, deleteCustomerId, setCustomerDeleteMsg } = props;
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    setOpen(false);
    setDeleteCustomer(false);
  };

  const handleDeleteCustomer = () => {
    try{
      dispatch(deleteCustomer(deleteCustomerId));
      setCustomerDeleteMsg(true); 
    }catch(error){
      console.log('something went wrong',error);
    }finally{
      setTimeout(()=>{
        setCustomerDeleteMsg(false);
      },4500);
    }
  }
  
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this customer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {handleClose(),handleDeleteCustomer()}} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}