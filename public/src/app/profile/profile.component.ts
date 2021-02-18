import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BicycleService } from '../services/bicycle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: object;
  bikes: object[];

  constructor(
    private userService: UserService,
    private bikeService: BicycleService
  ) { }

  ngOnInit(): void {
    const userObs = this.userService.getUser();
    userObs.subscribe((data: { user: object; }) => {
      this.user = data.user;
    });

    const bikeObs = this.bikeService.getBikesByUser();
    bikeObs.subscribe((data: { bikes: object[]; }) => {
      this.bikes = data.bikes;
    });
  }

}
