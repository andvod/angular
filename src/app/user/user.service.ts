import { Injectable } from '@angular/core';
import { User } from "./user";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class UserService {

  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: Http) {
  }

  findAll(): Observable<User[]>  {
    return this.http.get(this.apiUrl)
      .pipe(map((res:Response) => res.json()))
      .pipe(catchError((error:any) => Observable.throw(error.json().error || 'Server error')));
  }

  saveUser(user: User): Observable<User> {
    return this.http.post(this.apiUrl, user)
    .pipe(map((res:Response) => res.json()))
    .pipe(catchError((error:any) => Observable.throw(error.json().error || 'Server error')));
 
  }

  deleteUserById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/' + id)
      .pipe(map((res:Response) => res.json()))
      .pipe(catchError((error:any) => Observable.throw(error.json().error || 'Server error')));
  }

  findById(id: number): Observable<User> {
    return this.http.get(this.apiUrl + '/' + id)
      .pipe(map((res:Response) => res.json()))
      .pipe(catchError((error:any) => Observable.throw(error.json().error || 'Error')));
  }
 
  updateUser(user: User): Observable<User> {
    return this.http.put(this.apiUrl, user)
      .pipe(map((res:Response) => res.json()))
      .pipe(catchError((error:any) => Observable.throw(error.json().error || 'Server error')));
  }

}