import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../commons/model/interfaces";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  apiHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.apiHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    const currentUser = localStorage.getItem('currentUser')??'{}';
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(currentUser));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    localStorage.clear();
    return this.http.post<any>(`${environment.apiUrlBase}` + `${environment.apiUrlAuth.authenticate}`,
      {username, password},
      {headers: this.apiHeaders})
      .pipe(map((response) => {
        // login successful if there's a jwt token in the response
        if (response && response.data && response.data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.currentUserSubject.next(response.data);
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          sessionStorage.setItem('token', response.data.token);
          localStorage.setItem('isLogged', 'true')
          localStorage.setItem('rol', response.data!.rol);
          return response;
        }else if (response.isError){
          return throwError(() => new Error(response.message));
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    let user = new User();
    this.currentUserSubject.next(user);
  }
}
