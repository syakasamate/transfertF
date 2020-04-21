import { AuthentificationService } from './../../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm:FormGroup
  returnUrl: string;
  error = '';
  submitted = false;

  constructor(
    private auth:AuthentificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router)

    {

    if (this.auth.currentUserValue){
      this.router.navigate(['/']);
  }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

}
get f() { return this.loginForm.controls; }

onSubmit(){
  this.submitted = true;

  /*console.warn(this.loginForm.value);
  console.warn(this.loginForm.status);*/
let user={
  username:this.loginForm.value.username,
  password:this.loginForm.value.password,
};

if (this.loginForm.invalid) {
  return;
}

this.auth.getConnexion(user)
.pipe(first())
.subscribe(
    data=>{
     console.log(data);
      this.router.navigate([this.returnUrl]);
    },
    error=>{
      console.log(error);
    }

);

  }



}
