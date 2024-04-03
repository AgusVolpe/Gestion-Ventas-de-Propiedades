import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosModule } from './productos/productos.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ReservasModule } from './reservas/reservas.module';
import { MaterialModule } from './shared/material/material.module';
import { NavbarModule } from './navbar/navbar.module';
import { ReportesComponent } from './reportes/reportes.component';
import { ReportesModule } from './reportes/reportes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    ProductosModule,
    ReservasModule,
    NavbarModule,
    ReportesModule,
    HttpClientModule,
    AuthModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
