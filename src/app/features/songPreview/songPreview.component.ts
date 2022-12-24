import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-songPreview',
  templateUrl: './songPreview.component.html',
  styleUrls: ['./songPreview.component.scss']
})
export class SongPreviewComponent implements OnInit {

  @Input() src: string = '';
  @Input() songTitle: string = '';
  @Input() songType: string = '';
  @Input() artist: string = '';
  @Input() songLink: string = '';

  constructor() { }

  ngOnInit() {
  }

}
