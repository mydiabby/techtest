import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator'

@Component({
    standalone: true,
    selector: 'app-users-pagination',
    imports: [MatPaginatorModule],
    providers: [
        {
            provide: MatPaginatorIntl,
            useFactory: () => {
                const intl = new MatPaginatorIntl()
                intl.firstPageLabel = 'Première page'
                intl.lastPageLabel = 'Dernière page'
                intl.itemsPerPageLabel = 'Élements par page'
                intl.previousPageLabel = 'Page précédente'
                intl.nextPageLabel = 'Page suivante'
                intl.getRangeLabel = (page, itemsPerPage, total) => {
                    const offset = page * itemsPerPage
                    return `${Math.min(offset + 1, total)} - ${Math.min(offset + itemsPerPage, total)} sur ${total}`
                }
                return intl
            }
        }
    ],
    template: `
        <mat-paginator 
            [length]="total"
            [pageSize]="itemsPerPage"
            [pageSizeOptions]="itemsPerPageOptions"
            [disabled]="disabled"
            (page)="onPageEvent($event)"
            nextPageLabel="Page suivante"
            lastPageLabel="Dernière page"
            firstPageLabel="Première page"
            previousPageLabel="Page précédente"
            itemsPerPageLabel="Items par page"
            aria-label="Sélectionnez une page">
        </mat-paginator>
    `,

})
export class UsersPaginationComponent<N extends number> {

    @Output()
    itemsPerPageChange = new EventEmitter<N>()

    @Output()
    pageChange = new EventEmitter<number>()

    @Input()
    itemsPerPageOptions!: readonly N[]

    @Input()
    itemsPerPage!: number

    @Input()
    page!: number

    @Input()
    total!: number

    @Input()
    disabled = false

    onPageEvent(event: PageEvent): void {
        if (event.pageSize !== this.itemsPerPage){
            this.itemsPerPageChange.emit(event.pageSize as N)
            return
        }
        if (event.pageIndex !== this.page)
            this.pageChange.emit(event.pageIndex)
    }
}