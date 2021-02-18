import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../services/bicycle.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbike',
  templateUrl: './addbike.component.html',
  styleUrls: ['./addbike.component.css']
})
export class AddbikeComponent implements OnInit {
  title: string;
  description: string;
  price: number;
  imgurl: string;
  location: string;

  constructor(
    private bikeService: BicycleService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onAddBike(): void {
    const bike = {
      title: this.title,
      description: this.description,
      price: this.price,
      imgurl: this.imgurl,
      location: this.location
    };

    const observable = this.bikeService.addBike(bike);
    observable.subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/addbike']);
      }
    });
  }
}
