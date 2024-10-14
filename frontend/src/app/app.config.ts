import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideAnimations } from '@angular/platform-browser/animations'
import { routes } from './app.routes'
import { BACKEND_URL_SUPPLIER } from './app.tokens'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { apiErrorInterceptor } from './common/interceptors/api-error.interceptor'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes), 
        provideAnimations(),
        provideHttpClient(withInterceptors([apiErrorInterceptor])),
        {
            provide: BACKEND_URL_SUPPLIER,
            useFactory: () => {
                const hostname = document.location.hostname

                // local dev context
                if (['127.0.0.1', 'localhost'].includes(hostname))
                    return () => new URL('http://127.0.0.1:4001')

                // container to container context
                if (hostname === 'frontend')
                    return () => new URL('http://api')
        
                throw Error('no production URL for now')
            }
        }
    ]
}
