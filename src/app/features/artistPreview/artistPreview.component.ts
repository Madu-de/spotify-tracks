import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-artistPreview',
  templateUrl: './artistPreview.component.html',
  styleUrls: ['./artistPreview.component.scss']
})
export class ArtistPreviewComponent implements OnInit {

  @Input() src: string = '';
  @Input() link: string = '';
  @Input() name: string = '';

  constructor() { }

  ngOnInit() {
  }

}
