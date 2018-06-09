import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contractor-advice',
  templateUrl: './contractor-advice.component.html',
  styleUrls: ['./contractor-advice.component.css']
})
export class ContractorAdviceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
   window.scroll(0,0);
  }

}
