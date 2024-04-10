import { ProductServices } from "@/app/services/product-services";
import { Product } from "@/modal/products";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProductState {
    products: Product[];
    isLoading: boolean;
    productDeleted:number;
    productEdited:{};
    error: any;
}

const initialState: ProductState = {
    products: [],
    isLoading: false,
    productDeleted:0,
    productEdited:{},
    error: null
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (thunkAPI) => {
        try{
            const response = await ProductServices.getProducts();
            return response;
        }catch(error){
            console.log('error !!',error);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId:string,thunkAPI) => {
        try{
            const response = await ProductServices.deleteProduct(productId);
            // return response;
        }catch(error){
            console.log('error !!',error);
        }
    }
)

interface EditProductPayload {
    id: string;
    title: string;
    price: number;
    description:string
  }
export const editProduct = createAsyncThunk(
    'products/editProduct',
    async ({ id, title, price, description }: EditProductPayload, thunkAPI) => {
      try {
        const response = await ProductServices.editProduct(id, title, price, description);
        return response;
      } catch (error) {
        console.error('Error editing product:', error);
        // Throwing the error here will automatically reject the action
        throw error;
      }
    }
  );


  interface AddProductPayload {
    title: string;
    description:string;
    price: number;
  }
  export const addProduct = createAsyncThunk(
    'products/addProduct',
    async ({title, price, description }: AddProductPayload, thunkAPI) => {
      try {
        const response = await ProductServices.addNewProduct(title, price, description);
        return response;
      } catch (error) {
        console.error('Error occured, adding product:', error);
        // Throwing the error here will automatically reject the action
        throw error;
      }
    }
  );

export const productSlice = createSlice({
    name:'products',
    initialState,
    reducers: {},

    extraReducers(builder) {
        //fetchProducts
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        //deleteProduct
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.productDeleted += 1;
            state.isLoading = false;
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
         //editProduct
         builder.addCase(editProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.productEdited = action.payload;
            state.isLoading = false;
        })
        builder.addCase(editProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
         //addProduct
         builder.addCase(addProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addProduct.fulfilled, (state) => {
            state.isLoading = false;
        })
        builder.addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    },
})

export default productSlice.reducer;