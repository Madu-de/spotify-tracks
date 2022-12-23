import { Component, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/classes/Artist';

@Component({
  selector: 'app-artistListPreview',
  templateUrl: './artistListPreview.component.html',
  styleUrls: ['./artistListPreview.component.scss']
})
export class ArtistListPreviewComponent implements OnInit {

  @Input() artists: Artist[] = [];
  @Input() title: string = '';

  constructor() { }

  ngOnInit() {
  }

}
