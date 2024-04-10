export interface Product {
    image: any;
    id: string;
    name: string;
    description: string;
    price: {
      raw: number;
      formatted: string;
      formatted_with_symbol: string;
      formatted_with_code: string;
    }
}