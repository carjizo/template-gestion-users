import { Component, inject } from '@angular/core';
import { NavbardComponent } from "../navbard/navbard.component";
import { RouterOutlet, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CollaboratorService } from '../../services/collaborator.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../../interfaces/Login';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-collaborator',
  imports: [NavbardComponent, RouterOutlet, FooterComponent, FormsModule, CommonModule],
  templateUrl: './collaborator.component.html',
  styleUrl: './collaborator.component.css'
})
export class CollaboratorComponent {
  private collaboratorService = inject(CollaboratorService);
  private loginService = inject(LoginService)
  private router = inject(Router);  // Correcta declaración

  idDocument: string = '';
  fullName: string = '';
  phone: string = '';
  role: string = '';

  isPasswordModalOpen: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';

  ngOnInit(): void {
    this.idDocument = localStorage.getItem('idDocument') || '0';
    this.detailCollaborator();
  }

  detailCollaborator(): void {
    this.collaboratorService.collaboratorFindIdDocument(this.idDocument).subscribe(data => {
      this.fullName = data.response.fullName;
      this.idDocument = data.response.idDocument;
      this.phone = data.response.phone;
      this.role = data.response.role;
    });
  }

  onSubmit(): void {
    const updatedData = {
      idDocument: this.idDocument,
      fullName: this.fullName,
      phone: this.phone,
      status: true,
      role: this.role
    };

    this.collaboratorService.updateCollaborator(updatedData).subscribe(response => {
      localStorage.setItem("fullName", updatedData.fullName);
      this.router.navigate(['mis-datos']);
      // this.router.navigate([this.router.url], { skipLocationChange: true }).then(() => {
      //   this.router.navigate([this.router.url]); // Vuelve a navegar a la misma ruta
      // });
    });
  }

  // Manejar modal
  openPasswordModal(): void {
    this.isPasswordModalOpen = true;
  }

  closePasswordModal(): void {
    this.isPasswordModalOpen = false;
    this.newPassword = '';
    this.confirmPassword = '';
  }

  updatePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const updatedPassword: Login = {
      idDocument: this.idDocument,
      password: this.newPassword
    };

    this.loginService.updatePassword(updatedPassword).subscribe(() => {
      alert('Contraseña actualizada correctamente');
      this.closePasswordModal();
    });
  }
}
