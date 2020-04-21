import { Compte } from './../../models/compte';
import { Component, OnInit } from '@angular/core';
import { ListeCompteService } from 'src/app/services/liste-compte.service';

@Component({
  selector: 'app-liste-compte',
  templateUrl: './liste-compte.component.html',
  styleUrls: ['./liste-compte.component.scss']
})
export class ListeCompteComponent implements OnInit {
  compte:Compte;

  constructor(private service:ListeCompteService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      data=>{this.compte=data["hydra:member"]
         console.log(data["hydra:member"])

       //  this.imageSource=this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`
        });
  }

}
