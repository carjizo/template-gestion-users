import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AccesoService } from '../services/acceso.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredModalComponent } from '../pages/session-expired-modal/session-expired-modal.component';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
     const router = inject(Router);
     const dialog = inject(MatDialog);
     // debugger;
     if(req.url.indexOf("auth") > 0)  return next(req);

     const token = localStorage.getItem("token");
     const clonRequest = req.clone({
          setHeaders:{
               Authorization: `Bearer ${token}`
          }
     })

     // return next(clonRequest);
     const refreshToken = localStorage.getItem("refreshToken") || "";
     const accesoService = inject(AccesoService)
     return next(clonRequest).pipe(
          catchError(err => {
               if (refreshToken) {
                    console.log('Refrescando el token:');
                    return accesoService.refreshToken(refreshToken).pipe(
                         switchMap((res) => {
                         // Guardar el nuevo token
                         localStorage.setItem('token', res.token);
                         console.log("xddd")
                         const newReq = req.clone({
                         setHeaders: {
                              Authorization: `Bearer ${res.token}`
                         }
                         });
               
                         return next(newReq);
                         }),
                         catchError((refreshErr) => {
                         const finalError = new Error(refreshErr);
                         localStorage.removeItem('token');
                         localStorage.removeItem('refreshToken');
                         dialog.open(SessionExpiredModalComponent, {
                              data: { message: 'La sesión ha expirado. Por favor, inicie sesión nuevamente.' },
                              disableClose: true
                              }).afterClosed().subscribe(() => {
                              router.navigate(['']);  // Redirigir después de cerrar el modal
                              });
                         return throwError(() => finalError);
                         })
                    );
               }
               // Siempre retornar un observable, incluso si no se maneja el token
               return throwError(() => err);
          })
          );
};
