import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { response } from 'src/app/redux/products/products.types';
import { ProductsService } from 'src/app/services/products.service';
import { setProducts } from 'src/app/redux/products/products.actions';
import { DashboardService } from 'src/app/services/dashboard.service';
interface Product {
  _id: string;
  name: string;
  thumbnail: string;
  pictures: string;
  slag: string;
  price: string;
  quantity: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private store: Store<{
      products: response;
    }>,
    private productService: ProductsService,
    private dashboardService: DashboardService
  ) {}
  listOfData: Product[] = [];
  totalProducts = 0;
  ngOnInit(): void {
    this.productService
      .getProducts()
      .then((products) => {
        this.store.dispatch(
          setProducts({ isLoading: false, error: false, data: products.data })
        );
      })
      .catch((err) => {
        console.log('error: ' + err);
        this.store.dispatch(
          setProducts({ isLoading: false, error: true, data: [] })
        );
      });
    this.store.select('products').subscribe((data) => {
      if (data.data['products']) {
        this.listOfData = data.data['products'] as Product[];
      }

      this.dashboardService
        .getInventory()
        .then((resp) => {
          this.totalProducts = resp.data['products'];
        })
        .catch((err) => {
          this.totalProducts = -1;
          console.log('error: ', err.message);
        });
    });
  }

  deleteProduct(productId: string): void {
    // this.router.navigate(['products']);

    this.productService
      .deleteProduct(productId)
      .then((resp) => {
        console.log('product deleted successfully');
        this.ngOnInit();
      })
      .catch((err) => {
        console.log('Unable to delete product: ' + err.message);
      });
  }
}
