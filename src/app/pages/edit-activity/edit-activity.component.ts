import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequestUpdateActivity } from '../../interfaces/RequestUpdateActivity';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-edit-activity',
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
  templateUrl: './edit-activity.component.html',
  styleUrl: './edit-activity.component.css'
})
export class EditActivityComponent {
  statusList: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { activity: RequestUpdateActivity, statusList: string[] }
  ) {}

  saveChanges(): void {
    this.dialogRef.close(this.data.activity);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
