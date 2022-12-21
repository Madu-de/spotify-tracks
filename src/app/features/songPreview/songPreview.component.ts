import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-songPreview',
  templateUrl: './songPreview.component.html',
  styleUrls: ['./songPreview.component.scss']
})
export class SongPreviewComponent implements OnInit {

  @Input() src: string = '';
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() artist: string = '';
  @Input() link: string = '';

  constructor() { }

  ngOnInit() {
  }

}
