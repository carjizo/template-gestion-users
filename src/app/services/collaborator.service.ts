import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { ResponseCollaboratorFindId } from '../interfaces/ResponseCollaboratorFindId';
import { Observable } from 'rxjs';
import { RequestUpdateCollaborator } from '../interfaces/RequestUpdateCollaborator';
import { Collaborator } from '../interfaces/Collaborator';

export interface FiltroRequest {
  page: number;
  size: number;
  fullName?: string;
  idDocument?: string;
  role?: string;
}

export interface PaginacionResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiCollaborator + "/collaborator";
  
  constructor() {}

  collaboratorFindIdDocument(idDocument: string): Observable<ResponseCollaboratorFindId> {
    return this.http.get<ResponseCollaboratorFindId>(`${this.baseUrl}/find-by-id/${idDocument}`)
  }

  updateCollaborator(collaborator: RequestUpdateCollaborator): Observable<RequestUpdateCollaborator> {
    return this.http.post<RequestUpdateCollaborator>(`${this.baseUrl}/update`, collaborator);
  }

  paginationCollaborators(filtro: FiltroRequest): Observable<PaginacionResponse<Collaborator>> {
      return this.http.post<PaginacionResponse<Collaborator>>(`${this.baseUrl}/list/pagination`, filtro);
  }
}
