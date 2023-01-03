import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';
import { CookieService } from 'src/app/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private connection: ConnectionService, private cookie: CookieService, private router: Router) { }

  ngOnInit() {
    let variables = this.connection.getAllFragmentVariables();
    this.connection.token = <string>variables.get('access_token');
    this.cookie.set('token', this.connection.token);
    this.router.navigateByUrl('/home');
  }
}
