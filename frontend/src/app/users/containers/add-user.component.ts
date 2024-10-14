import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { AddUserStore } from '../state/add.store'
import { AddUserFormComponent, SubmitEvent } from '../presenters/add-user-form.component'
import { AsyncPipe } from '@angular/common'
import { Subscription } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { AddUserHeadingComponent } from '../presenters/add-user-heading.component'

/**
 * Conteneur de la fonctionnalité d'ajout d'utilisateurs.
 */
@Component({
    standalone: true,
    imports: [AddUserFormComponent, AddUserHeadingComponent, AsyncPipe],
    selector: 'app-add-user',
    template: `
        <app-add-user-heading (back)="navigateBack()"></app-add-user-heading>
        @let creation = (creation$ | async)!;
        <app-add-user-form 
            (submitted)="formSubmit($event)" 
            [disabled]="['adding', 'done'].includes(creation.step)">
        </app-add-user-form>
    `,
    styles: [
        `h1 {
            font-size: 1.5em;
        }`
    ]
})
export class AddUserComponent implements OnInit, OnDestroy {

    readonly creation$ = this.store.creation()

    private readonly snackBar = inject(MatSnackBar)
    
    subscriptions: Subscription[] = []

    constructor(private readonly store: AddUserStore, private readonly router: Router){}
    
    ngOnInit(): void {
        this.store.start()
        this.subscriptions.push(
            this.creation$
                .subscribe(state => {
                    if (state.step === 'error'){
                        switch (state.error){
                            case 'already-exists':
                                this.snackMessage('Cet utilisateur existe déjà !')
                                break
                            default:
                                this.snackMessage('Une erreur est survenue...')
                                break
                        }
                    }
                }),
            this.store.created().subscribe(user => {
                this.snackMessage(`L'utilisateur ${user.fullname} a été ajouté avec succès. Redirection en cours...`)
                setTimeout(() => this.navigateToUsers(), 3000)
            })
        )
    }

    ngOnDestroy(): void {
        for (const s of this.subscriptions)
            s.unsubscribe()
    }

    formSubmit(event: SubmitEvent): void {
        this.store.add(event)
    }

    navigateBack(): void {
        this.navigateToUsers()
    }

    private navigateToUsers(): void {
        this.router.navigateByUrl('/users')
    }

    private snackMessage(message: string){
        this.snackBar.open(message, undefined, {
            duration: 3000
        })
    }
}