import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[jhiNumberOnly]',
})
export class AllowNumberDirective {
  regexStr = '^[0-9]+$';
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): boolean {
    return new RegExp(this.regexStr).test(event.key);
  }
}
