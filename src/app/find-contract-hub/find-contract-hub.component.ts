import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-find-contract-hub',
  templateUrl: './find-contract-hub.component.html',
  styleUrls: ['./find-contract-hub.component.css']
})
export class FindContractHubComponent implements OnInit {
  categoryData = [];
  firstCategoryArray = [];
  secondCategoryArray = [];
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes:ActivatedRoute ) { }

  ngOnInit() {
  	this.getContarctorHubCategory();
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
          if(this.categoryData.length >4){
            for(var i =0;i< 4; i++){
              this.firstCategoryArray.push(this.categoryData[i]);
            }  
            for(var i=4;i<this.categoryData.length; i++){
              this.secondCategoryArray.push(this.categoryData[i])
            }

          }else{
            this.firstCategoryArray = this.categoryData;
          }
          console.log("this.firstCategoryArray", this.firstCategoryArray);
          console.log("this.secondCategoryArray", this.secondCategoryArray);


          
        }
    );
  }


  categoryClicked(categoryData){
    console.log("categoryData", categoryData);
    this._commonRequestService.setDataWithoutObserval(categoryData.contract_hub_category_id, 'category_hub_id');
  	this._router.navigate(['../contractor-directory'], {relativeTo: this._routes})
  }

  goToContractorHub(){
    this._router.navigate(['../contractor_hub_home'], {relativeTo: this._routes})
  }



}
