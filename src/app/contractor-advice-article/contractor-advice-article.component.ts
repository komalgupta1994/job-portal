import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-contractor-advice-article',
  templateUrl: './contractor-advice-article.component.html',
  styleUrls: ['./contractor-advice-article.component.css']
})
export class ContractorAdviceArticleComponent implements OnInit {
	articleId;
	articleData;
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
  	 
     this._routes.params.subscribe((params: Params) => {
      this.articleId = params['id'];
      if (this.articleId) {
        this.getArticleData(this.articleId)
      }
    })
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }
  
  getArticleData(articleId){
  	if(articleId){
  		let input = {
  			"id" : articleId
  		};
  		let url = " http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article/single";

  		this._commonRequestService.postData(url, input)
  			.subscribe(data=>{
  				console.log("artciledata",data);
  				this.articleData = data.data;
  			})
  	}	
  }

  returnToAllArticle(){
    this._router.navigate(['../advice'], {relativeTo: this._routes});
  }

}
