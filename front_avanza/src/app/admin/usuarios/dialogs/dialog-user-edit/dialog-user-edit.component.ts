import {Component, Inject, OnInit, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserProfile} from "../../../../commons/model/interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/userService";

@Component({
  selector: 'app-dialog-user-edit',
  templateUrl: './dialog-user-edit.component.html',
  styleUrls: ['./dialog-user-edit.component.css']
})
export class DialogUserEditComponent implements OnInit {

  public readonly onEditUser = new EventEmitter<UserProfile>();
  public userForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    position: ['', [Validators.required]],
    rol: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(
    public dialogRef: MatDialogRef<DialogUserEditComponent>,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: UserProfile
  ) {
  }

  ngOnInit(): void {
    this.userForm.patchValue({
      name: this.data?.name!,
      lastName: this.data?.lastName!,
      username: this.data?.username!,
      position: this.data?.position!,
      rol: this.data?.rol!,
      password: this.data?.password!,
    });
  }

  cancelar() {
    this.userForm.reset()
    this.dialogRef.close();
    this.onEditUser.emit();
  }

  saveUser(): FormGroup {
    if (!this.userForm.valid) {
      return this.userForm;
    }
    this.onEditUser.emit({
      id: this.data?.id!,
      name: this.userForm.value.name!,
      lastName: this.userForm.value.lastName!,
      username: this.userForm.value.username!,
      position: this.userForm.value.position!,
      rol: this.userForm.value.rol!,
      password: this.userForm.value.password!,
    });
    return this.userForm;
  }
}
