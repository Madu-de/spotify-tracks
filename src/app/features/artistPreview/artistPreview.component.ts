import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-artistPreview',
  templateUrl: './artistPreview.component.html',
  styleUrls: ['./artistPreview.component.scss']
})
export class ArtistPreviewComponent implements OnInit {

  @Input() src: string = '';
  @Input() artistLink: string = '';
  @Input() artistName: string = '';

  constructor() { }

  ngOnInit() {
  }

}
