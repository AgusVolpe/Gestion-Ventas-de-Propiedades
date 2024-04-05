import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Reserva } from './interface/reserva.interface';
import { ReservaCreacion } from './interface/reserva-creacion.interface';
import { EstadoReserva } from './interface/estadoReserva.enum';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private _refresh$ = new Subject<void>();
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly url = environment.apiUrl;

  constructor() { }

  get refresh$(){
    return this._refresh$;
  }

  addReserva(reservaCreacion:ReservaCreacion, barrio:string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<any>(`${this.url}/Reserva?barrio=${barrio}`, reservaCreacion, {headers})
            .pipe(
              tap(() => {
                this._refresh$.next();
              })
              );
  }

  getReservas(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<any>(`${this.url}/Reserva`, {headers});
  }

  removeReserva(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete<any>(`${this.url}/Reserva/${id}`, {headers})
            .pipe(
              tap(() => {
                this._refresh$.next();
              })
              );
  }

  updateReserva(id:number, estadoReserva: EstadoReserva): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<any>(`${this.url}/Reserva/${id}?estado=${estadoReserva}`, {headers})
            .pipe(
              tap(() => {
                this._refresh$.next();
              })
              );
  }

  negarReserva(id: any): Observable<boolean>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<boolean>(`${this.url}/Reserva/NegarReserva/${id}`, {headers});
  }
}
