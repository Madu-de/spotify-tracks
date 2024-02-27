import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/classes/Album';
import { Artist } from 'src/app/classes/Artist';
import { Track } from 'src/app/classes/Track';
import { TopItemType } from 'src/app/enums/TopItemType.enum';
import { ConnectionService } from 'src/app/services/connection.service';
import { SpotifyArtistService } from 'src/app/services/spotifyArtist.service';
import { SpotifySearchService } from 'src/app/services/spotifySearch.service';
import { SpotifyUserService } from 'src/app/services/spotifyUser.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public placeholderText: string = '';
  public hotkeyFocusRequired: boolean = true;
  public searchInput: string = '';
  public albums: Album[] = [];
  public tracks: Track[] = [];
  public artists: Artist[] = [];
  public lastReleases: Track[] = [];
  public query: string | undefined = '';
  public showFilterWindow: boolean = false;
  public filter: any = {
    test1234: 'test11',
    test: 'test'
  };

  constructor(private user: SpotifyUserService, private searchService: SpotifySearchService, private connection: ConnectionService, private artist: SpotifyArtistService) { }

  async ngOnInit() {
    (<HTMLInputElement>document.getElementById('search')).focus();
    let topItems = sessionStorage.getItem('topArtists') ? JSON.parse(<string>sessionStorage.getItem('topArtists')) : await this.user.getUserTopItem(TopItemType.ARTIST);
    let randomNumber = Math.floor(Math.random() * 5);
    this.placeholderText = topItems[randomNumber]?.name || topItems.items[randomNumber].name + ', ...';
    this.query = this.connection.getAllFragmentVariables().get('q') || '';
    console.log(JSON.parse(<string>this.connection.getAllFragmentVariables().get('filter')));
    let result = await this.searchService.search(this.query, 'album,artist,playlist,track,show,episode,audiobook');
    result.albums.items.forEach((album: any) => {
      this.albums = [...this.albums, Album.parseToAlbum(album)];
    });
    result.tracks.items.forEach((track: any) => {
      this.tracks = [...this.tracks, Track.parseToTrack(track)]
    })
    result.artists.items.forEach((artist: any) => {
      this.artists = [...this.artists, Artist.parseToArtist(artist)];
    });

    result.artists.items.forEach(async (artist: any) => {
      let lastRelease = await this.artist.getLastRelease(artist.id);
      if (!lastRelease) return;
      this.lastReleases.push(Track.parseToTrack(lastRelease.items[0]));
    });
  }

  async search(_this: this) {
    let inputElement = <HTMLInputElement>document.getElementById('search');
    location.hash = `q=${inputElement.value}&filter=${JSON.stringify(_this.filter)}`;
    location.reload();
  }

  async toggleFilterWindow() {
    this.showFilterWindow = !this.showFilterWindow;
    // document.body.style.overflowX = this.showFilterWindow ? 'hidden' : '';
  }
}