import {AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {Product} from "../../../commons/model/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogProductEditComponent
} from "../dialogs/dialog-product-edit/dialog-product-edit/dialog-product-edit.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit, AfterViewInit {

  @Input() dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  @Output() onEditProduct = new EventEmitter<Product>();
  @Output() onRemoveProduct = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<boolean>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = [];

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const rol: string = localStorage.getItem("rol")?? "";
    if (rol == "Admin") {
      this.displayedColumns = ['id', 'reference', 'brand', 'price', 'category', 'stocks', 'discount', 'status', 'edit', 'delete'];
    } else {
      this.displayedColumns = ['id', 'reference', 'brand', 'price', 'category', 'stocks', 'discount', 'status'];
    }
  }

  /** Abré dialog para editar producto **/
  openDialogEdit(productEdit: Product) {
    const dialogRef = this.dialog.open(DialogProductEditComponent, {
      data: productEdit
    });

    const subscription = dialogRef.componentInstance.onEditProduct.subscribe(
      (product) => {
        subscription.unsubscribe();
        this.onEditProduct.emit(product);
        dialogRef.close();
      }
    );
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Confirmación',
      text: "El prodcuto se eliminara por completo ¿Esta seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onRemoveProduct.emit(id);
      }
    });
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
}
