import { ArtistPreviewComponent } from './features/artistPreview/artistPreview.component';
import { HotkeyDirective } from './directives/hotkey.directive';
import { CurrentSongComponent } from './features/currentSong/currentSong.component';
import { HeaderComponent } from './features/header/header.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { ConnectionService } from './services/connection.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { SongPreviewComponent } from "./features/songPreview/songPreview.component";
import { SongListPreviewComponent } from './features/songListPreview/songListPreview.component';
import { ArtistListPreviewComponent } from './features/artistListPreview/artistListPreview.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    HeaderComponent,
    CurrentSongComponent,
    HotkeyDirective,
    SongPreviewComponent,
    ArtistPreviewComponent,
    SongListPreviewComponent,
    ArtistListPreviewComponent
  ],
  providers: [ConnectionService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ]
})
export class AppModule { }
