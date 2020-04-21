import 'rxjs/Rx';
import { FormGroup, FormControl } from '@angular/forms';
import { Registre } from './../../models/registre';
import { ListeUserService } from './../../services/liste-user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss']
})
export class ListeUserComponent implements OnInit {
  registre:Registre;


  filteredEmployees = [];
  searchForm: FormGroup;

  constructor( private service:ListeUserService) { }

  ngOnInit(): void {


  this.searchForm = new FormGroup({
      'search': new FormControl()
  });

  this.searchForm.get('search').valueChanges
      .subscribe(
          value => {
            this.filteredEmployees = this.filterEmployees(value);
          }
      );





    this.searchForm = new FormGroup({
      searchText: new FormControl(''),

    });
    this.service.getAll().subscribe(
      data=>{this.registre=data["hydra:member"]
         console.log(data["hydra:member"]
        )});
  }



  filterEmployees(value) {
    let found = [];
      Observable.from(this.registre)
        .filter(
            person => person.Nom.toLowerCase().search(value.toLowerCase()) !== -1
        )
        .subscribe(
            emp => {
                found.push(emp);
            }
        );

      return found;
  }







  showRegistre(){
    this.service.getAll().subscribe(
      data=>{ console.log(data);

        });
  }


  imageSource1(registre){
    if(registre.image){
     return this.service.showImage(registre);
  }else{
    return null;
  }
}

bloquer(e)
{
this.service.updateUser(e).subscribe(

  data=>{
    console.log(data);
  },
  error=>{
    console.log(error);
  }
);

}
}
