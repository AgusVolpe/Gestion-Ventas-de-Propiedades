import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserLogin, UserRegister } from './interface';
import * as jwt from 'jwt-decode';
import { AuthStatus } from './interface/auth-status.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  private _currentUser = signal<User | undefined>(undefined);

  public authStatus = computed(() => this._authStatus());
  public currentUser = computed(() => this._currentUser());

  register(newUser: UserRegister): Observable<any> {
    return this.http.post<any>(`${this.url}/Usuario/Registro`, newUser);
  }

  login(userLogin: UserLogin): Observable<any> {
    return this.http.post<any>(`${this.url}/Usuario/Login`, userLogin).pipe(
      map(({ accessToken }) => {
        this.setAuthentication(accessToken);
        return accessToken;
      })
    );
  }

  setAuthentication(token: string | null) {
    if (token) {
      localStorage.setItem('accessToken', token);

      const userResponse = jwt.jwtDecode(token) as User;

      console.log('userResponse: ', userResponse);

      this._authStatus.set(AuthStatus.authenticated);

      this._currentUser.set({
        nameid: userResponse.nameid,
        email: userResponse.email,
        role: userResponse.role,
        exp: userResponse.exp,
      });

      this.isAuthenticatedSubject.next(true);
    }

    console.log('señal computada: ', this.currentUser());
  }

  checkStatus() {
    const token = localStorage.getItem('accessToken');
    console.log('checkStatus', token);

    this.setAuthentication(token);
  }

  logout() {
    localStorage.removeItem('accessToken');
    this._authStatus.set(AuthStatus.noAuthenticated);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getRoles(): Observable<any>{
    return this.http.get<any>(`${this.url}/Usuario/RolesWithUsuarios`);
  }

  getReporte(): Observable<any>{
    return this.http.get<any>(`${this.url}/Usuario/ReporteVendedores`)
  }

  getIdUsuario(): string | undefined{
    return this.currentUser()?.nameid;
  }
  
  getRoleUsuario(): string | undefined{
    return this.currentUser()?.role;
  }
}
