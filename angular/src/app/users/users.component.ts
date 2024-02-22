import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule, MatTooltipModule, MatIconModule, MatSortModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent  {

  private userService = inject(UserService);

  usersResult = this.userService.queryGetAll();
  users = this.usersResult.result;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'edit'];

  dataSource: User[] = [];
  currentSort: Sort|null = null;



  sortData(sort: Sort) {
    const data = this.users().data;
    if (!data) return;

    this.currentSort = sort;
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = sortedData;

  }

  constructor() {
    effect(() => {

      const usersResult = this.users();
      const data = usersResult.data;
      console.log('getting data', data);

      if (data) {
        this.dataSource = data;
      }
    })
  }

  userDelete(userid: number) {
    console.log('user delete ', userid);

    this.userService.delete(userid).subscribe(_ => {
      console.log('deleted');
    });
  }

}
