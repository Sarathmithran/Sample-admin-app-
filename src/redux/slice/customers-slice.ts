import { CustomerServices } from "@/app/services/customer-services";
import { CustomerState } from "@/modal/customer";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState:CustomerState = {
    customer:[],
    order:[],
    error:null,
    isLoading:false,
    customerDeleted:0,
    customerEdited:{}
  };

    export const fetchCustomers = createAsyncThunk(
        'customers/fetchCustomers',
        async (thunkAPI) => {
            try{
                const response = await CustomerServices.getCustomers();
                return response;
            }catch(error){
                console.log('error !!',error);
            }
        }
    )

    export const deleteCustomer = createAsyncThunk(
        'customers/deleteCustomer',
        async (customerId:string,thunkAPI) => {
            try{
                const response = await CustomerServices.deleteCustomer(customerId);
                return response;
            }catch(error){
                console.log('error !!',error);
            }
        }
    )

    interface EditCustomerPayload {
        id: string;
        Fname: string;
        Sname: string;
        email: string;
        phone: string;
      }
    export const editCustomer = createAsyncThunk(
        'products/editCustomer',
        async ({ id, Fname, Sname, email, phone }: EditCustomerPayload, thunkAPI) => {
          try {
            const response = await CustomerServices.editCustomer(id, Fname, Sname, email, phone);
            return response;
          } catch (error) {
            console.error('Error !!', error);
            // Throwing the error here will automatically reject the action
            throw error;
          }
        }
      );

  export const customerSlice = createSlice({
    name:'customers',
    initialState,
    reducers: {},

    extraReducers(builder) {
        //fetchCustomers
        builder.addCase(fetchCustomers.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.customer = action.payload;
        })
        builder.addCase(fetchCustomers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        //deleteCustomer
        builder.addCase(deleteCustomer.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteCustomer.fulfilled, (state) => {
            state.isLoading = false;
            state.customerDeleted += 1;
        })
        builder.addCase(deleteCustomer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        //editCustomer
        builder.addCase(editCustomer.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(editCustomer.fulfilled, (state,action) => {
            state.isLoading = false;
            state.customerEdited = action.payload;
        })
        builder.addCase(editCustomer.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    },
  });

  export default customerSlice.reducer;