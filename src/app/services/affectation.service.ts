import { environment } from './../../environments/environment';
import { Affectation } from './../models/affectation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private http: HttpClient) { }
  addAffectation(affectation:Affectation) {
    return this.http.post<Affectation>(`${environment.apiUrl}/api/affect_comptes`,affectation);
}

getAffectation() {
  return this.http.get<Affectation>(`${environment.apiUrl}/api/affect_comptes`);
}
}
