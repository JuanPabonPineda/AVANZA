import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  get(id: any) {
    throw new Error('Method not implemented.');
  }

  apiHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.apiHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }

  findClientByDocument(number: number): Observable<any> {
    return this.http.get(`${environment.apiUrlBase}` + `${environment.apiUrlClient.findByDocument}` + `${number}`,
      {headers: this.apiHeaders}
    );
  }

  saveClient(client: any): Observable<any> {
    return this.http.post(`${environment.apiUrlBase}` + `${environment.apiUrlClient.save}`,
      client,
      {headers: this.apiHeaders}
    ).pipe(catchError(this.handlerError));
  }

  getProductByCode(code: number): Observable<any> {
    return this.http.get(`${environment.apiUrlBase}` + `${environment.apiUrlProducts.findByCode}`+ `${code}`,
      {headers: this.apiHeaders}
    ).pipe(catchError(this.handlerError));
  }

  generateInvoice(invoice: any): Observable<any> {
    return this.http.post(`${environment.apiUrlBase}` + `${environment.apiUrlSales.generateInvoice}`,
      invoice,
      {headers: this.apiHeaders}
    ).pipe(catchError(this.handlerError));
  }

  registerSale(invoice: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrlBase}${environment.apiUrlSales.registerSale}`,
      invoice,
      { headers: this.apiHeaders }
    ).pipe(catchError(this.handlerError));
  }

  private handlerError(error: any){
    console.log(error);
    return throwError(() => new Error(error.message))
  }
}
