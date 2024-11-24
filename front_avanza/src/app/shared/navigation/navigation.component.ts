import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {NavMenuItem} from "../../commons/model/interfaces";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Output() onLogout = new EventEmitter<boolean>();

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  menu: NavMenuItem[] = [];

  menuAdmin: NavMenuItem[] = [
    {Label: 'Inicio', Target: 'dashboard'},
    // { Label: 'Estadisticas', Target: '/estadisticas' },
    {Label: 'Usuarios', Target: 'usuarios'},
    // { Label: 'Proveedores', Target: '/proveedores' },
    {Label: 'Productos', Target: 'productos'},
    // { Label: 'Recursos', Target: '/recursos' },
    // { Label: 'Reportes', Target: '/reportes' },
  ] as NavMenuItem[];

  menuOther: NavMenuItem[] = [
    {Label: 'Registrar Factura', Target: 'record'},
    {Label: 'Consulta Producto', Target: 'products'},
  ] as NavMenuItem[];

  constructor(private breakpointObserver: BreakpointObserver) {

  }

  ngOnInit(): void {
    const typeUser = localStorage.getItem("rol");
    if (typeUser != null && typeUser == "Admin") {
      this.menu = this.menuAdmin;
    } else {
      this.menu = this.menuOther;
    }
  }

  actionMenu() {
    this.isHandset = this.isHandset ?
      this.getObservable(false) :
      this.getObservable(true);
  }

  getObservable(value: boolean): Observable<boolean> {
    return new Observable((observer) => {
      observer.next(value);
    });
  }

  logout() {
    this.onLogout.emit(true);
  }
}
