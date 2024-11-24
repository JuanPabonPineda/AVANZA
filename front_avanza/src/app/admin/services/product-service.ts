import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../commons/model/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProductService {

  apiHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.apiHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Token': 'Bearer 152',
    });
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${environment.apiUrlBase}` + `${environment.apiUrlProducts.save}`, product,
      {headers: this.apiHeaders}
    );
  }

  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrlBase}` + `${environment.apiUrlProducts.findAllProducts}`,
      {headers: this.apiHeaders}
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(`${environment.apiUrlBase}` + `${environment.apiUrlProducts.update}`,
      product
    );
  }

  removeProduct(id: number | undefined): Observable<any> {
    return this.http.delete(`${environment.apiUrlBase}` + `${environment.apiUrlProducts.delete}` + `${id}`);
  }
}
