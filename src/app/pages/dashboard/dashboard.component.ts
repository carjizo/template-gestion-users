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
import { Activity } from '../../interfaces/Activity';
import { ActivityService } from '../../services/activity.service';
import { FormsModule } from '@angular/forms';
import { RequestActivityPagination } from '../../interfaces/RequestActivityPagination';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestCreateActivity } from '../../interfaces/RequestCreateActivity';
import { RequestUpdateActivity } from '../../interfaces/RequestUpdateActivity';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-dashboard',
  imports: [
    NavbardComponent, RouterOutlet, MatTableModule, FormsModule,
    MatFormFieldModule, MatPaginator, MatPaginatorModule,
    MatSortModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule,
    MatOptionModule, CommonModule, MatDialogModule,
    FooterComponent
], 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent  {
  private responseActivity = inject(ActivityService);
  isAdmin: boolean = false;

  newRecord: RequestCreateActivity = { 
    idDocument: '', 
    fullName: '', 
    clientFullName: '', 
    clientPhone: '', 
    amount: 0, 
    customerPayment: 0, 
    description: '', 
    note: '', 
    status: '' 
  };

  statusList: string[] = [];
  displayedColumns: string[] = ['id', 'developer', 'client', 'description', 'note','status', 'actions'];
  totalElements = 0;
  pageSize = 2;
  pageIndex = 0;
  dataSource: MatTableDataSource<Activity>;
  productos: MatTableDataSource<Activity> = new MatTableDataSource();

  filtros: RequestActivityPagination = {
    page: 0,
    size: 2,
    fullName: '',
    clientFullName: '',
    status: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<Activity>([]);
  }

  ngOnInit(): void {
    this.cargarActivities();
    this.cargarStatus();
    const userRole = localStorage.getItem('userRole') || 'INVITED';
    this.isAdmin = userRole === 'ADMIN';
  }

  cargarActivities(): void {
    this.responseActivity.getActivities(this.filtros).subscribe((data) => {
      this.productos.data = data.content;
      this.totalElements = data.totalElements;
    });
  }

  cargarStatus(): void {
    this.responseActivity.getStatusList().subscribe((data) => {
      const statusList = data.map((item: { statusName: string }) => item.statusName);
      this.statusList = statusList; 
    });
  }

  cambiarPagina(event: any): void {
    this.filtros.page = event.pageIndex;
    this.filtros.size = event.pageSize;
    this.cargarActivities();
  }

  aplicarFiltros(): void {
    this.filtros.page = 0; // Reinicia a la primera página al aplicar filtros
    this.cargarActivities();
  }

  editRow(row: RequestUpdateActivity): void {
    const dialogRef = this.dialog.open(EditActivityComponent, {
      width: '500px',
      data: { activity: { ...row }, statusList: this.statusList }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos editados:', result);
        this.updateActivity(result);
      }
    });
  }

  updateActivity(updatedActivity: RequestUpdateActivity): void {
    this.responseActivity.updateActivity(updatedActivity).subscribe(
      response => {
        console.log('Registro actualizado:', response);
        this.cargarActivities();
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
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '500px',
      data: { newRecord: this.newRecord, statusList: this.statusList }
    });
  
    // Manejo del resultado cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo registro agregado:', result);
        this.createActivity(result);
      }
    });
  }

  createActivity(newActivity: Activity): void {
    this.responseActivity.createActivity(newActivity).subscribe(
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
      clientFullName: '',
      status: '',
    };
  }
  // this.cargarActivities();
}