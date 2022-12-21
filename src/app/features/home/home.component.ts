import { SpotifyUserService } from './../../services/spotifyUser.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/classes/Artist';
import { Track } from 'src/app/classes/Track';
import { TopItemType } from 'src/app/enums/TopItemType.enum';
import { ConnectionService } from 'src/app/services/connection.service';
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

  constructor(private route: ActivatedRoute, private connectionService: ConnectionService, private user: SpotifyUserService, private spotifySearchService: SpotifySearchService, public player: SpotifyPlayerService) { }

  async ngOnInit() {
    let variables = this.getAllFragmentVariables();
    this.connectionService.token = <string>variables.get('access_token');

    let topSongs = await this.user.getUserTopItem(TopItemType.TRACKS);
    topSongs.items.forEach((item: any) => {
      this.topSongs.push(new Track(
        item.album.images[1].url,
        item.name,
        item.type,
        item.artists[0].name,
        item.external_urls.spotify
      ));
    });

    let topArtists = await this.user.getUserTopItem(TopItemType.ARTIST);
    console.log(topArtists);
    topArtists.items.forEach((item: any) => {
      this.topArtists.push(new Artist(
        item.images[1].url,
        item.name,
        item.external_urls.spotify
      ));
    });
  }

  getAllFragmentVariables(): Map<string, string> {
    let variableArray: Map<string, string> = new Map();
    this.route.fragment.subscribe(fragment => {
      fragment?.split('&').forEach(variable => {
        let splittetVariable = variable.split('=');
        variableArray.set(splittetVariable[0], splittetVariable[1]);
      });
    });
    return variableArray;
  }

}
