"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddProducts from '../AddProducts/AddProducts';
import { Box, Skeleton, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { fetchProducts } from '@/redux/slice/product-slice';
import { DeleteOutline, EditNoteOutlined } from '@mui/icons-material';
import Image from 'next/image';
import DeleteAlert from '../DeleteAlert/DeleteAlert';
import EditProduct from '../EditProduct/EditProduct';
import MsgAlert from '../MsgAlert/MsgAlert';

interface Column {
  id: 'name' | 'price' | 'image' | 'id'|'description' |'actions';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'id', label: 'ID', minWidth: 200 },
  { id: 'image', label: 'Image', minWidth: 200 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' }
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function ProductList() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteProd, setDeleteProd] = React.useState<boolean>(false);
  const [editProduct, setEditProduct] = React.useState<boolean>(false);
  const [prodDeleteMsg, setProdDeleteMsg] = React.useState<boolean>(false);
  const [prodEditedMsg, setProdEditedMsg] = React.useState<boolean>(false);
  const [deleteProductId, setDeleteProductId] = React.useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const producstDeleted = useSelector((state:RootState) => {
    return state.product.productDeleted;
  });

  const producstEdited = useSelector((state:RootState) => {
    return state.product.productEdited;
  });

  React.useEffect(()=>{
    dispatch(fetchProducts());
  },[producstDeleted, producstEdited]);

  const producstData = useSelector((state:RootState) => {
    return state.product.products;
  })

  const isLoding = useSelector((state:RootState)=>{
    return state.product.isLoading;
  })
  

  return (
    <>
    {isLoding ? (
      <Box sx={{ width: '100%'}}>
        <Skeleton sx={{ width: '100%', height: '25vh'}}/>
        <Skeleton animation="wave" sx={{ width: '100%', height: '25vh'}}/>
        <Skeleton animation={false} sx={{ width: '100%', height: '25vh'}}/>
      </Box>    
    )
    :
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography gutterBottom variant="h5" component="div" sx={{ padding: 2,display:'flex',justifyContent:'space-between' }}>
        Product List <AddProducts/>
      </Typography> 
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {producstData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                        if (column.id === 'image') {
                            return (
                                <TableCell key={column.id} align={column.align}>
                                    <Image src={row?.image?.url} width={60} height={60} alt='Image' />
                                </TableCell>
                            );
                        } else {
                            const value = column.id === 'price' ? row[column.id].formatted_with_symbol : row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                    {column.format ? column.format(value) : value}
                                    {column.id === 'actions' && <><Tooltip title="Delete"><DeleteOutline onClick={() => {setDeleteProd(true),setDeleteProductId(row.id)}} style={{ cursor: 'pointer' }} /></Tooltip> <Tooltip title="Edit"><EditNoteOutlined onClick={() => {setEditProduct(true),setDeleteProductId(row.id)}} style={{ cursor: 'pointer' }} /></Tooltip></>}
                                </TableCell>
                            );
                        }
                    })}
                    </TableRow>
                );
              })}
              {
                  deleteProd ? <DeleteAlert setDeleteProd={setDeleteProd} setProdDeleteMsg={setProdDeleteMsg} deleteProductId={deleteProductId}/> : ''
              }
              {
                  editProduct ? <EditProduct setEditProduct={setEditProduct} setProdEditedMsg={setProdEditedMsg} deleteProductId={deleteProductId}/> : ''
              }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={producstData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {
        prodDeleteMsg && (<MsgAlert DeleteMsg={prodDeleteMsg} msg={'Product deleted successfully'}/>)
      }
      {
        prodEditedMsg && (<MsgAlert DeleteMsg={prodEditedMsg} msg={'Product Edited successfully'}/>)
      }
    </Paper>
    }
    </>
  );
}