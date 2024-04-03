import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private _refresh$ = new Subject<void>();
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly url = environment.apiUrl;

  constructor() { }

  get refresh$(){
    return this._refresh$;
  }

  getProductos(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<any>(`${this.url}/Producto`, {headers});
  }

  removeProducto(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete<any>(`${this.url}/Producto/${id}`, {headers})
            .pipe(
              tap(() => {
                this._refresh$.next();
              })
              );
  }
}
