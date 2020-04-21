import { ListeAffectationComponent } from './components/liste-affectation/liste-affectation.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { DepotComponent } from './components/depot/depot.component';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { CompteComponent } from './components/compte/compte.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistreComponent } from './components/registre/registre.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { GardService } from './helpers/helpers/gard.service';
import { ListeCompteComponent } from './components/liste-compte/liste-compte.component';
import { ListeTransactionComponent } from './components/liste-transaction/liste-transaction.component';
import { AffectationComponent } from './components/affectation/affectation.component';


const routes: Routes = [
  {path:'listeAffectations',component:ListeAffectationComponent},
  {path:'affectation',component:AffectationComponent},
  {path:'listeTransaction',component:ListeTransactionComponent},
  {path:'transaction',component:TransactionComponent},

  {path:'depot',component:DepotComponent},
  {path:'listeCompte', component:ListeCompteComponent},
  {path:'listeUsers',component:ListeUserComponent},
  {path:'compte',component:CompteComponent},
  {path:'',component:AcceuilComponent, canActivate:[GardService]},
  {path:'login', component:ConnexionComponent},
  {path:'registre',component:RegistreComponent},

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
