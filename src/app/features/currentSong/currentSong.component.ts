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

  async togglePlay(_this: any) {
    _this.player.isPlaying ? _this.player.pause() : _this.player.play();
    _this.player.isPlaying = !_this.player.isPlaying;
  }

  async next(_this: any) {
    _this.player.next();
    _this.player.isPlaying = true;
  }

  async previous(_this: any) {
    _this.player.previous();
    _this.player.isPlaying = true;
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
