import { InjectionToken } from '@angular/core'

/**
 * Génère l'URL du backend.
 */
export const BACKEND_URL_SUPPLIER = new InjectionToken<() => URL>('backend URL')