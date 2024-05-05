import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({ 
    standalone: true, 
    selector: 'form',
})
export class FormDirective {
    @HostBinding('class') public className: string;
    @HostBinding('attr.role') public role = 'form';
    @HostListener('submit') onSubmit(): void {
        this.className = 'was-validated';
    }
}
