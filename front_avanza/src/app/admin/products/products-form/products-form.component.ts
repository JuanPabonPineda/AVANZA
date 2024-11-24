import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product, ProductStatus, Status} from "../../../commons/model/interfaces";

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  @Output() onSaveProduct = new EventEmitter<Product>();

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
  statusList: Status[] = [];
  productStatus = ProductStatus;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  saveNewProduct(): FormGroup {
    if (!this.productsForm.valid) {
      return this.productsForm;
    }
    this.onSaveProduct.emit({
      id: this.productsForm.value.id!,
      brand: this.productsForm.value.brand!,
      category: this.productsForm.value.category!,
      creationDate: this.productsForm.value.creationDate!,
      discount: this.productsForm.value.discount!,
      modificationDate: this.productsForm.value.modificationDate!,
      price: this.productsForm.value.price!,
      reference: this.productsForm.value.reference!,
      status: this.productsForm.value.status!,
      stocks: this.productsForm.value.stocks!,
      code: this.productsForm.value.code!,
    });
    return this.productsForm;
  }
}
