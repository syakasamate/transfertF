import { AuthentificationService } from 'src/app/services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  constructor(private service:AuthentificationService) { }

  ngOnInit(): void {
  }

  role: Role;

showRoles() {
  this.service.getRole()
    // clone the data object, using its known Config shape
    .subscribe(
      data=>{this.role=data["hydra:member"]
      console.log(data["hydra:member"]
        )});
}
}
