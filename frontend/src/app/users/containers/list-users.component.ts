import { Component, OnInit } from '@angular/core'
import { UsersDataSource, UsersTableComponent } from '../presenters/users-table.component'
import { UsersPaginationComponent } from '../presenters/users-pagination.component'
import { ItemsPerPage, itemsPerPageOptions, CurrentPage, UsersPaginationStore } from '../state/pagination.store'
import { AsyncPipe } from '@angular/common'
import { ListUsersHeadingComponent } from '../presenters/list -users-heading.component'
import { Router } from '@angular/router'

/**
 * Conteneur de la fonctionnalité de listing des utilisateurs.
 */
@Component({
    standalone: true,
    selector: 'app-list-users',
    imports: [ListUsersHeadingComponent, UsersTableComponent, UsersPaginationComponent, AsyncPipe],
    template: `
        @let page = (page$ | async)!;
        @let params = (params$ | async)!;
        @let total =  pageStateToTotal(page);
        <app-list-users-heading 
            (addClick)="goToAdd()"
            [total]="total">
        </app-list-users-heading>
        <app-users-table
            [data]="pageStateToDataSource(page)"
        ></app-users-table>
        <app-users-pagination
            [itemsPerPageOptions]="itemsPerPageOptions"
            [itemsPerPage]="params.itemsPerPage"
            [disabled]="page.step === 'loading'"
            [page]="params.currentPage"
            [total]="pageStateToTotal(page) || 0"
            (itemsPerPageChange)="itemsPerPageChange($event)"
            (pageChange)="pageChange($event)"
        ></app-users-pagination>
    `,
    styles: [
        `:host {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }`
    ]
})
export class ListUsersComponent implements OnInit {

    readonly itemsPerPageOptions = itemsPerPageOptions

    readonly page$ = this.usersPaginationStore.page()

    readonly params$ = this.usersPaginationStore.params()

    constructor(
        private readonly usersPaginationStore: UsersPaginationStore,
        private readonly router: Router
    ){}

    ngOnInit(): void {
        this.usersPaginationStore.load()
    }

    itemsPerPageChange(itemsPerPage: ItemsPerPage): void {
        this.usersPaginationStore.load({ itemsPerPage })
    }

    pageChange(page: number): void {
        this.usersPaginationStore.load({ page })
    }

    pageStateToDataSource(state: CurrentPage): UsersDataSource {
        switch (state.step){
            case 'loaded':
                return {
                    state: 'loaded',
                    users: state.page.items
                }
            case 'error':
                return {
                    state: 'error',
                    error: state.error
                }
            case 'loading':
                return {
                    state: 'loading'
                }
        }
    }

    pageStateToTotal(state: CurrentPage): number|undefined {
        switch (state.step){
            case 'loaded':
                return state.page.total
            case 'loading':
                return state.rememberedTotal
        }
        return undefined
    }

    goToAdd(){
        this.router.navigateByUrl('/users/add')
    }
}