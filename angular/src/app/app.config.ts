import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

import { provideQueryDevTools } from '@ngneat/query-devtools';


// const withFunctionaFactory: QueryClientConfigFn = () => {
//   // we can use an injector context here and resolve a service
//   const notificationService = inject(NotificationService);

//   return {
//     queryCache: new QueryCache({
//       onError: (error: Error) => notificationService.notifyError(error),
//     }),
//   };
// };


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideQueryDevTools(),
  ]
};
