import { User } from './../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from './../../models/transaction';
import { CompteService } from './../../services/compte.service';
import { TransactionService } from './../../services/transaction.service';
import { Compte } from './../../models/compte';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListeCompteService } from 'src/app/services/liste-compte.service';
import * as jsPDF from 'jspdf'


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  name = 'Recu Kodo Transfert';
  marked = false;
  theCheckbox = false;
oui=false;
ok=false;
retusult;
  trouve;
  telEnv;
  montant;
  prenomEnv;
  nomEnv;
  prenomBenef;
  nomBenef;
  telBenef;
  codeEnv;
  dateEnv;
  dateRet;
  cni;
  id;
roles;

user=true;



  transactionForm :FormGroup;
  comptesEn:Compte;
  transaction:Transaction;
  constructor( private serviceTrans:TransactionService, private serviceCompte:ListeCompteService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.roles= JSON.parse(localStorage.getItem("roles"));
console.log(this.roles);
    this.transactionForm = new FormGroup({
      code: new FormControl(''),
      telEnv: new FormControl(''),
      montant: new FormControl(''),
      prenomEnv: new FormControl(''),
      nomEnv: new FormControl(''),
      prenomBenef: new FormControl(''),
      nomBenef: new FormControl(''),
      telBenef: new FormControl(''),
      comptesEnv: new FormControl(''),
      comptesRet: new FormControl(''),
      cnibenef: new FormControl(''),
      theCheckbox: new FormControl(''),


    })

    if(this.user){
      console.log('ok');
    }

    this.serviceCompte.getAll()
    // clone the data object, using its known Config shape
    .subscribe(
      data => {this.comptesEn = data['hydra:member'];
             console.log(data['hydra:member']
        );});
        this.coderetrait();
  }

  isUserP(){
    if(this.roles[0]=="ROLE_USER_PARTENAIRE"){
      this.user=true;
      return true;
    }

  }



  coderetrait()
  {

    this.transactionForm.get('code').valueChanges.subscribe(val=>
      {


      this.serviceTrans.codeRetrait(val).subscribe(
        data=>
        {
          console.log(this.transaction=data["hydra:member"]);
          console.log(data["hydra:member"][0]);
         if(data["hydra:member"][0])
          {



           this.transactionForm.get('telEnv').disable();
           this.transactionForm.get('montant').disable();
           this.transactionForm.get('prenomEnv').disable();
           this.transactionForm.get('nomEnv').disable();
           this.transactionForm.get('prenomBenef').disable();
           this.transactionForm.get('nomBenef').disable();
           this.transactionForm.get('telBenef').disable();

           this.id=data["hydra:member"][0].id;


           this.telEnv=data["hydra:member"][0].telEnv;
           this.montant=data["hydra:member"][0].montant;
           this.prenomEnv=data["hydra:member"][0].prenomEnv;
           this.nomEnv=data["hydra:member"][0].nomEnv;
           this.prenomBenef=data["hydra:member"][0].prenomBenef;
           this.nomBenef=data["hydra:member"][0].nomBenef;
            this.telBenef=data["hydra:member"][0].telBenef;
            this.codeEnv=data["hydra:member"][0].code;
            this.dateEnv=data["hydra:member"][0].dateEnv;





         // this.iripart=(data["hydra:member"][0].partenaires['@id']);


          this.trouve=1;

          }else{
            this.transactionForm.get('telEnv').enable();
           this.transactionForm.get('montant').enable();
           this.transactionForm.get('prenomEnv').enable();
           this.transactionForm.get('nomEnv').enable();
           this.transactionForm.get('prenomBenef').enable();
           this.transactionForm.get('nomBenef').enable();
           this.transactionForm.get('telBenef').enable();


           this.telEnv="";
           this.montant=""
           this.prenomEnv=""
           this.nomEnv=""
           this.prenomBenef=""
           this.nomBenef=""
            this.telBenef=""
          }


        });

          }

      );

    }






  ajoutTransaction() {
    const r = {} as Transaction;
    const tu = {} as Transaction;
    tu.id=this.id;
    tu.montant=this.montant;


    r.id=this.id;
    r.montant=this.montant;
    r.comptesRet=this.transactionForm.value.comptesRet;
    this.cni=this.transactionForm.value.cnibenef;


    if(!this.trouve){
      this.telEnv=this.transactionForm.value.telEnv;
      this.montant=this.transactionForm.value.montant;
      this.prenomEnv=this.transactionForm.value.prenomEnv;
      this.nomEnv=this.transactionForm.value.nomEnv;
      this.prenomBenef=this.transactionForm.value.prenomBenef;
      this.nomBenef=this.transactionForm.value.nomBenef;
       this.telBenef=this.transactionForm.value.telBenef;

    console.log(this.transactionForm.value);





if(this.roles[0]=="ROLE_USER_PARTENAIRE"){
  const t ={} as Transaction;
  t.telEnv=this.transactionForm.value.telEnv;
 t.montant= this.transactionForm.value.montant;
 t.prenomEnv= this.transactionForm.value.prenomEnv;
 t.nomEnv= this.transactionForm.value.nomEnv;
 t.prenomBenef= this.transactionForm.value.prenomBenef;
t.nomBenef= this.transactionForm.value.nomBenef;
  t.telBenef=this.transactionForm.value.telBenef;


  this.serviceTrans.addTransaction(t).subscribe(
    data => {
      this.oui=true;
      //console.log(data.value.code);
     // console.log(data.code);
      this.ok=true;


    },
    error => {
     //   console.log(error);
    }
  );

  console.log('merci');

}
else{
    this.serviceTrans.addTransaction(this.transactionForm.value).subscribe(
      data => {
        this.oui=true;
        //console.log(data.value.code);
       // console.log(data.code);
        this.ok=true;


      },
      error => {
          console.log(error);
      }
    );
    }
  }else{

    if(this.roles[0]=="ROLE_USER_PARTENAIRE"){
      this.serviceTrans.retrait(tu).subscribe(
        data => {
          this.dateRet=data.dateRetret;

          console.log(data);
          this.retusult=data.telBenef;
          this.ok=true;
          console.log(this.ok);
        },
        error => {

          console.log(error);

      }
      );
    }else{

    this.serviceTrans.retrait(r).subscribe(
      data => {
        this.dateRet=data.dateRetret;

        console.log(data);
        this.retusult=data.telBenef;
        this.ok=true;
        console.log(this.ok);
      },
      error => {

        console.log(error);

    }
    );
   console.log(r.comptesRet=this.transactionForm.value.comptesRet);

  }
  }
}




toggleVisibility(e){
  this.marked= e.target.checked;
  console.log(this.marked);
}

@ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;


 downloadAsPDF() {
  this.router.navigate(['/']);

  const doc = new jsPDF();

  const specialElementHandlers = {
    '#editor': function (element, renderer) {
      return true;
    }
  };

  const pdfTable = this.pdfTable.nativeElement;

  doc.fromHTML(pdfTable.innerHTML, 15, 15, {
    width: 190,
    'elementHandlers': specialElementHandlers
  });
  doc.save('Recu.pdf');

}


}
