export interface IProduct {
    id:          number;
    name:       string;
    description: string;
    price:       number;
    images:      string[];
    category:    string;
    isActive:    boolean;
}