import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-help',
  templateUrl: './contractor-help.component.html',
  styleUrls: ['./contractor-help.component.css']
})
export class ContractorHelpComponent implements OnInit {
	helpCategoryList;
  helpData;
  searchKeyword;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.getHelpCategory()
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }

  getHelpCategory() {
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/help_category";
    this._commonRequestService.getData(url).subscribe(
      data => {
        this.helpCategoryList = data.data;
        this.getHelpByCategoryId(this.helpCategoryList[0]._id)
        console.log("this.helpCategoryList", this.helpCategoryList)
      }
    );
  }


  getHelpByCategoryId(categoryId) {
    this.helpData = [];
    let input = {
      category: categoryId,
      "page": 1,
      "limit": -1
    };
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/help_article_by_category";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        this.helpData = data.data;
        console.log(this.helpData);
      }, err => {
        console.log("err", err);
      }
    );
  }


  searchHelp() {
     let input = {
      "page": 1,
      "limit": -1,
      "category_type": "contractor",
      "search": this.searchKeyword

    };
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/help_article_by_category_type";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log("err", err);
      }
    );
  }

}
