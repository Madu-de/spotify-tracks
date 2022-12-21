/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpotifyPlayerService } from './spotifyPlayer.service';

describe('Service: SpotifyPlayer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyPlayerService]
    });
  });

  it('should ...', inject([SpotifyPlayerService], (service: SpotifyPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
