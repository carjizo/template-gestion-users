import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/Login';
import { RequestUpdateCollaborator } from '../interfaces/RequestUpdateCollaborator';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiLogin + "/login";

  constructor() { }

  updatePassword(login: Login): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/update-password`, login);
  }

  updateCollaborator(collaborator: RequestUpdateCollaborator): Observable<RequestUpdateCollaborator> {
    return this.http.post<RequestUpdateCollaborator>(`${this.baseUrl}/update`, collaborator);
  }
}
