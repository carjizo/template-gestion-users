import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { CollaboratorService } from '../../services/collaborator.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { ErrorDialogComponent } from '../error_dialog/error-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private accesoService = inject(AccesoService);
  private collaboratorService = inject(CollaboratorService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  private dialog = inject(MatDialog);

  public formLogin: FormGroup = this.formBuild.group({
    idIdent: ['',Validators.required],
    password: ['',Validators.required]
  })

  iniciarSesion(){
    if(this.formLogin.invalid) return;

    const objeto:Login = {
      idDocument: this.formLogin.value.idIdent,
      password: this.formLogin.value.password
    }

    this.accesoService.login(objeto).subscribe({
      next:(data) =>{
        if(data.isSucces == true){
          localStorage.setItem("token",data.token)
          localStorage.setItem("refreshToken",data.refreshToken)
          this.collaboratorService.collaboratorFindIdDocument(objeto.idDocument).subscribe({
            next: (infoCollab) =>{
              if(infoCollab.isSucces == true) {
                localStorage.setItem("fullName",infoCollab.response.fullName)
                localStorage.setItem("idDocument",infoCollab.response.idDocument)
                localStorage.setItem("userRole",infoCollab.response.role)
              }else{
                localStorage.setItem("fullName", "Usuario")
                localStorage.setItem("idDocument","0")
                localStorage.setItem("userRole","INVITED")
              }
            },
            error: (error) => {
              localStorage.setItem("fullName", "Usuario")
              localStorage.setItem("idDocument","0")
              localStorage.setItem("userRole","INVITED")
            }
          })
          this.router.navigate(['dashboard'])
        }else{
          this.openErrorDialog(data.message);
        }
      },
      error:(error) =>{
        this.openErrorDialog('Error en login: ' + error.message);
      }
    })
  }

  registrarse(){
    this.router.navigate(['registro'])
  }

  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
    });
  }
}
