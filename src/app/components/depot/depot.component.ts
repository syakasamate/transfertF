import { DepotService } from './../../services/depot.service';
import { Compte } from './../../models/compte';
import { ListeCompteService } from 'src/app/services/liste-compte.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {
  depotForm:FormGroup;
   compte:Compte;


  constructor(private service:ListeCompteService,private servicedepot:DepotService ) { }

  ngOnInit(): void {
    this.depotForm = new FormGroup({
      montant: new FormControl(''),
      compte: new FormControl(''),
     });
     this.service.getAll()
     // clone the data object, using its known Config shape
     .subscribe(
       data=>{this.compte=data["hydra:member"]
       console.log(data["hydra:member"]
         )});

}


adddepot(){
  console.log(this.depotForm.value);
  this.servicedepot.addDepot(this.depotForm.value).subscribe(
    data=>{
      console.log(data);
    },
    error=>{
        console.log(error);
    }
  )

}

}

