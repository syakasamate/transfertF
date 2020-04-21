import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depot } from '../models/depot';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http: HttpClient) { }
  addDepot(depot:Depot) {
    return this.http.post<Depot>(`${environment.apiUrl}/api/depots`,depot);
}

getComptes() {
  return this.http.get<Depot>(`${environment.apiUrl}/api/depots`);
}
}
