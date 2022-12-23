# SpotifyTracks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Documentation

## Services
- ConnectionService
    - `connectToSpotify()`
        - Redirects to the Spotify login page and saves the token.
    - `sendGetRequestToSpotify(url)`      
        - Sends a get request to the Spotify API.
    - `sendPutRequestToSpotify(url)`
        - Sends a put request to the Spotify API.
- SpotifyArtistService
    - `getArtist(id)`
        - Returns the artist who has the requested id.
    - `getArtistAlbums(id)`
        - Returns all albums of the artist who has the requested id.
    - `getArtistsTopTracks(id)`
        - Returns the top tracks of the artist who has the requested id.
- SpotifyPlayerService
    - `getPlayer()`
        - Returns the player from the user.
    - `play()`
        - Sets the playback on play.
    - `pause()`
        - Sets the playback on pause.
- SpotifySearchService
    - `search()`
        - Returns all search results.
- SpotifyUserService
    - `getUser()`
        - Returns the logged user.
    - `getUserName()`
        - Returns the name of the user.
    - `getUserEmail()`
        - Returns the email of the user.
    - `getUserProfilePicture()`
        - Returns the user profile picture.
    - `getUserTopItem(topItemType)`
        - Returns the top items of the user.