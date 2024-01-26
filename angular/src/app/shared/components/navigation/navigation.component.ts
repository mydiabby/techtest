import { Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, RouterLink, MatToolbarModule, FlexLayoutModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Input() title = '';
}
