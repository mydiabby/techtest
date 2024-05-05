import { Directive } from '@angular/core';

import { ButtonDirective } from './button.directive';

@Directive({
    standalone: true,
    selector: '[buttonSecondary]',
    host: { class: 'btn-secondary' },
})
export class ButtonSecondaryDirective extends ButtonDirective {}
