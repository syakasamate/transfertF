import { User } from './models/user';
import { Registre } from './models/registre';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private roles : string[];
  currentUser: User;
  detaille='';
  bool:any
  nom;
    constructor(
        private router: Router,
        private authenticationService: AuthentificationService
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    }
    ngOnInit(): void {
      this.roles= JSON.parse(localStorage.getItem("roles"));
     this.nom= JSON.parse(localStorage.getItem("name"));

   //this.roles= ["ROLE_ADMIN_PARTENAIRE"];
    console.log(this.nom);

    }


    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }



    isAdmin(){
      if(this.roles[0]== "ROLE_ADMIN" || this.roles[0]== "ROLE_SUPER_ADMIN" )return true;
    }
    isPAdmin(){
      if(this.roles[0]== "ROLE_PARTENAIRE" || this.roles[0]== "ROLE_ADMIN_PARTENAIRE" )return true;
    }
    isUserP(){
      if(this.roles[0]== "ROLE_USER_PARTENAIRE" )return true;
    }
    isCaissier(){
      if(this.roles[0]== "ROLE_CAISSIER" )return true;

    }
}
