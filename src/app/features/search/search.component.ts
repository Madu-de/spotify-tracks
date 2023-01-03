import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Album } from 'src/app/classes/Album';
import { Artist } from 'src/app/classes/Artist';
import { TopItemType } from 'src/app/enums/TopItemType.enum';
import { ConnectionService } from 'src/app/services/connection.service';
import { SpotifySearchService } from 'src/app/services/spotifySearch.service';
import { SpotifyUserService } from 'src/app/services/spotifyUser.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {

  public placeholderText: string = '';
  public hotkeyFocusRequired: boolean = true;
  public searchInput: string = '';
  public _albums: Album[] = [];
  public get albums() { return this._albums; }
  public set albums(newValue: Album[]) { this._albums = newValue; }
  public artists: Artist[] = [];
  public query: string | undefined = '';

  constructor(private user: SpotifyUserService, private searchService: SpotifySearchService, private connection: ConnectionService, private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changesSearch', changes);
  }

  async ngOnInit() {
    let topItems = sessionStorage.getItem('topArtists') ? JSON.parse(<string>sessionStorage.getItem('topArtists')) : await this.user.getUserTopItem(TopItemType.ARTIST);
    let randomNumber = Math.floor(Math.random() * 5);
    this.placeholderText = topItems[randomNumber]?.name || topItems.items[randomNumber].name + ', ...';
    this.query = this.connection.getAllFragmentVariables().get('q');
    if (!this.query) {
      this.query = '';
      return;
    }
    let result = await this.searchService.search(this.query, 'album,artist,playlist,track,show,episode,audiobook');
    result.albums.items.forEach((album: any) => {
      this.albums = [...this.albums, Album.parseToAlbum(album)];
    });
    result.artists.items.forEach((artist: any) => {
      this.artists = [...this.artists, Artist.parseToArtist(artist)];
    });
  }

  async search() {
    let inputElement = <HTMLInputElement>document.getElementById('search');
    location.hash = `q=${inputElement.value}`;
    location.reload();
  }
}