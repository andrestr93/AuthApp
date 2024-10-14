import { isAuthenticatedGuard } from './../guards/is-authenticated.guard';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, map, catchError, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { CheckTokenResponse } from '../interfaces/check-token-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseurl: string = environment.baseUrl

  private http = inject(HttpClient);



  private _currentuser = signal<User | null>(null);

  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  //! Al mundo exterior

  public currentUser = computed(() => this._currentuser());
  public authStatus = computed(() => this._authStatus());

  constructor() { }

  private setAuthentication(user: User, token: string): boolean {

    this._currentuser.set(user)
    this._authStatus.set(AuthStatus.authenticated)
    localStorage.setItem('token', token)

    return true
  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseurl}/auth/login`
    const body = { email, password }

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(({ user, token }) => {

          this._currentuser.set(user)
          this._authStatus.set(AuthStatus.authenticated)
          localStorage.setItem('token', token)

        }),
        map(() => true),

        //todo: errores

        catchError(err => throwError(() => err.error.message))

      )

  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseurl}/auth/check-token`

    const token = localStorage.getItem('token')

    if (token) return of(false)

    const headers = new HttpHeaders()
      .set('authorization', 'Bearer ${token}')

    return this.http.get<CheckTokenResponse>(url, { headers })

      .pipe(
        map(({ user, token }) => {

          this._currentuser.set(user)
          this._authStatus.set(AuthStatus.authenticated)
          localStorage.setItem('token', token)
          return true

        }),

        //todo: errores

        catchError(() => {

          this._authStatus.set(AuthStatus.noAuthenticated)
          return of(false)
        })
      );

  }


}
