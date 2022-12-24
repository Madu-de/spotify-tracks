import { SpotifyUserService } from './../../services/spotifyUser.service';
import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/classes/Artist';
import { Track } from 'src/app/classes/Track';
import { TopItemType } from 'src/app/enums/TopItemType.enum';
import { ConnectionService } from 'src/app/services/connection.service';
import { SpotifyArtistService } from 'src/app/services/spotifyArtist.service';
import { SpotifyPlayerService } from 'src/app/services/spotifyPlayer.service';
import { SpotifySearchService } from 'src/app/services/spotifySearch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public topSongs: Track[] = [];
  public topArtists: Artist[] = [];
  public lastReleasesByTopArtists: Track[] = [];

  constructor(private connectionService: ConnectionService, private user: SpotifyUserService, public player: SpotifyPlayerService, private artist: SpotifyArtistService) { }

  async ngOnInit() {
    // Get Top Songs
    let topSongs = await this.user.getUserTopItem(TopItemType.TRACKS);
    topSongs.items.forEach((item: any) => {
      this.topSongs.push(Track.parseToTrack(item));
    });

    console.log(topSongs);

    // Get Top Artists
    let topArtists = await this.user.getUserTopItem(TopItemType.ARTIST);
    topArtists.items.forEach((item: any) => {
      this.topArtists.push(Artist.parseToArtist(item));
    });

    // Get the last release from all topArtists
    topArtists.items.forEach(async (item: any) => {
      let albums = await this.artist.getArtistAlbums(item.id);
      console.log(albums.items[0]);
      this.lastReleasesByTopArtists.push(Track.parseToTrack(albums.items[0]))
    });
  }
}
