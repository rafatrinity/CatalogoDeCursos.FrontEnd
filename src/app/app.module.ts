import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ConsultasService } from './services/consultas.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    CommonModule,
    AppRoutingModule,
    CoreModule,
    SharedModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    AppService,
    ConsultasService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
