import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../services/bicycle.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  bikes: object[];

  constructor(
    private bikeService: BicycleService
  ) { }

  ngOnInit(): void {
    const observable = this.bikeService.getBikes();
    observable.subscribe((data: { bikes: object[]; }) => {
      this.bikes = data.bikes;
    });
  }

}
