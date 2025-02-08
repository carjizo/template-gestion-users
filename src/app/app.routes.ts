import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GestionUsersComponent } from './pages/gestion-users/gestion-users.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { CollaboratorComponent } from './pages/collaborator/collaborator.component';
import { authGuard } from './custom/auth.guard';

export const routes: Routes = [
    {path:"", component:LoginComponent},
    {path:"registro", component:RegistroComponent},
    {path:"dashboard",component:DashboardComponent, canActivate:[authGuard]},
    {path:"gestion-usuarios",component:GestionUsersComponent, canActivate:[authGuard]},
    {path:"inicio",component:InicioComponent},
    {path:"reportes",component:ReportesComponent},
    {path:"mis-datos",component:CollaboratorComponent, canActivate:[authGuard]},
    {path:"**", component:DashboardComponent, canActivate:[authGuard]},
];
