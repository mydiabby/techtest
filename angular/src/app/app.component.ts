import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShapeDividerComponent } from '@ui/a-shape-divider/shape-divider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShapeDividerComponent],
  template: `
    <style>
        app-shape-divider {
          position: absolute;
          top: 0;
          left: 0;
        }
    </style>
    <app-shape-divider></app-shape-divider>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
