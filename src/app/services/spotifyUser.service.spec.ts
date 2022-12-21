/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpotifyUserService } from './spotifyUser.service';

describe('Service: SpotifyUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyUserService]
    });
  });

  it('should ...', inject([SpotifyUserService], (service: SpotifyUserService) => {
    expect(service).toBeTruthy();
  }));
});
