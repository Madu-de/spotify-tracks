import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search.component';

@Component({
  selector: 'app-filterWindow',
  templateUrl: './filterWindow.component.html',
  styleUrls: ['./filterWindow.component.scss']
})
export class FilterWindowComponent implements OnInit {

  constructor(private searchComponent: SearchComponent) { }

  ngOnInit() {
  }

  closeWindow() {
    this.searchComponent.showFilterWindow = false;
  }

}
