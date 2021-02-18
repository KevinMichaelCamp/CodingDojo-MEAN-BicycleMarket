import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;

  constructor(
    private userService: UserService,
    private validateService: ValidateService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }


  ngOnInit(): void {
  }

  onRegister(): boolean {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      pw_confirm: this.confirm
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validatePasswords(user.password, user.pw_confirm)) {
      this.flashMessage.show('Password must match confirmation', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    const observable = this.userService.registerUser(user);
    observable.subscribe((data: { success: any; msg: string; }) => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }

}
