import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserData, UsersDataResponse } from '../../types';
import { SharedModule } from '../shared/shared.module';
import {
  debounceTime,
  combineLatest,
  BehaviorSubject,
  Subscription,
} from 'rxjs'; // Import necessary operators
import { SortService } from '../services/sort.service';
import { ApiService } from '../services/api.service';
import { EditionPopupComponent } from '../edition-popup/edition-popup.component';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [SharedModule, EditionPopupComponent],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  constructor(
    private userService: UserService,
    private sortService: SortService,
    private apiService: ApiService,
    private toastService: ToastService,
  ) {}

  private itemsPerPage$ = new BehaviorSubject<number>(3);
  private orderBy$ = new BehaviorSubject<string>('lastName:ASC,firstName:ASC');
  currentPage$ = new BehaviorSubject<number>(1);
  // Merged observable for combined changes
  private combinedChanges$ = combineLatest([
    this.currentPage$,
    this.orderBy$,
    this.itemsPerPage$,
    this.userService.dataPossiblyChanged$,
  ]).pipe(debounceTime(300));

  moduleSubscription = new Subscription();

  totalItems: number = 0;
  totalPage: number = 1;
  users: UserData[] = [];
  usersCount: number = 0;
  isViewAllActive: boolean = false;

  displayEditionPopup: boolean = false;
  displayDeletionPopup: boolean = false;

  selectedUser: UserData = {
    id: 0,
    lastName: '',
    firstName: '',
  };

  /**
   * List of user data properties and their associated sort direction
   * @column column name in the user data response
   * @toSort '': no sort, 'ASC': Ascending, 'DESC': Descending
   *
   * This object array is used to generate user table headers and
   * handle UI sorting system
   */
  desiredTableHeadersOrder = [
    { column: 'firstName', toSort: '' },
    { column: 'lastName', toSort: '' },
    { column: 'id', toSort: '' },
    { column: 'createdAt', toSort: '' },
    { column: 'updatedAt', toSort: '' },
  ];

  onConfirmEdit(user: UserData) {
    if (user?.id) {
      this.editUser(user, this.selectedUser.id!);
    }
  }

  onConfirmDelete(user: UserData) {
    if (user?.id) {
      this.deleteUser(this.selectedUser.id!);
    }
  }

  toggleEditionPopup(user: UserData) {
    this.selectedUser = user;
    this.displayEditionPopup = !this.displayEditionPopup;
  }

  toggleDeletionPopup(user: UserData) {
    this.selectedUser = user;
    this.displayDeletionPopup = !this.displayDeletionPopup;
  }

  goToPage(pageNumber: number): void {
    this.currentPage$.next(pageNumber);
  }

  changeOrderBy(orderBy: string): void {
    this.orderBy$.next(orderBy);
  }

  viewAll(): void {
    this.isViewAllActive = !this.isViewAllActive;
    if (this.isViewAllActive) {
      this.currentPage$.next(1);
      this.itemsPerPage$.next(this.usersCount);
    } else {
      this.itemsPerPage$.next(3);
    }
  }

  resetSorting() {
    this.sortService.setSortCriteria([]);
    this.orderBy$.next('lastName:ASC,firstName:ASC');
    this.desiredTableHeadersOrder = [
      { column: 'firstName', toSort: '' },
      { column: 'lastName', toSort: '' },
      { column: 'id', toSort: '' },
      { column: 'createdAt', toSort: '' },
      { column: 'updatedAt', toSort: '' },
    ];
  }

  toggleSort(property: string) {
    let currentDirection = this.sortService.getSortDirection(property);
    const newDirection = currentDirection === 'DESC' ? 'ASC' : 'DESC';
    this.sortService.addSortCriterion(property, newDirection);
    this.orderBy$.next(this.sortService.getSortString());
    const desiredColumnIndex = this.desiredTableHeadersOrder.findIndex(
      item => item.column === property,
    );
    if (desiredColumnIndex !== -1) {
      this.desiredTableHeadersOrder[desiredColumnIndex].toSort = newDirection;
    }
  }

  fetchUsers(currentPage: number, itemsPerPage: number, orderBy: string): void {
    this.userService
      .getUsers(`${this.apiService.API_URL}/users/data`, {
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
        orderBy: orderBy,
      })
      .subscribe({
        next: (users: UsersDataResponse) => {
          console.log('------ FETCH USERS DATA----------');
          this.users = users.data[0];
          this.usersCount = users.data[1].count;
          this.totalPage = Math.ceil(
            this.usersCount / this.itemsPerPage$.value,
          );
        },
        error: err => {
          let errorMessage = err.error.exceptionResponse;
          console.log(typeof errorMessage);
          if (typeof errorMessage !== 'string') {
            errorMessage = errorMessage.message.toString();
          }
          this.toastService.showToast(
            'error',
            'Creation Failed',
            `Something went wrong: ${errorMessage}`,
            'bc',
            1500,
          );
        },
      });
  }

  editUser(user: UserData, id: number) {
    this.userService
      .editUser(`${this.apiService.API_URL}/users/${id}`, user)
      .subscribe({
        next: user => {
          this.toastService.showToast(
            'success',
            'Edition Successful',
            `The user ${user.data.firstName} ${user.data.lastName}  
            has been updated`,
            'bc',
            1500,
          );
          this.fetchUsers(
            this.currentPage$.value,
            this.itemsPerPage$.value,
            this.orderBy$.value,
          );
        },
        error: err => {
          let errorMessage = err.error.exceptionResponse;
          console.log(typeof errorMessage);
          if (typeof errorMessage !== 'string') {
            errorMessage = errorMessage.message.toString();
          }
          this.toastService.showToast(
            'error',
            'Edition Failed',
            `Something went wrong: ${errorMessage}`,
            'bc',
            1500,
          );
          this.fetchUsers(
            this.currentPage$.value,
            this.itemsPerPage$.value,
            this.orderBy$.value,
          );
        },
      });
  }

  deleteUser(id: number) {
    this.userService
      .deleteUser(`${this.apiService.API_URL}/users/${id}`)
      .subscribe({
        next: user => {
          this.toastService.showToast(
            'success',
            'Deletion Successful',
            `The user ${user.data.firstName} ${user.data.lastName}  
              has been deleted`,
            'bc',
            1500,
          );
          this.fetchUsers(
            this.currentPage$.value,
            this.itemsPerPage$.value,
            this.orderBy$.value,
          );
        },
        error: err => {
          let errorMessage = err.error.exceptionResponse;
          console.log(typeof errorMessage);
          if (typeof errorMessage !== 'string') {
            errorMessage = errorMessage.message.toString();
          }
          this.toastService.showToast(
            'error',
            'Deletion Failed',
            `Something went wrong: ${errorMessage}`,
            'bc',
            1500,
          );
          this.fetchUsers(
            this.currentPage$.value,
            this.itemsPerPage$.value,
            this.orderBy$.value,
          );
        },
      });
  }

  ngOnInit(): void {
    // Initial fetch done when at least 1 BehaviorSubject is emitting non null value
    this.moduleSubscription = this.combinedChanges$.subscribe(
      ([currentPage, orderBy, itemsPerPage]) => {
        this.fetchUsers(currentPage, itemsPerPage, orderBy);
      },
    );
  }

  ngOnDestroy(): void {
    this.moduleSubscription.unsubscribe();
  }
}
