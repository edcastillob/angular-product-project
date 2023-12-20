
  
// Definición de la interfaz Product
export interface Product {
    id: number | string;
    name: string;
    price: number;
    description: string;
  }  

  export const ProductsList: Product[] = [
    { id: 1, name: "Filtro de aceite", price: 12.99, description: "Mantiene el aceite del motor limpio y libre de impurezas." },
    { id: 2, name: "Pastillas de freno", price: 29.99, description: "Proporciona una frenada eficiente y segura." },
    { id: 3, name: "Batería de coche", price: 89.99, description: "Suministra energía eléctrica para arrancar el motor y alimentar sistemas eléctricos." },
    { id: 4, name: "Lámpara de faro", price: 8.49, description: "Proporciona iluminación para una conducción segura durante la noche." },
    { id: 5, name: "Aceite sintético (5L)", price: 34.99, description: "Aceite de alta calidad para lubricar y proteger el motor." },
    { id: 6, name: "Filtro de aire", price: 9.99, description: "Evita que partículas de suciedad entren al sistema de admisión del motor." },
    { id: 7, name: "Bujías de encendido (juego de 4)", price: 14.99, description: "Genera la chispa necesaria para encender la mezcla de aire y combustible." },
    { id: 8, name: "Limpiaparabrisas", price: 11.49, description: "Mantiene el parabrisas claro de agua y suciedad para una visibilidad óptima." },
    { id: 9, name: "Correa de transmisión", price: 18.99, description: "Transmite la potencia del motor a otros componentes del vehículo." },
    { id: 10, name: "Termostato", price: 15.99, description: "Regula la temperatura del motor controlando el flujo de líquido refrigerante." },
    { id: 11, name: "Amortiguadores (par)", price: 79.99, description: "Proporciona una conducción suave y controla la oscilación del vehículo." },
    { id: 12, name: "Sensor de oxígeno", price: 45.99, description: "Monitorea la concentración de oxígeno en los gases de escape para optimizar la combustión." },
  ];
  

  
  