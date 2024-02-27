import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyPlayerService } from 'src/app/services/spotifyPlayer.service';

@Component({
  selector: 'app-currentSong',
  templateUrl: './currentSong.component.html',
  styleUrls: ['./currentSong.component.scss']
})
export class CurrentSongComponent implements OnInit {

  constructor(public player: SpotifyPlayerService) { }

  ngOnInit() { }

  async togglePlay() {
    this.player.isPlaying ? this.player.pause() : this.player.play();
    this.player.isPlaying = !this.player.isPlaying;
  }

  async next() {
    this.player.next();
    this.player.isPlaying = true;
  }

  async previous() {
    this.player.previous();
    this.player.isPlaying = true;
  }

  // async loadCurrentSong() {
  //   let player = await this.player.getPlayer();
  //   if (!player) return;
  //   this.author = player.item?.artists?.[0].name;
  //   this.title = player.item?.name;
  //   this.currentSongImg = player.item?.album?.images?.[2]?.url;
  //   this.spotifyLink = player.item?.external_urls?.spotify;
  // }
}
