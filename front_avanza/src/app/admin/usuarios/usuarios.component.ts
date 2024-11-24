import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProfile} from "../../commons/model/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {UserService} from "../services/userService";
import {map} from "rxjs/operators";
import {MatTabChangeEvent} from "@angular/material/tabs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public userForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    lastName: ['', [Validators.required, Validators.maxLength(30)]],
    username: ['', [Validators.required, Validators.maxLength(30)]],
    position: ['', [Validators.required, Validators.maxLength(30)]],
    rol: ['', [Validators.required, Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.maxLength(30)]],
  })

  _userProfile: UserProfile[] = [];
  _dataTable: MatTableDataSource<UserProfile> = new MatTableDataSource<UserProfile>()

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.consultarUsuarios();
  }

  public googleForm: FormGroup = this._formBuilder.group({});


  //cards
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Card 1', cols: 2, rows: 3}
        ];
      }
      return [
        {title: 'Card 1', cols: 2, rows: 3}
      ];
    })
  );

  /** Servicio de crear nuevo usuario **/
  saveNewUser(): FormGroup {
    if (!this.userForm.valid) {
      return this.userForm;
    }

    this._userService.crearNuevoUsuario(this.buildUserProfile()).subscribe({
      next: (respuesta) => {
        if (!respuesta?.isError) {
          //modal usuario creado
          this.modalSuccessful(respuesta?.message);
          this.userForm.reset();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
    return this.userForm;
  }

  /** Servicio consulta de usuarios **/
  consultarUsuarios(): any {
    this._userService.obtenerUsuarios().subscribe({
      next: (respuesta) => {
        this._userProfile = respuesta.data;
        this._dataTable.data = respuesta.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /** Servicio editar usuarios **/
  editUser(element: UserProfile) {
    if (element) {
      this._userService.editarUsuario(element).subscribe({
        next: (respuesta) => {
          //modal usuario editado exitosamente
          this.consultarUsuarios();
          this.modalSuccessful("Se actualizo el usuario exitosamente");
        },
        error: (error) => {
          console.log(error);
          this.modalError("Ocurrio un Error: " + error.message!);
        },
      });
    }
  }

  removeUser(id: number) {
    this._userService.removerUsuario(id).subscribe({
      next: (respuesta) => {
        if (!respuesta?.isError) {
          this.modalSuccessful(respuesta?.message);
        } else {
          this.modalError(respuesta?.message);
        }
        this.consultarUsuarios();
      },
      error: (error) => {
        console.log(error);
        this.modalError("Ocurrio un Error: " + error.message!);
      },
    });
  }

  buildUserProfile(): UserProfile {
    const usuario: UserProfile = {
      lastName: this.userForm.value.lastName,
      position: this.userForm.value.position,
      password: this.userForm.value.password,
      name: this.userForm.value.name,
      rol: this.userForm.value.rol,
      username: this.userForm.value.username,
    }
    console.log(usuario);
    return usuario
  }

  /** Permite evento al cambiar de tab **/
  tabFn(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.consultarUsuarios();
    }
  }

  modalSuccessful(message: string) {
    Swal.fire({
      icon: 'success',
      title: "Exitoso",
      text: message ?? "",
      showConfirmButton: false,
      timer: 3000
    });
  }

  modalError(message: string) {
    Swal.fire({
      icon: 'error',
      title: "Error",
      text: message ?? "Error",
      showConfirmButton: false,
      timer: 3000
    });
  }
}
