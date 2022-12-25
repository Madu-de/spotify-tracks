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

  async getLastSingle(id: string) {
    let single = await this.connection.sendGetRequestToSpotify(`/artists/${id}/albums?album_type=single&limit=1`);
    return single;
  }

  async getLastAlbum(id: string) {
    let album = await this.connection.sendGetRequestToSpotify(`/artists/${id}/albums?album_type=album&limit=1`);
    return album;
  }

  async getLastFeature(id: string) {
    let feature = await this.connection.sendGetRequestToSpotify(`/artists/${id}/albums?album_type=appears_on&limit=1`);
    return feature;
  }

  async getLastRelease(id: string) {
    let lastSingle = await this.getLastSingle(id);
    let lastAlbum = await this.getLastAlbum(id);

    if (lastSingle.items.length === 0 && lastAlbum.items.length === 0) return undefined;
    if (lastSingle.items.length === 0 && lastAlbum.items.length !== 0) return lastAlbum;
    if (lastSingle.items.length !== 0 && lastAlbum.items.length === 0) return lastSingle;

    let lastSingleDate: Date = new Date(lastSingle.items[0].release_date);
    let lastAlbumDate: Date = new Date(lastAlbum.items[0].release_date);

    return lastSingleDate.getTime() > lastAlbumDate.getTime() ? lastSingle : lastAlbum;
  }

  async getArtistsTopTracks(id: string) {
    let topTracks = await this.connection.sendGetRequestToSpotify(`/artists/${id}/top-tracks`);
    return topTracks;
  }
}
