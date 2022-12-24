import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private connection: ConnectionService, private router: Router, private cookie: CookieService) { }

  ngOnInit() {
    let variables = this.getAllFragmentVariables();
    this.connection.token = <string>variables.get('access_token');
    // let expires = <string>variables.get('expires_in');
    // console.log(new Date(expires));
    this.cookie.set('token', this.connection.token);
    this.cookie.set('testititi', this.connection.token);
    this.cookie.get('');
    this.router.navigateByUrl('/home');
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
