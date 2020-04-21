import { FilterPipe } from './components/liste-user/filter.pipe';
import { jsPDF } from 'jspdf';
import { CompteComponent } from './components/compte/compte.component';
import { NgModule } from '@angular/core';
import { ErrorInterceptorService } from './helpers/helpers/error-interceptor.service';
import { JwtinterceptorService } from './helpers/helpers/jwtinterceptor.service';
import { BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistreComponent } from './components/registre/registre.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { ListeCompteComponent } from './components/liste-compte/liste-compte.component';
import { DepotComponent } from './components/depot/depot.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ListeTransactionComponent } from './components/liste-transaction/liste-transaction.component';
import { AffectationComponent } from './components/affectation/affectation.component';
import { ListeAffectationComponent } from './components/liste-affectation/liste-affectation.component';


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    ConnexionComponent,
    LoginFormComponent,
    RegistreComponent,
    AcceuilComponent,
    CompteComponent,
    ListeUserComponent,
    ListeCompteComponent,
    DepotComponent,
    TransactionComponent,
    ListeTransactionComponent,
    AffectationComponent,
    ListeAffectationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtinterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
