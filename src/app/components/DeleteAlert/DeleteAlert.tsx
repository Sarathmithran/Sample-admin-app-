import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { deleteProduct } from '@/redux/slice/product-slice';

export default function DeleteAlert(props:any) {

  const {setDeleteProd, deleteProductId, setProdDeleteMsg} = props;
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    setOpen(false);
    setDeleteProd(false);
  };

  const handleDeleteProduct = () => {
    try{
      dispatch(deleteProduct(deleteProductId));
      setProdDeleteMsg(true); 
    }catch(error){
      console.log('something went wrong',error);
    }finally{
      setTimeout(()=>{
        setProdDeleteMsg(false);
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
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {handleClose(),handleDeleteProduct()}} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}