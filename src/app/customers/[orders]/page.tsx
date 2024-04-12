'use client'
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store/store';
import { fetchCustomerOrders } from '@/redux/slice/customers-slice';
import LoadingSkeleton from '@/app/components/LoadingSkelton/LoadingSkeleton';
import BackBtn from '@/app/components/BackBtn/BackBtn';

interface Column {
    id: 'id' | 'client_details' | 'status_payment' | 'order_value';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'Order ID', minWidth: 100 },
    { id: 'client_details', label: 'Country Name', minWidth: 100 },
    { id: 'status_payment', label: 'Payment status', minWidth: 100 },
    { id: 'order_value', label: 'Total amount', minWidth: 100, align: 'center' }
];

const Orders = (props: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const customerId = props.params.orders;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const customerData = useSelector((state: RootState) => {
        return state.customer.customer;
    });

    const orders = useSelector((state: RootState) => {
        return state.customer.order;
    });

    useEffect(() => {
        dispatch(fetchCustomerOrders(customerId));
    }, []);

    const isLoading = useSelector((state: RootState) => {
        return state.customer.isLoading;
    });

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1, pt: 12, paddingLeft: 3, paddingRight: 3 }}>
                    {isLoading ? (
                        <LoadingSkeleton/>
                    ) : (
                        <>
                            <BackBtn BtnName={'customers'}/>
                            {orders ? (
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                                                {orders
                                                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    ?.map((row) => {
                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                {columns.map((column) => {
                                                                    let value;
                                                                    if (column.id === 'client_details') {
                                                                        value = row[column.id].country_name;
                                                                    } else if (column.id === 'order_value') {
                                                                        value = row[column.id].formatted_with_symbol;
                                                                    } else {
                                                                        value = row[column.id];
                                                                    }
                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            {column.format && typeof value === 'number'
                                                                                ? column.format(value)
                                                                                : value}
                                                                        </TableCell>
                                                                    );
                                                                })}
                                                            </TableRow>
                                                        );
                                                    })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={orders?.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            ) : (
                                <Box sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>
                                    There are currently no orders placed.
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default Orders;
