import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contractor-header',
  templateUrl: './contractor-header.component.html',
  styleUrls: ['./contractor-header.component.css']
})
export class ContractorHeaderComponent implements OnInit {
  showMenu = false;
  constructor() { }

  ngOnInit() {
  	
  }

  logout(){
  	
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  logoutContractor(){
    localStorage.removeItem("loginDetail");
  }

}
