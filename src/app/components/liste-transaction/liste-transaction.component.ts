import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-liste-transaction',
  templateUrl: './liste-transaction.component.html',
  styleUrls: ['./liste-transaction.component.scss']
})
export class ListeTransactionComponent implements OnInit {
transaction:Transaction;
  constructor(private serviceTrans:TransactionService) {

   }

  ngOnInit(): void {
    this.serviceTrans.getTransaction().subscribe(
      data=>{this.transaction=data["hydra:member"]
         console.log(data["hydra:member"])

       //  this.imageSource=this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`
        });
  }

}
