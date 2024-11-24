import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {Product, ProductStatus} from "../../../../../commons/model/interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../../services/product-service";

@Component({
  selector: 'app-dialog-product-edit',
  templateUrl: './dialog-product-edit.component.html',
  styleUrls: ['./dialog-product-edit.component.css']
})
export class DialogProductEditComponent implements OnInit {

  public readonly onEditProduct = new EventEmitter<Product>();
  public productsForm: FormGroup = this._formBuilder.group({
    reference: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
    category: ['', [Validators.required]],
    stocks: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    discount: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
    status: [true, [Validators.required]],
    code: ['', [Validators.required]],
  })
  productStatus = ProductStatus;

  constructor(
    public dialogRef: MatDialogRef<DialogProductEditComponent>,
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
  }

  ngOnInit(): void {
    this.productsForm.patchValue({
      reference: this.data?.reference,
      brand: this.data?.brand,
      price: this.data?.price,
      category: this.data?.category,
      stocks: this.data?.stocks,
      creationDate: this.data?.creationDate,
      modificationDate: this.data?.modificationDate,
      discount: this.data?.discount,
      status: this.data?.status,
      code: this.data?.code,
    })
  }

  saveProduct(): FormGroup {
    if (!this.productsForm.valid) {
      return this.productsForm;
    }
    this.onEditProduct.emit({
      id: this.data?.id,
      reference: this.productsForm.value.reference!,
      brand: this.productsForm.value.brand!,
      price: this.productsForm.value.price!,
      category: this.productsForm.value.category!,
      stocks: this.productsForm.value.stocks!,
      discount: this.productsForm.value.discount!,
      status: this.productsForm.value.status!,
      code: this.productsForm.value.code!
    })
    return this.productsForm;
  }

  cancel() {
    this.productsForm.reset();
    this.dialogRef.close();
    this.onEditProduct.emit();
  }
}
