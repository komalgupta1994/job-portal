import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contractor-advice-menu-listing',
  templateUrl: './contractor-advice-menu-listing.component.html',
  styleUrls: ['./contractor-advice-menu-listing.component.css']
})
export class ContractorAdviceMenuListingComponent implements OnInit {
	adviceCategoryData = [];
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes:ActivatedRoute ) { }

  ngOnInit() {
    
  	this.getadviceCategory();
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }

   getadviceCategory(){
  	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/category";
  	var inputJson = {
  		"email" : "test@gmail.com",
  		"loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"
  	}
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          console.log("adviceCategory", data.data)
          this.adviceCategoryData = data.data; 
        }
    );
  }

  categoryClicked(categoryData){
     this._commonRequestService.setDataWithoutObserval(categoryData.id, 'advice_id');
     this._router.navigate(['../advice'], {relativeTo: this._routes})
  }

}
