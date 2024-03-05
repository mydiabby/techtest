import { Pipe, PipeTransform } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

@Pipe({
    name: 'sort',
    standalone: true
})
export class SortPipe implements PipeTransform {

    transform(value: any[], sortKey: string, sortOrder?: SortOrder): any[] {

        if (value.length === 0) return [];

        return value.sort((a, b) => {

            if (typeof a[sortKey] === undefined) return 0;
            const aValue = typeof a[sortKey] === 'string' ? a[sortKey].toLowerCase() : a[sortKey];
            const bValue = typeof b[sortKey] === 'string' ? b[sortKey].toLowerCase() : b[sortKey];

            if (sortOrder === 'desc') {
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            } else {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            }

        });
    }

}
