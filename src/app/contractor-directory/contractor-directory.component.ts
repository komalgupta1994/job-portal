import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contractor-directory',
  templateUrl: './contractor-directory.component.html',
  styleUrls: ['./contractor-directory.component.css']
})
export class ContractorDirectoryComponent implements OnInit {
	selectedContractorHubCategory;
	categoryData = [];
	companyData;
  constructor(private _commonRequestService: CommonRequestService, private _routes: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.getContarctorHubCategory();
    this._routes.params.subscribe((params: Params) => {
      this.selectedContractorHubCategory = params['id'];
      if (this.selectedContractorHubCategory) {
        this.getCompanyList();
      }
    })


    //this.selectedContractorHubCategory = this._commonRequestService.getDataWithoutObserval('category_hub_id');

  }

  ngAfterViewInit() {
    window.scroll(0, 0);
  }

  categoryClicked(categoryData) {
    
    this.selectedContractorHubCategory = categoryData.contract_hub_category_id;
    // this.getCompanyList();
    this._router.navigate(['../' + this.selectedContractorHubCategory], {relativeTo: this._routes});

  }

  getCompanyList() {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/hub/company";
    var inputJson = {
      "email": "test@gmail.com",
      "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
      "hub_category": this.selectedContractorHubCategory,
      "limit": 20,
      "page": 1
    }
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        this.companyData = data;
      }
    );
  }

  getContarctorHubCategory() {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/hub/category";
    var inputJson = {
      "email": "test@gmail.com",
      "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"
    }
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        this.categoryData = data.data;
        // if (!this.selectedContractorHubCategory) {
        //   this.selectedContractorHubCategory = this.categoryData[0].contract_hub_category_id;
        //   this.getCompanyList();
        // }
      }
    );
  }

  navigateToWeb(webAddress) {
    window.open(webAddress, "_blank");
  }



}
