import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyPlayerService } from 'src/app/services/spotifyPlayer.service';

@Component({
  selector: 'app-currentSong',
  templateUrl: './currentSong.component.html',
  styleUrls: ['./currentSong.component.scss']
})
export class CurrentSongComponent implements OnInit, OnDestroy {

  public isPlaying: boolean = false;
  public currentSongImg: string = '';
  public author: string = '';
  public title: string = '';
  public spotifyLink: string = '';
  public interval: any;

  constructor(public player: SpotifyPlayerService) { }

  async ngOnInit() {
    await this.loadCurrentSong();

    this.interval = setInterval(async () => {
      await this.loadCurrentSong();
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async loadCurrentSong() {
    let player = await this.player.getPlayer();
    if (!player) return;
    this.author = player.item?.artists?.[0].name;
    this.title = player.item?.name;
    this.currentSongImg = player.item?.album?.images?.[2]?.url;
    this.spotifyLink = player.item?.external_urls?.spotify;
    this.isPlaying = !player.is_playing;
  }

  // async switchHotkey() {
  //   let images = document.getElementsByClassName('current-song-toggle-buttons');
  //   let playElement = <HTMLImageElement>images[0];
  //   let pauseElement = <HTMLImageElement>images[1];
  //   if (!this.isPlaying) {
  //     pauseElement.setAttribute('appHotkey', ' ');
  //     playElement.removeAttribute('appHotkey');
  //   } else {
  //     playElement.setAttribute('appHotkey', ' ');
  //     pauseElement.removeAttribute('appHotkey');
  //   }
  // }

}
