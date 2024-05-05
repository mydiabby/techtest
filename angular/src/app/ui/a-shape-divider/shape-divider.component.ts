import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-shape-divider',
    templateUrl: './shape-divider.component.html',
    styleUrls: ['./shape-divider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShapeDividerComponent {
    @Input() opacity1 = 25;
    @Input() opacity2 = 50;
    @Input() opacity3 = 75;
}
