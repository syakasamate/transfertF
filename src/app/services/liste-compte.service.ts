import { environment } from './../../environments/environment';
import { Compte } from './../models/compte';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListeCompteService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Compte>(`${environment.apiUrl}/api/comptes`);
}

}
