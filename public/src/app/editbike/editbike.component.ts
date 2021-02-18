import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../services/bicycle.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-editbike',
  templateUrl: './editbike.component.html',
  styleUrls: ['./editbike.component.css']
})
export class EditbikeComponent implements OnInit {
  id: string;
  bike: {
    title: string;
    description: string;
    price: number;
    imgurl: string;
    location: string;
  };

  constructor(
    private bikeService: BicycleService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = 'id';
      this.id = params[id];
    });

    const observable = this.bikeService.getBikeByID(this.id);
    observable.subscribe(data => {
      this.bike = data.bike;
    });
  }

  onEditBike(): void {
    const observable = this.bikeService.updateBike(this.id, this.bike);
    observable.subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate([`/edit/${this.id}`]);
      }
    })
  }

}
