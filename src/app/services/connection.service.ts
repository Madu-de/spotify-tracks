import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  public token: string = '';
  public spotifyBaseUrl: string = 'https://api.spotify.com/v1';

  constructor() { }

  connectToSpotify() {
    let client_id: string = <string>environment['CLIENT_ID'];
    let redirect_uri: string = <string>environment['REDIRECT_URL'];

    let state = this.generateRandomString(16);

    localStorage.setItem('stateKey', state);
    let scope = <string>environment['SPOTIFY_STATE'];

    let url: string = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    location.href = url;
  }

  private generateRandomString(length: number): string {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async sendGetRequestToSpotify(url: string) {
    let res = await fetch((this.spotifyBaseUrl + url), {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    });
    // console.log(res);
    let response = await res.json();
    if (response.error?.status === 401) {
      this.connectToSpotify();
    }
    return response;
  }

  async sendPutRequestToSpotify(url: string) {
    await fetch((this.spotifyBaseUrl + url), {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    });
  }
}
