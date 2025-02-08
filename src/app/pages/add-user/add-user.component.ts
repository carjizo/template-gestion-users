import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RequestCreatedUser } from '../../interfaces/RequestCreatedUser';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatDialogModule,
    FormsModule,
    FlexLayoutModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  newRecord: RequestCreatedUser;

  statusList: string[] = [];

  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newRecord: RequestCreatedUser, statusList: string[] }) {
      this.newRecord = { ...data.newRecord };
      this.statusList = data.statusList; 
  }

  onSubmit(): void {
    console.log('Nuevo Registro:', this.newRecord);
    this.dialogRef.close(this.newRecord);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
