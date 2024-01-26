import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetFullNamesOfAllUsers } from '../state/user.actions';
import { UserSelectors } from '../state/user.selectors';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltip,
    MatTableModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatPaginatorModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements AfterViewInit{
  @Select(UserSelectors.isLoading)
  isLoading$: Observable<boolean>;

  @Select(UserSelectors.getFullNamesOfAllUsers)
  getFullNamesOfAllUsers$: Observable<string[]>;

  dataSource = new MatTableDataSource<string>();

  columns: string[] = ['fullName'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  noResults = true;

  ngAfterViewInit() {
    this._actions$.pipe(
      ofActionSuccessful(GetFullNamesOfAllUsers)
    ).subscribe((): void => {
      this.dataSource.paginator = this.paginator
    });
  }

  constructor(
    private readonly _actions$: Actions,
    private _router: Router,
    private _store: Store) {
      this.getFullNamesOfAllUsers$.subscribe(fullNames => {
        this.noResults = fullNames.length === 0;
        this.dataSource = new MatTableDataSource(fullNames);
      });
  }

  ngOnInit()  {
    this._store.dispatch(new GetFullNamesOfAllUsers()).subscribe();
  }

  async addUser() {
    this._router.navigate(['users', 'add']);
  }
}
