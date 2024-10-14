import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { routes } from './app.routes';

export const appConfig = {
  imports: [CommonModule],
  providers: [provideRouter(routes), provideAnimations()],
};
