import {Component} from '@angular/core';
import {NgClass} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(private router: Router) {}

  async onRequestUserLists(): Promise<void> {
    await this.router.navigateByUrl('/users')
  }
}
