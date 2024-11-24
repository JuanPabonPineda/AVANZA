import {Component, OnInit} from '@angular/core';
import {MatTabChangeEvent} from "@angular/material/tabs";
import {ProductService} from "../services/product-service";
import {Product} from "../../commons/model/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  _products: Product[] = [];
  _dataTable: MatTableDataSource<Product> = new MatTableDataSource<Product>()

  constructor(
    private _productsService: ProductService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  saveNewProduct(product: Product) {
    const currentDay = this.datePipe.transform(new Date(), "yyyy-MM-dd")

    if (currentDay != null) {
      product.creationDate = currentDay;
      product.modificationDate = currentDay;
    }

    this._productsService.createProduct(product).subscribe({
      next: (response) => {
        this.modalResponse(response.message, 'success');
      },
      error: (error) => {
        this.modalResponse(error.error.message, 'error');
      }
    });
  }

  getProducts(): any {
    this._productsService.getProducts().subscribe({
      next: (response) => {
        this._products = response.data
        this._dataTable.data = this._products;
      },
      error: (error) => {

        console.log(error);
      }
    });
  }

  updateProduct(prduct: Product): any {
    if (prduct) {
      const currentDay = this.datePipe.transform(new Date(), "yyyy-MM-dd")
      if (currentDay != null) {
        prduct.modificationDate = currentDay;
      }
      this._productsService.updateProduct(prduct).subscribe({
        next: () => {
          this.getProducts();
          this.modalResponse("Se actualizo el producto exitosamente", 'success');
        },
        error: (error) => {
          console.log(error);
          this.modalResponse("Ocurrio un error" + error.message!, 'error')
        }
      });
    }
  }

  removeProduct(id: number): any {
    this._productsService.removeProduct(id).subscribe({
      next: (response) => {
        if (!response?.isError) {
          this.modalResponse(response?.message, 'success');
        } else {
          this.modalResponse(response?.message, 'error');
        }
        this.getProducts();
      },
      error: (error) => {
        console.log(error);
        this.modalResponse("Ocurrio un Error: " + error.message!, 'error');
      }
    });
  }

  /** Filtro de busqueda **/
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this._dataTable.filter = filterValue;

    if (this._dataTable.paginator) {
      this._dataTable.paginator.firstPage();
    }
  }

  /** Evento al cambiar de tap**/
  tabFn(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.getProducts();
    }
  }

  modalResponse(message: string, icon: 'success' | 'error') {
    Swal.fire({
      icon: icon,
      title: icon == 'success' ? "Exitoso" : "Error",
      text: message ?? "",
      showConfirmButton: false,
      timer: 3000
    });
  }
}
