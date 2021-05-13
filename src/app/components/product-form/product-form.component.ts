import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: [ProductService]
})
export class ProductFormComponent implements OnInit {

  constructor(private productService: ProductService) { }

  product = {} as Product;
  @Output()
  newProductAdded = new EventEmitter<Product>();

  ngOnInit() {
  }

  addProduct(): void {
    if (this.product.name && this.product.price && this.product.description) {
      this.productService.addProduct(this.product)
        .subscribe(product => {
          this.newProductAdded.emit(this.product);
          this.product = {} as Product;
        })
    }
  }

}
