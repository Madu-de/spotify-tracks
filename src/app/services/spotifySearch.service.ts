import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifySearchService {

  constructor(private connection: ConnectionService) { }

  /**
   * @param query 
   * @param types Allowed values: "album" "artist" "playlist" "track" "show" "episode" "audiobook" https://developer.spotify.com/documentation/web-api/reference/#/operations/search
   * @returns 
   */
  async search(query: string, types: string) {
    let player = await this.connection.sendGetRequestToSpotify(`/search?q=${query}&type=${types}`);
    return player;
  }
}
