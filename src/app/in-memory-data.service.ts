import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      {
        id: 11,
        name: 'Deco - Cuadro Frases',
        description: 'Cuadro con frases chulas',
        price: 400,
      },
      {
        id: 12,
        name: 'Deco - Portaretrato',
        description: 'Un hermoso portaretrato con bordes cromados',
        price: 450,
      },
      {
        id: 13,
        name: 'Deco - Carpeta diseño',
        description: 'Carpeta con diseño hecho en la India',
        price: 800,
      },
    ];
    return { products };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the products array is empty,
  // the method below returns the initial number (11).
  // if the products array is not empty, the method below returns the highest
  // hero id + 1.
  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }
}
