import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerService {

  constructor(private connection: ConnectionService) { }

  async getPlayer() {
    let player = await this.connection.sendGetRequestToSpotify('/me/player');
    return player;
  }

  async play() {
    await this.connection.sendPutRequestToSpotify('/me/player/play');
  }

  async pause() {
    await this.connection.sendPutRequestToSpotify('/me/player/pause');
  }

  async next() {
    await this.connection.sendPostRequestToSpotify('/me/player/next');
  }

  async previous() {
    await this.connection.sendPostRequestToSpotify('/me/player/previous');
  }
}
