import { SpotifyUserService } from './../../services/spotifyUser.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = '';

  constructor(public spotifyUser: SpotifyUserService) { }

  async ngOnInit() {
    await this.loadProfilePicture();
  }

  async loadProfilePicture() {
    let pb: string = await this.spotifyUser.getUserProfilePicture();
    let image = <HTMLImageElement>document.getElementById('profile-picture');
    image.src = pb;
  }

}
