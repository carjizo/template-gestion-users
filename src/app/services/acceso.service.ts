import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../interfaces/ResponseAcceso';
import { Login } from '../interfaces/Login';
import { ResponseRegister } from '../interfaces/ResponseRegister';
import { Register } from '../interfaces/Register';
import { ResponseValidateToken } from '../interfaces/ResponseValidateToken';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiLogin + "/auth";

  constructor() { }

  registrarse(objeto: Register): Observable<ResponseRegister> {
      return this.http.post<ResponseRegister>(`${this.baseUrl}/register`, objeto)
  }

  login(objeto: Login): Observable<ResponseAcceso> {
      return this.http.post<ResponseAcceso>(`${this.baseUrl}/login`, objeto)
  }

  validarToken(token: string): Observable<ResponseValidateToken> {
      return this.http.get<ResponseValidateToken>(`${this.baseUrl}/validate-token/${token}`)
  }

  refreshToken(token: string): Observable<ResponseAcceso> {
      return this.http.get<ResponseAcceso>(`${this.baseUrl}/refresh-token/${token}`)
  }
}
