import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contractor-service-listing-details',
  templateUrl: './contractor-service-listing-details.component.html',
  styleUrls: ['./contractor-service-listing-details.component.css']
})
export class ContractorServiceListingDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }

}
