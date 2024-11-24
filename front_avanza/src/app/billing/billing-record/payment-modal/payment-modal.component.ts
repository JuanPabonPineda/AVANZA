import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Payment, TypePayment, UserProfile} from "../../../commons/model/interfaces";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  @Input() valuePay: String = '0';
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() payModal = new EventEmitter<Payment>();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectCard() {
    const payment: Payment = {
      type: TypePayment.Tarjeta,
      value: Number(this.valuePay)
    }
    this.payModal.emit(payment);
  }

  selectCash() {
    const payment: Payment = {
      type: TypePayment.Efectivo,
      value: Number(this.valuePay)
    }
    this.payModal.emit(payment);
  }

  download() {
    this.closeModal.emit(true);
  }

  close() {
    this.closeModal.emit(true);
  }
}
