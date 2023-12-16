import { AfterContentInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

    private readonly host = inject(ElementRef);

    ngAfterContentInit() {
        this.host.nativeElement.focus();
    }

}
