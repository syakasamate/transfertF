import { AffectationService } from './../../services/affectation.service';
import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/affectation';

@Component({
  selector: 'app-liste-affectation',
  templateUrl: './liste-affectation.component.html',
  styleUrls: ['./liste-affectation.component.scss']
})
export class ListeAffectationComponent implements OnInit {
  affectation:Affectation;
  constructor(private serviceA:AffectationService) { }

  ngOnInit(): void {

      this.serviceA.getAffectation().subscribe(
        data=>{this.affectation=data["hydra:member"]
           console.log(data["hydra:member"])
            });
  }

}

