import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'user-management-app';
  items: MenuItem[] | undefined;
  sidebarVisible = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Users',
            icon: 'pi pi-user',
            command: () => {
              this.router.navigate(['/users']);
            },
          },
        ],
      },
    ];
  }
}
