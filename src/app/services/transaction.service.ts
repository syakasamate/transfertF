import { Transaction } from './../models/transaction';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  addTransaction(transaction:Transaction) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post(`${environment.apiUrl}/api/transactions`,transaction,httpOptions);
}

getTransaction() {
  return this.http.get<Transaction>(`${environment.apiUrl}/api/transactions`);
}

codeRetrait(code){
  return this.http.get<any>(`${environment.apiUrl}/api/transactions?code=${code}`);
}



retrait(transaction:Transaction) {

  return this.http.put<Transaction>(`${environment.apiUrl}/api/transactions/${transaction.id}`,transaction)

}


}
