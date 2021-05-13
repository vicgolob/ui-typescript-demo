import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product';
import { InMemoryDataService } from '../../in-memory-data.service';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

const listAnimation = trigger('listAnimation', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateX(-100%)' }),
		animate('500ms', style({ opacity: 1, transform: 'translateX(0)' })),
	]),
	transition(':leave', [
		animate('500ms', style({ opacity: 0, transform: 'translateX(100%)' })),
	]),
]);

const editorAnimation = trigger('editorAnimation', [
	transition(':enter', [
		style({ opacity: 0 }),
		animate('200ms', style({ opacity: 1 })),
	]),
	transition(':leave', [
		animate('200ms', style({ opacity: 0, display: 'none' })),
	]),
]);

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [ProductService],
  animations: [listAnimation, editorAnimation]
})
export class ProductsListComponent implements OnInit, OnChanges {
  @Input()
  incomingProduct: Product = {} as Product;

  products: Product[] = [];
  editingProduct: Product = {} as Product;
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

  cancelEdit() {
    this.editing = !this.editing;
    this.editingProduct = {} as Product;
  }

  updateProduct() {
    this.productService.updateProduct(this.editingProduct)
      .subscribe(() => {
        this.editingProduct = {} as Product;
        this.editing = false;
      })
  }

}
