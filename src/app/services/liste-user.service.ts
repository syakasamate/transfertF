import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Registre } from './../models/registre';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ListeUserService {

  constructor(private http: HttpClient,private sanitizer: DomSanitizer) { }

  getAll() {
    return this.http.get<Registre>(`${environment.apiUrl}/api/users`);
}
showImage(Registre){
  return  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${Registre.image}`);
}
updateUser(registre:Registre){
  return this.http.put<Registre>(`${environment.apiUrl}/api/bloquerusers/${registre.id}`, registre);
}
}
