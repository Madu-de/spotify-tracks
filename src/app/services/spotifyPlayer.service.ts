import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerService {

  public isPlaying: boolean = false;
  public currentSongImg: string = '';
  public author: string = '';
  public title: string = '';
  public spotifyLink: string = '';

  constructor(private connection: ConnectionService) {
    this.refreshCurrentSong(true);

    setInterval(async () => {
      await this.refreshCurrentSong();
    }, 2000);
  }

  private async refreshCurrentSong(setIsPlaying: boolean = false) {
    let player = await this.getPlayer();
    if (!player) return;
    this.author = player.item?.artists?.[0].name;
    this.title = player.item?.name;
    this.currentSongImg = player.item?.album?.images?.[2]?.url;
    this.spotifyLink = player.item?.external_urls?.spotify;
    if (setIsPlaying) this.isPlaying = player.is_playing;
  }

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
