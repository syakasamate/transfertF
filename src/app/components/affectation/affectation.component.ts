import { User } from './../../models/user';
import { AffectationService } from './../../services/affectation.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ListeUserService } from 'src/app/services/liste-user.service';
import { ListeCompteService } from 'src/app/services/liste-compte.service';
import { Compte } from 'src/app/models/compte';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.scss']
})
export class AffectationComponent implements OnInit {
  affectationForm:FormGroup;
  user:User;
  compte:Compte;
  constructor( private serviceA:AffectationService,private serviceU:ListeUserService, private serviceC:ListeCompteService) {

   }

  ngOnInit(  ): void {

    this.affectationForm = new FormGroup({
      dateFin: new FormControl(''),
      users: new FormControl(''),
      comptes: new FormControl('')
  });
  this.serviceU.getAll()
        // clone the data object, using its known Config shape
        .subscribe(
          data => {this.user= data['hydra:member'];
                 console.log(data['hydra:member']
            );});

            this.serviceC.getAll()
            // clone the data object, using its known Config shape
            .subscribe(
              data => {this.compte= data['hydra:member'];
                     console.log(data['hydra:member']
                );});


    }

ajoutAffectation() {
  console.log(this.affectationForm.value);
  this.serviceA.addAffectation(this.affectationForm.value).subscribe(
    data => {
      console.log(data);
    },
    error => {
        console.log(error);
    }
  );

}

}

