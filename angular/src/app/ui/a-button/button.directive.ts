import { Directive, ElementRef, HostBinding, Input, Renderer2, AfterContentInit, inject, Signal, effect, Injector } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[buttonDefault]',
    host: { class: 'btn' },
})
export class ButtonDirective implements AfterContentInit {
    private readonly elem = inject(ElementRef);
    private readonly renderer = inject(Renderer2);
    private readonly injector = inject(Injector);

    @HostBinding('class')
    public className: string;

    @Input() busy: Signal<boolean>;

    private initialContent: string;

    public ngAfterContentInit(): void {
        this.initialContent = this.elem.nativeElement.innerHTML;
        if (this.busy) {
            effect(
                () => {
                    if (this.busy) this.updateBusy(this.busy());
                },
                { injector: this.injector },
            );
        }
    }

    private updateBusy(busy: boolean): void {
        this.elem.nativeElement.disabled = busy;
        const spinner = busy ? `<span class="material-symbols-outlined material-symbols-spin me-2">refresh</span>` : '';
        const newContent = spinner + this.initialContent;
        this.renderer.setProperty(this.elem.nativeElement, 'innerHTML', newContent);
    }
}
