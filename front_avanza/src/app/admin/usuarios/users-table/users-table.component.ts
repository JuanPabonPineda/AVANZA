import {Component, Input, OnInit, Output, ViewChild, EventEmitter, AfterViewInit} from '@angular/core';
import {UserProfile} from "../../../commons/model/interfaces";
import Swal from 'sweetalert2';
import {MatDialog} from "@angular/material/dialog";
import {DialogUserEditComponent} from "../dialogs/dialog-user-edit/dialog-user-edit.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, AfterViewInit {

  @Input() dataSource: MatTableDataSource<UserProfile> = new MatTableDataSource<UserProfile>();
  @Output() onEditUser = new EventEmitter<UserProfile>();
  @Output() onRemoveUser = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<boolean>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['id', 'name', 'lastName', 'action'];


  /** Servicio elminar usuario **/
  deleteUser(id: number) {
    Swal.fire({
      title: 'Confirmación',
      text: "El usuario se eliminara por completo ¿Esta seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onRemoveUser.emit(id);
      }
    });
  }

  /** Abré dialog para editar usuario **/
  openDialogEdit(userEdit: UserProfile) {
    const dialogRef = this.dialog.open(DialogUserEditComponent, {
      data: userEdit
    });

    const subscription = dialogRef.componentInstance.onEditUser.subscribe(
      (user) => {
        subscription.unsubscribe();
        this.onEditUser.emit(user);
        dialogRef.close();
      }
    );
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
}
