import { Registre } from './../models/registre';
import { User } from './../models/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';

import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  role;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


      registre:Registre;
  constructor(private http: HttpClient,) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  getConnexion(user:User){
    return this.http.post<User>(`${environment.apiUrl}/login_check`,user).
    pipe(map(data => {

      const decoded = jwt_decode(data.token);
       console.log(decoded);
    localStorage.setItem("token",data.token);
     //localStorage.setItem("user",JSON.stringify(data));
     localStorage.setItem("roles",JSON.stringify(decoded.roles));
     localStorage.setItem("name",JSON.stringify(decoded.nom));




     // localStorage.setItem('token', JSON.stringify(decoded));

      localStorage.setItem('currentUser', JSON.stringify(data));
     this.currentUserSubject.next(data);

      return user;
  }));


  }


  getRole() {
    // now returns an Observable of Config
    return this.http.get<Role>(`${environment.apiUrl}/api/listeSup`);
  }



register(registre:Registre) {
    return this.http.post<Registre>(`${environment.apiUrl}/api/users`, registre);
}



logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}




 getToken(){
   return localStorage.getItem('token');
 }



  }
