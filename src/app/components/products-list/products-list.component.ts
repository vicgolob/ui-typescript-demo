import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product';
import { InMemoryDataService } from '../../in-memory-data.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('1000ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [ProductService],
  animations: [listAnimation]
})
export class ProductsListComponent implements OnInit, OnChanges {
  @Input()
  incomingProduct: Product = {};

  products: Product[] = [];
  editingProduct: Product = {};
  editing: Boolean = false;

  constructor(private productService: ProductService, private dataService: InMemoryDataService) { }

  ngOnChanges() {
    if (this.incomingProduct) {
      this.products = [
        {
          id: this.dataService.genId(this.products),
          ...this.incomingProduct
        },
        ...this.products
      ];
    }
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products.reverse();
    });
  }

  deleteProduct(event, product): void {
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product)
      .subscribe();
  }

  editProduct(event, product) {
    this.editing = !this.editing;
    this.editingProduct = product;
  }

  updateProduct() {
    this.productService.updateProduct(this.editingProduct)
      .subscribe(() => {
        this.editingProduct = {} as Product;
        this.editing = false;
      })
  }

}
