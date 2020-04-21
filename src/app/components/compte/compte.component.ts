import { Partenaire } from './../../models/partenaire';
import { Compte } from './../../models/compte';
import { CompteService } from './../../services/compte.service';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {


  ok=false;
  trouve;
  compteForm:FormGroup;
  comptePartE:FormGroup;
    compte:Compte;
    rc:any;
    Nom:any;
    username:any;
    password:any;
    iripart:any;

    date;
   contrat;
   article;
   numc;
   createur;
  constructor(private compteservice:CompteService) { }

  ngOnInit(): void {
  this.trouve=0;
    this.compteForm=new FormGroup({
         depots:new FormGroup({
          montant:new FormControl(),
            }),
      partenaires:new FormGroup({
        ninea:new FormControl(''),
        rc:new FormControl(''),
        users:new FormGroup
         ({
            username: new FormControl(''),
            password:new FormControl(''),
            isActive:new FormControl('true'),
            Nom: new FormControl(''),
          })
      }),
    });
    this.exicte();

  }





exicte()
{

  this.compteForm.get('partenaires.ninea').valueChanges.subscribe(val=>
    {

    this.compteservice.postComptEx(val).subscribe(
      data=>
      {
        console.log(this.compte=data["hydra:member"]);
        if(data["hydra:member"][0])
        {""
          this.compteForm.get('partenaires.users').disable();
         this.compteForm.get('partenaires.rc').disable();


        this.iripart=(data["hydra:member"][0].partenaires['@id']);


         this.rc=data["hydra:member"][0].partenaires.rc;
         this.Nom=data["hydra:member"][0].partenaires.users[0].Nom;
         this.username=data["hydra:member"][0].partenaires.users[0].username;
         this.password=data["hydra:member"][0].partenaires.users[0].password;




        this.trouve=1;

        }else{
          this.compteForm.get('partenaires.users').enable();
          this.compteForm.get('partenaires.rc').enable();

        this.rc="";
         this.Nom="";
         this.username="";
         this.password="";






        }


      })

        }

    );

  }


  addcompte(){

       const r= {} as Compte;
  r.partenaires=this.iripart,

  r.depots=[{
    montant:this.compteForm.value.depots.montant
  }]

    if(!this.trouve){
    const re= {} as Compte;
    re.depots=[{montant:this.compteForm.value.depots.montant}];

    re.partenaires={
      ninea:this.compteForm.value.partenaires.ninea,
      rc:this.compteForm.value.partenaires.rc,
      users:[{
        username:this.compteForm.value.partenaires.users.username,
        password: this.compteForm.value.partenaires.users.password,
        isActive: true,
        Nom:this.compteForm.value.partenaires.users.Nom
      }]
  };
    console.log(re);
    console.log(this.compteForm.value);
 this.compteservice.postCompte(re).subscribe(
      data=>{
        //this.contrat=data;
        this.ok=true;
        console.log(data);
        console.log(this.numc =data["numero de compte"]);
        console.log(this.date =data["date contrat"].date);
        console.log(this.createur =data["createur de de comte"]);
        console.log(this.article =data["les les Articles"]);


      },
      error=>{
        console.log(error);
      }
    )

  }else{

  this.compteservice.postCompte(r).subscribe(
    data=>{
      console.log(data)
    });

 }
  }



  @ViewChild('pdfTable', {static: false}) pdfTable:ElementRef;
 downloadAsPDF() {
 // this.router.navigate(['/']);
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

