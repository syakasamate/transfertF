import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partenaire } from '../models/partenaire';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {

  constructor( private http:HttpClient) { }

  getPartenaire(){
    return this.http.get<Partenaire>(`${environment.apiUrl}/api/partenaires`)
  }
}
