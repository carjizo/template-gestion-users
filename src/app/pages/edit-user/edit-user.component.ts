import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RequestUpdateCollaborator } from '../../interfaces/RequestUpdateCollaborator';

@Component({
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  roleList: string[] = [];
  statusList: boolean[] = [true, false];

  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { collab: RequestUpdateCollaborator, roleList: string[] }
  ) {}
  saveChanges(): void {
    this.dialogRef.close(this.data.collab);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
