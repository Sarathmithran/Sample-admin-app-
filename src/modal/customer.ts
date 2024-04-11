// types.ts

export interface Customer {
    id: string;
    external_id: string | null;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    meta: Record<string, any> | null;
    created: number;
    updated: number;
  }
  
  export interface CustomerListData {
    data: Customer[];
    meta: {
      pagination: {
        total: number;
        count: number;
        per_page: number;
        current_page: number;
        total_pages: number;
        links: string[];
      };
    };
  }
  export interface CustomerState {
    customer:Customer[];
    order: any[]; 
    error: any;
    isLoading: boolean;
    customerDeleted: number;
    customerEdited:{}
  }  

  export interface CustomerCreateInputData{
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  }