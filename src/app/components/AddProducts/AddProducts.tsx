"use client"
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const AddProducts = () => {

    const router = useRouter();

  return (
    <>
    <Button variant='contained' onClick={()=>router.push('/addProducts')}>Add Products<AddIcon/></Button>
    </>
  )
}

export default AddProducts