import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appHotkey]'
})
export class HotkeyDirective {

  @Input() appHotkey: string = '';
  @Input() hotkeyCallback: Function | undefined;
  @Input() hotkeyFocusRequired: boolean = false;

  constructor(private el: ElementRef) {
    // setTimeout(() => {
    //   this.el.nativeElement.click();
    // }, 1000);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(e: any) {
    if (this.hotkeyFocusRequired && e.target != this.el.nativeElement)
      return;
    if (e.key === this.appHotkey)
      this.hotkeyCallback ? this.hotkeyCallback() : this.el.nativeElement.click();
  }
}
