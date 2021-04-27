import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Product } from '../models/product';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class ProductService {
  producstAPI = 'api/products';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('ProductsService');
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.producstAPI)
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.producstAPI, product, httpOptions)
      .pipe(
        catchError(this.handleError('addProduct', product))
      );
  }

  deleteProduct(product: Product): Observable<Product> {
    const url = `${this.producstAPI}/${product.id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteProduct'))
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.producstAPI}/${product.id}`;
    return this.http.put<Product>(url, product, httpOptions)
      .pipe(
        catchError(this.handleError('deleteProduct', product))
      );
  }

}
