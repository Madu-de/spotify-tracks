import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { SpotifyPlayerService } from '../services/spotifyPlayer.service';

@Directive({
  selector: '[appHotkey]'
})
export class HotkeyDirective {

  @Input() appHotkey: string = '';
  @Input() hotkeyCallback: Function | undefined;
  @Input() hotkeyCallbackParams: any[] = [];
  @Input() hotkeyFocusRequired: boolean = false;
  @Input() hotkeyIgnoreClasses: string[] = [];

  constructor(private el: ElementRef, private connection: ConnectionService, private player: SpotifyPlayerService) {
    // setTimeout(() => {
    //   this.el.nativeElement.click();
    // }, 1000);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(e: any) {
    if (this.hotkeyFocusRequired && e.target != this.el.nativeElement)
      return;
    if (this.hotkeyIgnoreClasses.some(classes => (<HTMLElement>e.target).classList.contains(classes)))
      return;
    if (e.key === this.appHotkey)
      this.hotkeyCallback ? this.hotkeyCallback(...this.hotkeyCallbackParams) : this.el.nativeElement.click();
  }
}
