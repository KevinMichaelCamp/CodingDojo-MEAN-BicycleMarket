import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm: string;
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    const observable = this.userService.getUser();
    observable.subscribe((data) => {
      console.log(data.user);
      this.user = data.user;
      this.user.password = null;
      this.user.confirm = null;
    });
  }

  onEdit(): void {
    const observable = this.userService.editUser(this.user);
    observable.subscribe((data: { success: any; msg: string; }) => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/edituser']);
      }
    });
  }

}
