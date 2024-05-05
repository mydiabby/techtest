import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-card-container',
    templateUrl: './card-container.component.html',
    imports: [NgIf],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardContainerComponent {
    @Input() title: string;
}
