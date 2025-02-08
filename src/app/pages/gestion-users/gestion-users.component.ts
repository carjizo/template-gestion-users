import {Component, ViewChild, inject} from '@angular/core';
import { NavbardComponent } from "../navbard/navbard.component";
import { RouterOutlet } from '@angular/router';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CollaboratorService } from '../../services/collaborator.service';
import { FormsModule } from '@angular/forms';
import { RequestCollaboratorPagination } from '../../interfaces/RequestActivityPagination copy';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FooterComponent } from '../footer/footer.component';
import { Collaborator } from '../../interfaces/Collaborator';
import { RoleService } from '../../services/role.service';
import { RequestCreatedUser } from '../../interfaces/RequestCreatedUser';
import { AddUserComponent } from '../add-user/add-user.component';
import { AccesoService } from '../../services/acceso.service';
import { LoginService } from '../../services/login.service';
import { RequestUpdateCollaborator } from '../../interfaces/RequestUpdateCollaborator';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-gestion-users',
  imports: [
    NavbardComponent, RouterOutlet, MatTableModule, FormsModule,
    MatFormFieldModule, MatPaginator, MatPaginatorModule,
    MatSortModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule,
    MatOptionModule, CommonModule, MatDialogModule,
    FooterComponent
  ],
  templateUrl: './gestion-users.component.html',
  styleUrl: './gestion-users.component.css'
})
export class GestionUsersComponent {
  private collboratorService = inject(CollaboratorService);
  private loginService = inject(LoginService);
  private accesoService = inject(AccesoService);
  private roleService = inject(RoleService);
  isAdmin: boolean = false;

  newRecord: RequestCreatedUser = { 
    idDocument: '',
    password: '',
    role: ''
  };

  roleList: string[] = [];
  displayedColumns: string[] = ['idDocument', 'fullName', 'phone', 'role','status', 'actions'];
  totalElements = 0;
  pageSize = 2;
  pageIndex = 0;
  dataSource: MatTableDataSource<Collaborator>;
  productos: MatTableDataSource<Collaborator> = new MatTableDataSource();

  filtros: RequestCollaboratorPagination = {
    page: 0,
    size: 2,
    fullName: '',
    idDocument: '',
    role: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<Collaborator>([]);
  }

  ngOnInit(): void {
    this.cargarCollaboradores();
    this.cargarRoles();
    const userRole = localStorage.getItem('userRole') || 'INVITED';
    this.isAdmin = userRole === 'ADMIN';
  }

  cargarCollaboradores(): void {
    this.collboratorService.paginationCollaborators(this.filtros).subscribe((data) => {
      this.productos.data = data.content;
      this.totalElements = data.totalElements;
    });
  }

  cargarRoles(): void {
    this.roleService.getRoleList().subscribe((data) => {
      const roleList = data.map((item: { roleName: string }) => item.roleName);
      this.roleList = roleList; 
    });
  }

  cambiarPagina(event: any): void {
    this.filtros.page = event.pageIndex;
    this.filtros.size = event.pageSize;
    this.cargarCollaboradores();
  }

  aplicarFiltros(): void {
    this.filtros.page = 0; // Reinicia a la primera página al aplicar filtros
    this.cargarCollaboradores();
  }

  editRow(row: RequestUpdateCollaborator): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: { collab: { ...row }, roleList: this.roleList }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos editados:', result);
        this.updateCollaborator(result);
      }
    });
  }

  updateCollaborator(updatedCollaborator: RequestUpdateCollaborator): void {
    // console.log("updateActivity")
    this.loginService.updateCollaborator(updatedCollaborator).subscribe(
      response => {
        console.log('Registro actualizado:', response);
        this.cargarCollaboradores();
      },
      error => {
        console.error('Error al actualizar la actividad:', error);
      }
    );
  }
  
  deleteRow(row: any): void {
    console.log('Eliminando fila:', row);
    // Lógica para eliminar la fila
  }
  
  extraAction(row: any): void {
    console.log('Acción extra para la fila:', row);
    // Lógica para la acción extra
  }

  addNewRecord(): void {
    console.log('Adding a new record...');
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      data: { newRecord: this.newRecord, statusList: this.roleList }
    });
  
    // Manejo del resultado cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo registro agregado:', result);
        this.createUsuario(result);
      }
    });
  }

  createUsuario(newUser: RequestCreatedUser): void {
    newUser.password = "123";
    console.log("createUser")
    this.accesoService.registrarse(newUser).subscribe(
      (response) => {
        console.log('Registro creado:', response);
        // Lógica adicional si es necesario, como actualizar la lista o mostrar un mensaje
      },
      (error) => {
        console.error('Error al crear el registro:', error);
        // Lógica para manejar errores
      }
    );
  }

  clearFilters(): void {
    this.filtros = {
      page: 0,
      size: this.pageSize, // Tamaño de página predeterminado
      fullName: '',
      idDocument: '',
      role: '',
    };
  }
}