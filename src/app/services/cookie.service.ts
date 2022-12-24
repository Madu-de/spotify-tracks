import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  set(key: string, value: string) {
    document.cookie = `${key}=${value}; path=/`;
  }

  get(key: string): string | undefined {
    let cookies = this.getAll();
    let requestedCookie = cookies.get(key);
    return requestedCookie;
  }

  getAll(): Map<string, string> {
    let cookies = document.cookie;
    let cookieArray = cookies.split(';');
    let cookieMap: Map<string, string> = new Map();
    cookieArray.forEach((cookie: any) => {
      cookieMap.set(cookie.split('=')[0], cookie.split('=')[1]);
    });
    return cookieMap;
  }

}
