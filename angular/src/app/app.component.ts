import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-app';

  API_DOC_URL = `${environment.API_HOST}:${environment.API_PORT}/api`;

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
