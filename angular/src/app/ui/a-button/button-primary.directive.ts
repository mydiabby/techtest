import { Directive } from '@angular/core';

import { ButtonDirective } from './button.directive';

@Directive({
    standalone: true,
    selector: '[buttonPrimary]',
    host: { class: 'btn-primary' },
})
export class ButtonPrimaryDirective extends ButtonDirective {}
