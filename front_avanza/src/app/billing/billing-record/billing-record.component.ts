import {Component, Directive, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecordService} from "../services/record.service";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Client, Invoice, Payment, RecordProduct, TypePaymentValue} from "../../commons/model/interfaces";
import {DatePipe} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-billing-record',
  templateUrl: './billing-record.component.html',
  styleUrls: ['./billing-record.component.css']
})
export class BillingRecordComponent implements OnInit {

  @Directive({selector: '[soloLetras]'})
  @Directive({selector: '[soloNumeros]', exportAs: 'solonumeros'})
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'description', 'value'];
  recordForm!: FormGroup;
  productForm!: FormGroup;
  dataSource: MatTableDataSource<RecordProduct> = new MatTableDataSource<RecordProduct>();
  products: RecordProduct[] = [];
  showTotalValue: string = '0';
  showPaymentModal: boolean = false;

  _user: any;
  _seller: any = '';
  _clientDocument: any = '';
  _clientExist: boolean = false;
  _isSellerDisabled: boolean = true;
  _invoiceNumber: number = 0;
  _client!: Client;
  _name: any = '';

  _showSearchProduct: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _recordService: RecordService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.preloadData();
    // this.showTable();
  }

  saveClient(): FormGroup {
    this._snackBar
    if (!this.recordForm.valid) {
      return this.recordForm;
    }
    if (this.recordForm.value.name) {
      /** creación cliente **/
      const currentDay = this.datePipe.transform(new Date(), "yyyy-MM-dd")
      const client: Client = {
        name: this.recordForm.value.name,
        number: this.recordForm.value.number,
        creationDate: currentDay ?? ''
      }
      this._recordService.saveClient(client).subscribe({
        next: (response) => {
          this.snackBarOpen("Se guardo datos del cliente");
          this.recordForm.controls['name'].disable();
          this.recordForm.controls['number'].disable();
          this.showSearchField();
        },
        error: (error) => {
          this.snackBarOpen(error);
        },
      });
    } else {
      /** consulta clente **/
      this._clientDocument = this.recordForm.value.number;
      this._recordService.findClientByDocument(this._clientDocument).subscribe({
        next: (response) => {
          if (!response.data) {
            this.snackBarOpen("No se encontrol datos del cliente");
            this._clientExist = true;
            this.recordForm.controls['name'].enable();
          } else {
            this._client = {
              id: response.data.id,
              number: response.data.number,
              name: response.data.name
            }
            this.recordForm.patchValue({name: response.data.name});
            this.recordForm.controls['name'].disable();
            this.recordForm.controls['number'].disable();
            this.showSearchField();
          }
        },
        error: (error) => {
          this.recordForm.controls['name'].enable();
          this.snackBarOpen(error);
        },
      });
    }
    // const invoiceData: any = {
    //   seller: this._isSellerDisabled ? this._user.userId : 0,
    // }
    // this.recordForm.patchValue(invoiceData);
    return this.recordForm;
  }

  public preloadData() {
    this.showTotalValue = '0';
    this.dataSource.data = [];
    this._user = localStorage.getItem("currentUser");
    this._user = JSON.parse(this._user);
    this._isSellerDisabled = !!this._user.userId;
    this._seller = this._isSellerDisabled ? this._user.name : '';
    //this._seller = this._isSellerDisabled ? this._user.userId : '';

    /** Inicializar formulario **/
    this.recordForm = this._formBuilder.group({
      number: ['', [
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(10),
        Validators.minLength(6),
        Validators.required,
      ]],
      name: [{value: this._name, disabled: true},
        [Validators.maxLength(99)]
      ],
      seller: [
        {value: this._seller, disabled: this._isSellerDisabled},
        [Validators.min(0)]
      ],
      invoiceNumber: [
        {value: '0', disabled: true},
        [Validators.min(0)]],
    });

    this.productForm = this._formBuilder.group({
      code: [{value: '', disabled: true}, [Validators.min(0), Validators.pattern("^[0-9]*$")]],
    });
  }

  /** Cargar producto a la factura **/
  recordProduct() {
    if (this.productForm.valid && this.productForm.value.code > 0) {
      const code: number = Number(this.productForm.value.code);

      this._recordService.getProductByCode(code).subscribe({
        next: (response) => {
          if (response.data) {
            this.pushProductTable(response.data)
            this.productForm.patchValue({code: ''});
            this.snackBarOpen("Se cargo producto a la factura");
          } else {
            this.snackBarOpen("No se encontro el producto");
            console.log("No se encontro el producto");
          }
        },
        error: err => {
          this.snackBarOpen("No se encontro el producto");
          console.log(err);
        }
      });
    }
    if (this._invoiceNumber == 0) {
      this.generateInvoiceNumber();
    }
  }

  pushProductTable(productDetail: any) {
    const product: RecordProduct = {
      id: productDetail.id,
      description: productDetail.reference,
      value: productDetail.price,
      code: productDetail.code
    };

    this.products.push(product);
    this.dataSource.data = this.products;
    let total: number = Number(this.showTotalValue);
    this.showTotalValue = String(total + product.value);
  }

  payment() {
    let total: number = 0;
    this.products.forEach(product => total += product.value);
    this.showPaymentModal = true;
  }

  generateInvoiceNumber() {
    const invoice: Invoice = {
      client: this._client,
      seller: this._user.userId,
    }

    this._recordService.generateInvoice(invoice).subscribe({
      next: (response) => {

        this._invoiceNumber = response.data;
        this.recordForm.patchValue({invoiceNumber: this._invoiceNumber});
      }, error: (error) => {
        this.snackBarOpen("No se logro crear la factura");
      }
    });
  }

  payModal(payment: Payment) {

    this.showPaymentModal = false;
    const typePayment = payment.type === 'Efectivo' ? TypePaymentValue.Efectivo : TypePaymentValue.Tarjeta;
    payment.type = typePayment.toString();
    const invoice: Invoice = {
      invoiceNumber: this._invoiceNumber,
      client: this._client,
      seller: this._user.userId,
      products: this.products,
      payment: payment
    }
    this._recordService.registerSale(invoice).subscribe({
      next: (response) => {
        this.modalResponse("Pago realizado!", "success");
        this.preloadData();
      }, error: (error) => {
        this.snackBarOpen(error.message);
      }
    });
  }

  closePaymentModal() {
    this.showPaymentModal = false;
  }

  showSearchField() {
    this.productForm.controls['code'].enable();
  }

  snackBarOpen(message: string) {
    this._snackBar.open(message, 'Cerrar', {duration: 3000});
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  download() {

  }
}
