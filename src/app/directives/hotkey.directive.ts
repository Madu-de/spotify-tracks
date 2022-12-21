import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appHotkey]'
})
export class HotkeyDirective {

  @Input() appHotkey: string = '';

  constructor(private el: ElementRef) {
    // setTimeout(() => {
    //   this.el.nativeElement.click();
    // }, 1000);
  }

  @HostListener('document:keyup', ['$event']) onKeyUp(e: any) {
    if (e.key === this.appHotkey) {
      this.el.nativeElement.click();
    }
  }
}
