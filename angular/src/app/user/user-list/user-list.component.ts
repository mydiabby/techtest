import {UserService} from "../user.service";
import {User} from "../../models/user.model";
import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButton} from "@angular/material/button";


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
    MatButton
  ],
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})

export class UserListComponent implements AfterViewInit {
  params: Params = {
    page: 1,
    perPage: 2,
    order: {
      firstName: "asc",
      lastName: "asc"
    }
  };
  pageSizeOptions = [2, 5, 10, 20];
  displayedColumns: string[] = ["id", "firstName", "lastName"];
  data = [{}];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  constructor(private userService: UserService) {
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
        map((data : {totalUserCount: number, users:  User[]}| null) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.totalUserCount;
          return data.users;
        })
      )
      .subscribe(data => (this.data = data));
  }
}


