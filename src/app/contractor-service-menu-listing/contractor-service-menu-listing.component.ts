import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contractor-service-menu-listing',
  templateUrl: './contractor-service-menu-listing.component.html',
  styleUrls: ['./contractor-service-menu-listing.component.css']
})
export class ContractorServiceMenuListingComponent implements OnInit {
	categoryData = [];
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes:ActivatedRoute ) { }

  ngOnInit() {
  	this.getContarctorHubCategory();
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }

  getContarctorHubCategory(){
  	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/hub/category";
  	var inputJson = {
  		"email" : "test@gmail.com",
  		"loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"
  	}
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          console.log("categoryData", data.data)
          this.categoryData = data.data; 
        }
    );
  }


  // categoryClicked(categoryData){
  //   console.log("categoryData", categoryData);
  //   this._commonRequestService.setDataWithoutObserval(categoryData.contract_hub_category_id, 'category_hub_id');
  // 	this._router.navigate(['../contractor-directory'], {relativeTo: this._routes})
  // }


}
