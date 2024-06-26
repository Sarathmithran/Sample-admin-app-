import { URL, header } from "./constants";

export class CustomerServices{
    static getCustomers = async () => {
        try{
            let customersResponse = await fetch(`${URL}/customers`, {
            method: "GET",
            headers: header,
            });
            const data = await customersResponse.json();
            return data.data;
        }catch(error){
            console.log('Something wrong',error);   
        }
    }

    static deleteCustomer = async (id:string) => {
        try{
            await fetch(`${URL}/customers/${id}`, {
            method: "DELETE",
            headers: header,
            });
        }catch(error){
            console.log('Something wrong',error);   
        }
    }

    static editCustomer = async (id:string,Fname:string,Lname:string,email:string,phone:string) => {
        try {
          const response = await fetch(`${URL}/customers/${id}`, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify({
                firstname:Fname,
                lastname:Lname,
                email,
                phone
            }),
          });
          return response.json();
        } catch (error) {
          console.error('Error editing product:', error);
        }
      }

      static addNewCustomer = async (firstname:string, lastname:string, email:string, phone:string) => {
        try {
          const response = await fetch(`${URL}/customers`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                phone
            }),
          });
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error !!:', error);
        }
      }

      static getCustomerOrders = async (id:string) => {
        try{
            let orderResponse = await fetch(`${URL}/customers/${id}/orders`, {
            method: "GET",
            headers: header,
            });
            const data = await orderResponse.json();
            return data.data;
        }catch(error){
            console.log('Something wrong',error);   
        }
    }
}