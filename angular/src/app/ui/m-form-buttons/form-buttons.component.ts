import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonPrimaryDirective } from '@ui/a-button/button-primary.directive';
import { ButtonSecondaryDirective } from '@ui/a-button/button-secondary.directive';

@Component({
    standalone: true,
    selector: 'app-form-buttons',
    templateUrl: './form-buttons.component.html',
    imports: [ButtonPrimaryDirective, ButtonSecondaryDirective, NgIf, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormButtonsComponent {
    @Input() backName = 'Retour';
    @Input() backRoute: string;
    @Input() validBusy = signal(false);
    @Input() validName = 'Valider';
}
