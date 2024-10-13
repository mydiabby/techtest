import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './_common/app/app.config';
import { AppComponent } from './_common/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
