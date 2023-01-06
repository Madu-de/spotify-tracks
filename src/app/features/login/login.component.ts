import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public connectionService: ConnectionService) { }

  ngOnInit() {
    sessionStorage.clear();
  }

  loginWithOwnClientId() {
    alert(`You have to add "${environment.REDIRECT_URL}" as 'Redirect URIs' in your application`)
    let clientId = <string>prompt('Enter your client ID:');
    this.connectionService.connectToSpotify(clientId);
  }

}
