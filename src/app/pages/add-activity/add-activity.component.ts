import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RequestCreateActivity } from '../../interfaces/RequestCreateActivity';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [CommonModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatDialogModule,
    FormsModule,
    FlexLayoutModule],
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.css'
})
export class AddActivityComponent {
  newRecord: RequestCreateActivity;

  statusList: string[] = [];

  constructor(public dialogRef: MatDialogRef<AddActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newRecord: RequestCreateActivity, statusList: string[] }) {
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
