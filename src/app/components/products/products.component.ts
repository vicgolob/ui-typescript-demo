import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  incomingProduct: Product;
  constructor() { }

  ngOnInit() {}

  updateProductsList(newProduct: Product) {
    this.incomingProduct = newProduct;
  }

}
