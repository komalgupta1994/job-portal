import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-latest-news-listing',
  templateUrl: './latest-news-listing.component.html',
  styleUrls: ['./latest-news-listing.component.css']
})
export class LatestNewsListingComponent implements OnInit {

  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }
  newsList;
  loading = true;
  
  ngOnInit() {
  	this.getLatestNews()
  }

  getLatestNews(){
  	this.loading = true;
    var inputJson = {
      page :1,
      limit: 2
    }
  	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles";
      this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.newsList = data.data;
          console.log("newsList", this.newsList);
          this.loading = false;
        }
    );
  }

  goToNews(news){
    this._commonRequestService.setDataWithoutObserval(news._id, "newsId");
    localStorage.setItem("newsId", news._id);
    this._router.navigate(['../news'], {relativeTo: this._routes});
  }
  
}
