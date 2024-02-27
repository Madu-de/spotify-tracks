import { Directive, ElementRef, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appHotkey]'
})
export class HotkeyDirective {

  @Input() appHotkey: string = '';
  @Output() onHotKey: EventEmitter<void> = new EventEmitter();
  @Input() hotkeyFocusRequired: boolean = false;
  @Input() hotkeyIgnoreClasses: string[] = [];

  constructor(private el: ElementRef) {}

  @HostListener('document:keyup', ['$event'])
  onKeyUp(e: any) {
    if (this.hotkeyFocusRequired && e.target != this.el.nativeElement)
      return;
    if (this.hotkeyIgnoreClasses.some(classes => (<HTMLElement>e.target).classList.contains(classes)))
      return;
    if (e.key === this.appHotkey)
      this.onHotKey.observed ? this.onHotKey.emit() : this.el.nativeElement.click();
  }
}
