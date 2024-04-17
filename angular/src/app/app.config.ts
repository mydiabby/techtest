import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UserGateway } from './core/ports/user.gateway';
import { HttpUserGateway } from './core/adapters/http-user.gateway';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: UserGateway, useFactory: () => new HttpUserGateway()
    }
  ]
};
