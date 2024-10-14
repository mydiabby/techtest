import { Component, Input } from '@angular/core'
import { User } from '../models/user'
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { RouterLink } from '@angular/router'

export type UsersDataSource =
    | Readonly<{
        state: 'loading'
    }>
    | Readonly<{
        state: 'loaded',
        users: readonly User[]
    }>
    | Readonly<{
        state: 'error'
        error: Error
    }>

@Component({
    standalone: true,
    selector: 'app-users-table',
    imports: [MatTableModule, MatProgressSpinnerModule, RouterLink],
    template: `
        @switch (data.state) {
            @case ('loaded'){
                @if (data.users.length > 0){
                    <table 
                        mat-table
                        [trackBy]="track"
                        [dataSource]="data.users"
                    >
                        <ng-container matColumnDef="lastname">
                            <th mat-header-cell *matHeaderCellDef>Nom</th>
                            <td mat-cell *matCellDef="let user"> {{user.lastname}} </td>
                        </ng-container>
                        <ng-container matColumnDef="firstname">
                            <th mat-header-cell *matHeaderCellDef>Prénom</th>
                            <td mat-cell *matCellDef="let user"> {{user.firstname}} </td>
                        </ng-container>
                        <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
                        <tr mat-row *matRowDef="let myRowData; columns: columnsToDisplay"></tr>

                    </table>
                } @else {
                    <p>Il n'y aucun utilisateurs pour l'instant...</p>
                }
            }
            @case ('loading'){
                <mat-spinner [diameter]="32"></mat-spinner>
            }
            @case ('error'){
                <p>Une erreur est survenue lors du chargement des données ({{ data.error.message }})... 😞</p>
            }
        }
    `,
    styles: [
        `:host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }`
    ]
})
export class UsersTableComponent {

    columnsToDisplay = ['lastname', 'firstname']

    @Input()
    data: UsersDataSource = { state: 'loading' }

    track(_i: number, user: User): number {
        return user.id
    }
}