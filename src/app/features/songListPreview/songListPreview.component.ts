import { Component, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/classes/Artist';
import { Track } from 'src/app/classes/Track';

@Component({
  selector: 'app-songListPreview',
  templateUrl: './songListPreview.component.html',
  styleUrls: ['./songListPreview.component.scss']
})
export class SongListPreviewComponent implements OnInit {

  @Input() songs: Track[] = [];
  @Input() title: string = '';

  constructor() { }

  ngOnInit() {
  }

}
