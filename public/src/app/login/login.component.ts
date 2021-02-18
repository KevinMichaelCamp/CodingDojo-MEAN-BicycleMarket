import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    const user = {
      email: this.email,
      password: this.password
    };

    const observable = this.userService.loginUser(user);
    observable.subscribe((data: { success: any; token: string; user: object; msg: string; }) => {
      if (data.success) {
        this.userService.storeUserData(data.token, data.user);
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    });
  }
}
