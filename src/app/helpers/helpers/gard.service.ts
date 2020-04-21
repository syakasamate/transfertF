import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GardService  implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthentificationService
) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
  }


}


