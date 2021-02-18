import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: object;

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    const observable = this.userService.getUser();
    observable.subscribe((data: { user: object; }) => {
      this.user = data.user;
    }, ((err: any) => {
      console.log(err);
    }));
  }

}
