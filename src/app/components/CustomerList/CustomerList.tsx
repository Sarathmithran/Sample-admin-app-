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
import { fetchCustomers } from '@/redux/slice/customers-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { Box, Button, Skeleton, Tooltip, Typography } from '@mui/material';
import { DeleteOutline, EditNoteOutlined } from '@mui/icons-material';
import DeleteCustomerAlert from '../CustomerDeleteAlert/DeleteCustomerAlert';
import MsgAlert from '../MsgAlert/MsgAlert';
import EditCustomer from '../EditCustomer/EditCustomer';
import AddCustomer from '../AddCustomer/AddCustomer';

interface Column {
  id: 'firstname' | 'lastname' | 'email' | 'phone' | 'actions' | '';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'firstname', label: 'First Name', minWidth: 120 },
  { id: 'lastname', label: 'Last Name', minWidth: 120 },
  {id: 'email', label: 'Email', minWidth: 100},
  {id: 'phone', label: 'Phone', minWidth: 100},
  {id: 'actions', label: 'Action', minWidth: 100},
  {id: '', label: '', minWidth: 100}
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


export default function CustomerList() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const [deleteCustomer, setDeleteCustomer] = React.useState<boolean>(false);
  const [editCustomer, setEditCustomer] = React.useState<boolean>(false);
  const [deleteCustomerId, setDeleteCustomerId] = React.useState<string>('');
  const [customerDeleteMsg, setCustomerDeleteMsg] = React.useState<boolean>(false);
  const [customerEditedMsg, setCustomerEditedMsg] = React.useState<boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const customerDeleted = useSelector((state:RootState) => {
    return state.customer.customerDeleted;
  })

  const customerEdited = useSelector((state:RootState) => {
    return state.customer.customerEdited;
  })

  const isLoading = useSelector((state:RootState) => {
    return state.customer.isLoading;
  })

  React.useEffect(()=>{
    dispatch(fetchCustomers());
  },[customerDeleted,customerEdited]);


  const customerstData = useSelector((state:RootState) => {
    return state.customer.customer;
  })

  return (
    <>
    {isLoading ? (
      <Box sx={{ width: '100%'}}>
        <Skeleton sx={{ width: '100%', height: '25vh'}}/>
        <Skeleton animation="wave" sx={{ width: '100%', height: '25vh'}}/>
        <Skeleton animation={false} sx={{ width: '100%', height: '25vh'}}/>
      </Box>    
    )
    :
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography gutterBottom variant="h5" component="div" sx={{ padding: 2,display:'flex',justifyContent:'space-between' }}>
        Customers List <AddCustomer/>
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
            {customerstData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                            {column.id === 'actions' && <><Tooltip title="Delete"><DeleteOutline onClick={() => {setDeleteCustomer(true),setDeleteCustomerId(row.id)}} style={{ cursor: 'pointer' }} /></Tooltip> <Tooltip title="Update"><EditNoteOutlined onClick={() => {setEditCustomer(true), setDeleteCustomerId(row.id)}}  style={{ cursor: 'pointer' }} /></Tooltip></>}
                            {column.id === '' && <Button variant='contained'>Orders</Button>}
                        </TableCell>
                    );
                    })}
                  </TableRow>
                );
              })}
              {
                  deleteCustomer ? <DeleteCustomerAlert setDeleteCustomer={setDeleteCustomer} setCustomerDeleteMsg={setCustomerDeleteMsg} deleteCustomerId={deleteCustomerId} /> : ''
              }
              {
                    editCustomer ? <EditCustomer setEditCustomer={setEditCustomer} setCustomerEditedMsg={setCustomerEditedMsg} editCustomerId={deleteCustomerId}/> : ''
              }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={customerstData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {
        customerDeleteMsg && (<MsgAlert DeleteMsg={customerDeleteMsg} msg={'Customer deleted successfully'}/>)
      }
      {
        customerEditedMsg && (<MsgAlert DeleteMsg={customerEditedMsg} msg={'Customer edited successfully'}/>)
      }
    </Paper>
    }
    </>
  );
}

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
