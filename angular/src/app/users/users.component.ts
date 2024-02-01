import { AfterViewInit, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Sort, MatSortModule} from '@angular/material/sort';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatSortModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {


  users: User[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'edit'];

  dataSource: WritableSignal<User[]> = signal([]);

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.set(this.users);
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
    this.dataSource.set(sortedData);

  }

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    try {
      this.userService.getAll().subscribe(users => {
        this.users = users;
        this.dataSource.set(this.users);
        this.sortData({direction: 'asc', active: 'lastName'});
      } );

    } catch (error) {
    }

  }

  userDelete(userid: number) {
    console.log('user delete ', userid);

    this.userService.delete(userid).subscribe(_ => {
      console.log('delete');
      this.users = this.users.filter(u => u.id !== userid);
      this.dataSource.set(this.users);
      this.sortData({direction: 'asc', active: 'lastName'});
    });
  }

}
