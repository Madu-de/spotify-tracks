import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/classes/Track';
import { SpotifyUserService } from 'src/app/services/spotifyUser.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  public savedTracks: Track[] = [];

  constructor(public user: SpotifyUserService) { }

  async ngOnInit() {
    let savedTracks = await this.user.getUserSavedTracks();
    savedTracks.items.forEach((track: any) => {
      this.savedTracks.push(Track.parseToTrack(track.track));
    })
  }

}
