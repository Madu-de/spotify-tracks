import { SpotifyUserService } from './../../services/spotifyUser.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = '';
  public profilePicture: string = '';

  constructor(public spotifyUser: SpotifyUserService) { }

  async ngOnInit() {
    await this.loadProfilePicture();
  }

  async loadProfilePicture() {
    this.profilePicture = await this.spotifyUser.getUserProfilePicture();
  }

}
