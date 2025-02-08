import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Activity } from '../interfaces/Activity';
import { RequestUpdateActivity } from '../interfaces/RequestUpdateActivity';

export interface FiltroRequest {
  page: number;
  size: number;
  fullName?: string;
  clientFullName?: string;
  status?: string;
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
export class ActivityService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiActivity;

  constructor() { }

  getActivities(filtro: FiltroRequest): Observable<PaginacionResponse<Activity>> {
    return this.http.post<PaginacionResponse<Activity>>(`${this.baseUrl}/activity/list/pagination`, filtro);
  }

  getStatusList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/status-activities/all`);
  } 

  createActivity(newActivity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.baseUrl}/activity/create`, newActivity);
  }

  updateActivity(newActivity: RequestUpdateActivity): Observable<RequestUpdateActivity> {
    return this.http.post<RequestUpdateActivity>(`${this.baseUrl}/activity/update`, newActivity);
  }
}
