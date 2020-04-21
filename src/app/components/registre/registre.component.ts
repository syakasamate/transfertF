import { Router } from '@angular/router';
import { Registre } from './../../models/registre';
import { Partenaire } from './../../models/partenaire';
import { PartenaireService } from './../../services/partenaire.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthentificationService } from './../../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { error } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.scss']
})
export class RegistreComponent implements OnInit {
  imageSource;
  role: Role;
  constructor(private service: AuthentificationService, private partservice: PartenaireService, private sanitizer: DomSanitizer,    private router: Router
) { }
  registreForm: FormGroup;




  ngOnInit(): void {




    this.registreForm = new FormGroup({
      Nom: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),


    });
    this.service.getRole()
        // clone the data object, using its known Config shape
        .subscribe(
          data => {this.role = data['hydra:member'];
                 console.log(data['hydra:member']
            );});


    }

    addregistre() {
      console.log(this.registreForm.value);
      this.service.register(this.registreForm.value).subscribe(
        data => {

          console.log(data);


        },
        error => {
            console.log(error);
        }
      );
      this.router.navigate(['listeUsers']);

    }

}
