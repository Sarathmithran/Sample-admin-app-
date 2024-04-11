import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

const AddCustomer = () => {
    const router = useRouter();

    return (
      <>
      <Button variant='contained' onClick={()=>router.push('/addCustomer')}>Add Customer<AddIcon/></Button>
      </>
    )
}

export default AddCustomer