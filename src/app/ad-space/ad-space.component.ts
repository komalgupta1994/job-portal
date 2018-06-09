import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-ad-space',
  templateUrl: './ad-space.component.html',
  styleUrls: ['./ad-space.component.css']
})
export class AdSpaceComponent implements OnInit {
	addList;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  	this.getAdsList();
  }

  getAdsList(){
  	let url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/ads";
      this._commonRequestService.getData(url).subscribe(
        data => {
          this.addList = data.data;
          
        }
    );
  }

}
