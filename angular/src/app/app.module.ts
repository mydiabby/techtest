import { HttpClientModule } from '@angular/common/http'; // Pour les requêtes HTTP
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Pour les Reactive Forms

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

//Prime Angular
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule, // Import ReactiveFormsModule
    HttpClientModule, // Import HttpClientModule
    RouterModule.forRoot(routes), // Configuration des routes,
    RouterLink,
    MenuModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
