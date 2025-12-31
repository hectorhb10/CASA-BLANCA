export interface Product {
    id: number;             
    name: string;            
    category: string;       
    type: string;
    price: number;
    size: number;
    quantity: number;
    unit: "liter" | "piece";    
    shortDescription: string;
    description: string;    
    image: string;           
    inStock: boolean;
    isNew: boolean;
}
