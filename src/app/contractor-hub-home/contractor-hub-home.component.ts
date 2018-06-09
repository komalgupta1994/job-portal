import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contractor-hub-home',
  templateUrl: './contractor-hub-home.component.html',
  styleUrls: ['./contractor-hub-home.component.css']
})
export class ContractorHubHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }

}
