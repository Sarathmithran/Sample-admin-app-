import { URL, header } from "./constants";

export class ProductServices{
    static getProducts = async () => {
        try{
            let productsResponse = await fetch(`${URL}/products`, {
            method: "GET",
            headers: header,
            });
            const data = await productsResponse.json();
            return data.data;
        }catch(error){
            console.log('Something wrong',error);   
        }
    }

    static deleteProduct = async (id:string) => {
        try {
          const response = await fetch(`${URL}/products/${id}`, {
            method: 'DELETE',
            headers: header,
          });
          return response;
        } catch (error) {
          console.error('Error adding new product:', error);
        }
      }

      static editProduct = async (id:string,title:string,price:number,description:string) => {
        const updatedData = {
            product: {
              name: title,
              price: price,
              description: description
            },
          };
        try {
          const response = await fetch(`${URL}/products/${id}`, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(updatedData),
          });
          return response.json();
        } catch (error) {
          console.error('Error editing product:', error);
        }
      }

      static addNewProduct = async (name:string,price:number,description:string) => {
        const productData = {
            product: {
                name: name,
                price: price,
                description: description,
            }
        };
        try {
          const response = await fetch(`${URL}/products`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(productData),
          });
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error adding new product:', error);
        }
      }
}