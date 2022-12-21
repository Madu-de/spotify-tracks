import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyArtistService {

  constructor(private connection: ConnectionService) { }

  async getArtist(id: string) {
    let artist = await this.connection.sendGetRequestToSpotify(`/artists/${id}`);
    return artist;
  }

  async getArtistAlbums(id: string) {
    let albums = await this.connection.sendGetRequestToSpotify(`/artists/${id}/albums`);
    return albums;
  }

  async getArtistsTopTracks(id: string) {
    let topTracks = await this.connection.sendGetRequestToSpotify(`/artists/${id}/top-tracks`);
    return topTracks;
  }
}
