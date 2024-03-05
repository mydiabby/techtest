import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortCriteria } from '../../types';

@Injectable({ providedIn: 'root' })
export class SortService {
  private sortCriteria$ = new BehaviorSubject<SortCriteria[]>([]);

  get sortCriteria(): Observable<SortCriteria[]> {
    return this.sortCriteria$.asObservable();
  }

  setSortCriteria(criteria: SortCriteria[]) {
    this.sortCriteria$.next(criteria);
  }

  addSortCriterion(property: string, direction: 'ASC' | 'DESC') {
    const currentCriteria = this.sortCriteria$.value;
    const existingIndex = currentCriteria.findIndex(
      c => c.property === property,
    );

    if (existingIndex !== -1) {
      // Update existing criterion
      currentCriteria[existingIndex].direction = direction;
    } else {
      // Add new criterion
      currentCriteria.push({ property, direction });
    }

    this.sortCriteria$.next(currentCriteria);
  }

  /**
   * Checks if a specific property is currently used for sorting and returns its direction.
   * @param property The property to check.
   * @returns The direction ('ASC' or 'DESC') if the property is used for sorting, or 'null' otherwise.
   */
  getSortDirection(property: string): 'ASC' | 'DESC' | null {
    const criteria = this.sortCriteria$.value;
    const matchingCriterion = criteria.find(c => c.property === property);
    return matchingCriterion ? matchingCriterion.direction : null;
  }

  getSortString(): string {
    return this.sortCriteria$.value
      .map(c => `${c.property}:${c.direction}`)
      .join(',');
  }
}
