import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {UserProfile} from "../../commons/model/interfaces";

@Injectable({providedIn: 'root'})
export class UserService {

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

  crearNuevoUsuario(usuario: UserProfile): Observable<any> {
    return this.http.post(`${environment.apiUrlBase}` + `${environment.apiUrlUser.urlUserSave}`, usuario,
      {headers: this.apiHeaders}
    );
  }

  obtenerUsuarios(): Observable<any> {
    return this.http.get(`${environment.apiUrlBase}` + `${environment.apiUrlUser.urlUserFindAllUsers}`,
      {headers: this.apiHeaders}
    );
  }

  editarUsuario(usuario: UserProfile): Observable<any> {
    return this.http.put(`${environment.apiUrlBase}` + `${environment.apiUrlUser.urlUserUpdate}`,
      usuario
    );
  }

  removerUsuario(id: number | undefined): Observable<any> {
    return this.http.delete(`${environment.apiUrlBase}` + `${environment.apiUrlUser.urlUserDelete}` + `${id}`);
  }
}
