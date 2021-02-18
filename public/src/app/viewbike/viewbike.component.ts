import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../services/bicycle.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-viewbike',
  templateUrl: './viewbike.component.html',
  styleUrls: ['./viewbike.component.css']
})
export class ViewbikeComponent implements OnInit {
  id: string;
  bike: object;

  constructor(
    private bikeService: BicycleService,
    private route: ActivatedRoute
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

}
