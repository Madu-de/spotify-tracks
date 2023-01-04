import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from './cookie.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  public token: string = <string>this.cookie.get('token');
  public spotifyBaseUrl: string = 'https://api.spotify.com/v1';

  constructor(private cookie: CookieService, private route: ActivatedRoute) { }


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
    if (res.status === 200) {
      let response = await res.json();
      if (response.error?.status === 401) {
        this.connectToSpotify();
      }
      return response;
    }
    return undefined;
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

  async sendPostRequestToSpotify(url: string) {
    await fetch((this.spotifyBaseUrl + url), {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    });
  }

  getAllFragmentVariables(): Map<string, string> {
    let variableArray: Map<string, string> = new Map();
    this.route.fragment.subscribe(fragment => {
      fragment?.split('&').forEach(variable => {
        let splittetVariable = variable.split('=');
        variableArray.set(splittetVariable[0], splittetVariable[1]);
      });
    });
    return variableArray;
  }
}
