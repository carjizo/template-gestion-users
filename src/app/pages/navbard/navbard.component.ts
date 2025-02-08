import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'; // Importar MatSidenavModule
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-navbard',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, MatSidenavModule, MatListModule],
  templateUrl: './navbard.component.html',
  styleUrls: ['./navbard.component.css'],
})
export class NavbardComponent implements OnInit {
  private router = inject(Router);
  fullName: string = '';
  isAdmin: boolean = false;

  ngOnInit() {
    this.fullName = localStorage.getItem('fullName') || 'Usuario';
    const userRole = localStorage.getItem('userRole') || 'INVITED';
    this.isAdmin = userRole === 'ADMIN';
  }

  toggleSidenav() {
    const sidenav = document.querySelector('mat-sidenav') as HTMLElement;
    if (sidenav) sidenav.classList.toggle('open');
  }

  reportes() {
    this.router.navigate(['reportes']);
  }

  userManagement() {
    this.router.navigate(['gestion-usuarios']);
  }

  dashboard() {
    this.router.navigate(['dashboard']);
  }

  logout() {
    this.router.navigate(['']);
  }

  myDataCollaborator() {
    this.router.navigate(['mis-datos']);
  }
}
