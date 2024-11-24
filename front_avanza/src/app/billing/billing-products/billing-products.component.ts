import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../commons/model/interfaces";
import {RecordService} from "../services/record.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../admin/services/product-service";

@Component({
  selector: 'app-billing-products',
  templateUrl: './billing-products.component.html',
  styleUrls: ['./billing-products.component.css']
})
export class BillingProductsComponent implements OnInit {

  _codigo?: number;
  _products: Product[] = [];
  _dataTable: MatTableDataSource<Product> = new MatTableDataSource<Product>()

  constructor(
    private _productsService: ProductService,
    private _recordService: RecordService,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
  }

  getProduct() {

    if (this._codigo != undefined && this._codigo > 0) {
      this._recordService.getProductByCode(this._codigo).subscribe({
        next: (response) => {
          if (response.data) {
            this._products = [response.data]
            this._dataTable.data = this._products;
          } else {
            console.log("No se encontro el producto");
          }
        },
        error: err => {
          this.snackBarOpen("No se encontro el producto");
          console.log(err);
        }
      });
    }
  }

  snackBarOpen(message: string) {
    this._snackBar.open(message, 'Cerrar', {duration: 3000});
  }
}
