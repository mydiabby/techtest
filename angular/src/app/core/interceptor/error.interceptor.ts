import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
    const toastService = inject(ToastrService);

    return next(request).pipe(
        catchError((err) => {
            toastService.error('Echec de la requête : ' + err.error.message);
            return throwError(() => err);
        }),
    );
};
