/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpotifyArtistService } from './spotifyArtist.service';

describe('Service: SpotifyArtist', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyArtistService]
    });
  });

  it('should ...', inject([SpotifyArtistService], (service: SpotifyArtistService) => {
    expect(service).toBeTruthy();
  }));
});
