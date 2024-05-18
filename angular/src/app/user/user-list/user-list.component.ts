import {UserService} from "../user.service";
import {User} from "../../models/user.model";
import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {merge, of, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserAddComponent} from "../add-or-edit-user/add-or-edit-user.component";
import {MatIconModule} from "@angular/material/icon";


interface Params {
  page: number,
  perPage: number,
  order: { [key: string]: "asc" | "desc" | "" };
}

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSort,
    MatSortModule,
    MatButton,
    MatIconModule
  ],
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})

export class UserListComponent implements AfterViewInit {
  params: Params = {
    page: 1,
    perPage: 20,
    order: {
      firstName: "asc",
      lastName: "asc"
    }
  };
  pageSizeOptions = [20, 5, 10, 20];
  displayedColumns: string[] = ["id", "firstName", "lastName", " "];
  dataSource = new MatTableDataSource<User>();
  data: { totalUserCount: number; users: User[] } = {totalUserCount: 0, users: []};
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.data = {totalUserCount: 0, users: []};
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const criteria = this.sort.active;
          if (criteria) {
            this.params.order[criteria] = this.sort.direction;
          }
          const params = {
            page: this.paginator.pageIndex + 1,
            perPage: this.paginator.pageSize,
            order: JSON.stringify(this.params.order)
          };

          return this.userService.getUsers(params).pipe(
            catchError(() => observableOf(null))
          );
        }),
        map((data: { totalUserCount: number, users: User[] } | null) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.totalUserCount;
          return data.users;
        })
      )
      .subscribe((data: User[]) => (this.dataSource.data = data));
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(UserAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (newUser: User) => {
        this.userService.addUser(newUser).pipe(
          catchError(error => {
            return of(null);
          })
        ).subscribe(user => {
          if (user) {
            this.dataSource.data.push(user)
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    );
  }

  updateUser(user: User) {
    const {firstName, lastName, id} = user;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      firstName,
      lastName,
      id
    };

    const dialogRef = this.dialog.open(UserAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (user: User) => {
        const {id} = user;
        this.userService.updateUser(user, id).subscribe(updateUser => {
          this.dataSource.data = this.dataSource.data.map(user => user.id === id ? updateUser : user);
        });
      }
    );
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
       this.dataSource.data = this.dataSource.data.filter(user => Number(user?.id) !== userId);
    });
  }
}


