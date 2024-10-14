import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

const emojis = ['🥷', '🧑🏽‍🍳', '🫅', '🧞', '🧑🏽‍🔬', '🧑🏽‍🚒', '🧑‍✈️', '🧑‍🚀', '🧑‍🎨', '👷🏽‍♂️', '🧙‍♂️', '🧑🏿‍🔧', '👨🏿‍⚕️', '🧑‍💼', '🦹', '🧑‍🌾']

@Component({
    standalone: true,
    imports: [MatButtonModule],
    selector: 'app-add-user-heading',
    template: `
        <button mat-button (click)="back.emit()">Retour...</button>
        <h1>{{ emoji }} Nouvel utilisateur</h1>
    `,
    styles: [
        `h1 {
            font-size: 1.5em;
        }`,
        `a {
            font-size: 0.75em;
        }`
    ]
})
export class AddUserHeadingComponent implements OnInit {

    @Output()
    back = new EventEmitter<void>()
    
    emoji!: string

    ngOnInit(): void {
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)]
    }
}