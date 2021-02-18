import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.userService.logout();
    this.flashMessage.show('User logged out', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/']);
  }
}
