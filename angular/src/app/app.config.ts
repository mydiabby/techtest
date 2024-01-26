import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { ConfigService } from './config.service';
import { UserState } from './pages/users/state/user.state';
import { AddUserState } from './pages/users/user-form/state/add-user.state';
import { UserService } from './pages/users/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      RouterModule,
      CommonModule,
      FlexLayoutModule,
      HttpClientModule,
      NgxsModule.forRoot([UserState, AddUserState]),
      NgxsReduxDevtoolsPluginModule.forRoot(),
    ),
    provideRouter(routes),
    provideAnimations(),
    {
      provide: ConfigService,
      useClass: ConfigService
    },
    {
      provide: UserService,
      useClass: UserService
    },
  ]
};
