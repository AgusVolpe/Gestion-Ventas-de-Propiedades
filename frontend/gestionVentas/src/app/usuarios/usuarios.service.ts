import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private _refresh$ = new Subject<void>();
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly url = environment.apiUrl;
  
  constructor() { }

  get refresh$(){
    return this._refresh$;
  }

  addRole(roleName: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<any>(`${this.url}/Usuario/Role`, roleName, {headers});
  }

  getReporte(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.get<any>(`${this.url}/Usuario/ReporteVendedores`, {headers})
  }

  getUsuarios(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.get<any>(`${this.url}/Usuario/UsuariosWithRoles`, {headers});
  }

  addNewRoleToUser(userId: string, roleId: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.post<any>(`${this.url}/Usuario/${userId}/AddRole/${roleId}`, {headers});
  }
  
  removeRoleToUser(userId: string, roleId: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.delete<any>(`${this.url}/Usuario/${userId}/RemoveRole/${roleId}`, {headers})
            .pipe(
              tap(() => {
                this._refresh$.next();
              })
              );;
  }

  removeUser(userId: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete<any>(`${this.url}/Usuario/${userId}`, {headers})
            .pipe(
              tap(() => {
                this._refresh$.next();
              })
              );
  }
}
