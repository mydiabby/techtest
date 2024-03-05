import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [MatCardModule],
    template: `
    <mat-card>
        <mat-card-content>Bienvenue sur ce site de test. Vous pouvez afficher la liste des utilisateurs et en ajouter de nouveaux.</mat-card-content>
    </mat-card>
  `,
    styles: ``
})
export class HomepageComponent { }
