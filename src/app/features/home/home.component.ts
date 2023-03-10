import { SpotifyUserService } from './../../services/spotifyUser.service';
import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/classes/Album';
import { Artist } from 'src/app/classes/Artist';
import { Track } from 'src/app/classes/Track';
import { TopItemType } from 'src/app/enums/TopItemType.enum';
import { ConnectionService } from 'src/app/services/connection.service';
import { SpotifyArtistService } from 'src/app/services/spotifyArtist.service';
import { SpotifyPlayerService } from 'src/app/services/spotifyPlayer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public topSongs: Track[] = [];
  public topArtists: Artist[] = [];
  public lastReleasesByTopArtist: Track[] = [];
  public lastSinglesByTopArtists: Track[] = [];
  public lastAlbumsByTopArtists: Track[] = [];

  constructor(private connectionService: ConnectionService, private user: SpotifyUserService, public player: SpotifyPlayerService, private artist: SpotifyArtistService) { }

  async ngOnInit() {

    // Check if there are stored top Songs in sessionStorage and use them. If not, then get new data from Spotify API
    if (sessionStorage.getItem('topSongs')) {
      this.topSongs = <Track[]>JSON.parse(<string>sessionStorage.getItem('topSongs'));
    } else {
      let topSongs = await this.user.getUserTopItem(TopItemType.TRACKS);
      topSongs.items.forEach((item: any) => {
        this.topSongs.push(Track.parseToTrack(item));
        sessionStorage.setItem('topSongs', JSON.stringify(this.topSongs));
      });
    }

    if (sessionStorage.getItem('topArtists')) {
      this.topArtists = <Artist[]>JSON.parse(<string>sessionStorage.getItem('topArtists'));
      this.lastReleasesByTopArtist = <Track[]>JSON.parse(<string>sessionStorage.getItem('lastReleasesByTopArtist'));
      this.lastSinglesByTopArtists = <Track[]>JSON.parse(<string>sessionStorage.getItem('lastSinglesByTopArtists'));
      this.lastAlbumsByTopArtists = <Track[]>JSON.parse(<string>sessionStorage.getItem('lastAlbumsByTopArtists'));
    } else {
      // Get Top Artists
      let topArtists = await this.user.getUserTopItem(TopItemType.ARTIST);
      topArtists.items.forEach((item: any) => {
        this.topArtists.push(Artist.parseToArtist(item));
        sessionStorage.setItem('topArtists', JSON.stringify(this.topArtists));
      });

      // Get the last release from all topArtists
      topArtists.items.forEach(async (item: any) => {
        let releases = await this.artist.getLastRelease(item.id);
        this.lastReleasesByTopArtist.push(Track.parseToTrack(releases.items[0]))
        sessionStorage.setItem('lastReleasesByTopArtist', JSON.stringify(this.lastReleasesByTopArtist));
      });

      // Get last singles by top artists
      topArtists.items.forEach(async (item: any) => {
        let singles = await this.artist.getLastSingle(item.id);
        if (singles.items.length !== 0) this.lastSinglesByTopArtists.push(Track.parseToTrack(singles.items[0]));
        sessionStorage.setItem('lastSinglesByTopArtists', JSON.stringify(this.lastSinglesByTopArtists));
      });

      // Get last albums by top artists
      topArtists.items.forEach(async (item: any) => {
        let albums = await this.artist.getLastAlbum(item.id);
        if (albums.items.length !== 0) this.lastAlbumsByTopArtists.push(Album.parseToAlbum(albums.items[0]))
        sessionStorage.setItem('lastAlbumsByTopArtists', JSON.stringify(this.lastAlbumsByTopArtists));
      });
    }
  }
}
