import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiLogin + "/role";

  constructor() { }

  getRoleList(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
}
