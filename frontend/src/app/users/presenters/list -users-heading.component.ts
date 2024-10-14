import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
    standalone: true,
    selector: 'app-list-users-heading',
    imports: [MatButtonModule, MatIconModule],
    template: `
        <h1>📄 Liste des utilisateurs @if (total !== undefined){({{ total }})}</h1>
        <button mat-fab extended color="error" (click)="addClick.emit()">
            <mat-icon>add</mat-icon>
            Ajouter un utilisateur
        </button>
    `,
    styles: [
        `h1 {
            font-size: 1.5em;
        }`
    ]
})
export class ListUsersHeadingComponent {

    @Input()
    total?: number
    
    @Output()
    addClick = new EventEmitter<void>()
}