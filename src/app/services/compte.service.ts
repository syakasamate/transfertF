import { environment } from './../../environments/environment';
import { Compte } from './../models/compte';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
 compte:Compte;
  constructor(private http:HttpClient) { }

postCompte(compte:Compte){

  return this.http.post<Compte>(`${environment.apiUrl}/api/comptes`, compte);
}


postComptEx(ninea){
  return this.http.get<any>(`${environment.apiUrl}/api/comptes?partenaires.ninea=${ninea}`);
}

}
