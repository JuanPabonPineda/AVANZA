export interface NavMenuItem {
  Label: string;
  Target: string;
}

export interface UserProfile {
  id?: number;
  name: string;
  lastName: string;
  username: string;
  password?: string;
  rol?: string;
  position?: string;
  createDate?: Date;
}

export interface GeneralResponse {
  data?: any;
  isError: boolean;
  message: string;
}

export interface Product {
  id?: number;
  reference: string;
  brand: string;
  price: number;
  category: string;
  stocks: number;
  creationDate?: string;
  modificationDate?: string;
  discount: number;
  status: boolean;
  code: string;
}

export interface Status {
  id?: number
  description: string
}

export enum ProductStatus {
  Activo = 'Activo',
  Inactivo = 'Inactivo'
}

export enum TypePaymentValue {
  Tarjeta = 1,
  Efectivo = 2
}

export enum TypePayment {
  Tarjeta = "Tarjeta",
  Efectivo = "Efectivo"
}

/** autenticación **/
export class User {
  id: number | undefined;
  username: string | undefined;
  userId: number | undefined;
  name: string = '';
  lastName: string | undefined;
  rol: string | undefined;
  position: string | undefined;
  token: string | undefined;
}

export interface Client {
  id?: number;
  number: string;
  name: string;
  creationDate?: string;
}

export interface Invoice {
  invoiceNumber?: number;
  client: Client;
  seller: number;
  products?: RecordProduct[];
  payment?: Payment;
}

export interface Payment {
  id?: number;
  type: string;
  value: number;
}

export interface RecordProduct {
  id: number;
  description: string;
  value: number;
  code: string;
}
