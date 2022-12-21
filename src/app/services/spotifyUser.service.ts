import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { TopItemType } from '../enums/TopItemType.enum';

@Injectable({
  providedIn: 'root'
})
export class SpotifyUserService {

  constructor(private connection: ConnectionService) { }

  async getUser() {
    let user = await this.connection.sendGetRequestToSpotify('/me');
    return user;
  }

  async getUserName() {
    let user = await this.getUser();
    return user.display_name;
  }

  async getUserEmail() {
    let user = await this.getUser();
    return user.email;
  }

  async getUserProfilePicture() {
    let user = await this.getUser();
    return user.images[0].url;
  }

  async getUserTopItem(topItemType: TopItemType) {
    let topItems = await this.connection.sendGetRequestToSpotify(`/me/top/${topItemType}`);
    return topItems;
  }
}