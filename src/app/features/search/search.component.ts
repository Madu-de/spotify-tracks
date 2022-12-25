import { Component, OnInit } from '@angular/core';
import { TopItemType } from 'src/app/enums/TopItemType.enum';
import { SpotifyUserService } from 'src/app/services/spotifyUser.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public placeholderText: string = '';
  public hotkeyFocusRequired: boolean = true;

  constructor(private user: SpotifyUserService) { }

  async ngOnInit() {
    let topItems = await this.user.getUserTopItem(TopItemType.ARTIST);
    this.placeholderText = topItems.items[0].name + ', ...';
  }

  search() {
  }

}
