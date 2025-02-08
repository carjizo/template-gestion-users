import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-session-expired-modal',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    template: `
    <div class="modal-container">
        <h2 mat-dialog-title class="modal-title">⚠️ Sesión Expirada</h2>
        <mat-dialog-content class="modal-content">
        <p>Estimado usuario debes volver a iniciar sesión</p>
        </mat-dialog-content>
        <mat-dialog-actions class="modal-actions" align="center">
        <button mat-raised-button color="warn" (click)="onLogin()">Salir</button>
        <!-- <button mat-raised-button color="primary" (click)="onReload()">Continuar</button> -->
        </mat-dialog-actions>
    </div>
    `,
    styles: [`
    .modal-container {
        text-align: center;
        padding: 20px;
    }
    .modal-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .modal-content p {
        font-size: 16px;
        color: #555;
    }
    .modal-actions {
        margin-top: 20px;
    }
    button {
        margin: 0 10px;
        min-width: 100px;
    }
    `]
})
export class SessionExpiredModalComponent {
    constructor(private dialogRef: MatDialogRef<SessionExpiredModalComponent>) {}

    onLogin() {
        this.dialogRef.close('login');
    }

    onReload() {
        this.dialogRef.close('reload');
    }
}
