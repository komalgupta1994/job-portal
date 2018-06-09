import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contractor-advice-category',
  templateUrl: './contractor-advice-category.component.html',
  styleUrls: ['./contractor-advice-category.component.css']
})
export class ContractorAdviceCategoryComponent implements OnInit {
	adviceCategoryData = [];
	articleList = [];
  latestAdviceArticleList = [];
  articleToShow = [];
	selectedAdviceCategory;
  config: SwiperOptions = {
    //pagination: '.swiper-pagination',
    //  paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30
  }
  searchClicked = false;
  searchKeyword;
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
    this.selectedAdviceCategory = this._commonRequestService.getDataWithoutObserval('advice_id');
    if (this.selectedAdviceCategory) {
      this.getPostByCategory();
    }
    this.getadviceCategory();
    this.getLatestAdviceArticle();
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }

  getadviceCategory() {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/category";
    var inputJson = {
      "email": "test@gmail.com",
      "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"
    }
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        console.log("adviceCategory", data.data)
        this.adviceCategoryData = data.data;
        if (!this.selectedAdviceCategory) {
          this.selectedAdviceCategory = this.adviceCategoryData[0].id;
          this.getPostByCategory();
        }
      }
    );
  }

  getPostByCategory() {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article";
    var inputJson = {
      "email": "test@gmail.com",
      "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
      "category": this.selectedAdviceCategory,
      "page": 1,
      "limit": 1

    }
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        console.log("articleList", data.data)
        this.articleList = data.data;
        if(this.searchClicked){
          this.articleToShow = this.articleList;
        }
      }
    );
  }

  getLatestAdviceArticle() {
    let input = {
      page: 1,
      limit: 10
    }
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article/all";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        this.latestAdviceArticleList = data.data;
        this.articleToShow = this.latestAdviceArticleList;
        console.log(this.latestAdviceArticleList);
      }
    );
  }

  readFullArticle(item) {
    console.log(item);
    localStorage.setItem("adviceArticleId", item.id);
    this._commonRequestService.setDataWithoutObserval(item.id, "adviceArticleId");
    this._router.navigate(['../adviceDetail'], {relativeTo: this._routes});
  }


  searchArticle(){
    if(this.searchKeyword){
      let input = {
      page: 1,
      limit: -1,
      search : this.searchKeyword
    }
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article/search";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        if(data.status == "TRUE"){
          this.articleToShow  = data.data;
        }else if(data.status === "FALSE"){
          this.articleToShow = [];
        }
        
      }
    );
    }
    
  }



}
