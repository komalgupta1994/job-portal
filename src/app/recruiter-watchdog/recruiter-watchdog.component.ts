import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonService } from '../commonService.service';

@Component({
  selector: 'app-recruiter-watchdog',
  templateUrl: './recruiter-watchdog.component.html',
  styleUrls: ['./recruiter-watchdog.component.css']
})
export class RecruiterWatchdogComponent implements OnInit {
	list=[1,2,3];
  sortByData;
  currentSortBy;
  watchListDataArr = [];
  watchListDataArrCount = 0;
  onPageClick = 10;
  pageNo = 1;
  currentPageNo = 10;
  errorMsg = "";
  maxPage;
  maxRecord;
  currentWatchdogDeleteId;
  openWatchdogPopupFlag = false;
  successMessageFlag = false;
  loading = true;
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
    private _commonDataSharedService: CommonDataSharedService, private commonService : CommonService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getSortByData();
  }

  getSortByData() {
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/watchdogs_sort_by";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
         console.log("short by--", data);
         if(data) {
           this.sortByData = data.data;
           this.currentSortBy = 3;
           this.getWatchDogListData(this.pageNo);
         }
        }
    );
  }

  watchDogChange(page) {
    this.watchListDataArr = [];
    this.getWatchDogListData(page);
  }

  getWatchDogListData(pageNo) {
    this.loading = true;
    console.log("currentSortBy--", this.currentSortBy);
     var input = {
     "email":"test@test7.com",
  "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "sort_by_id":this.currentSortBy,
    "page":this.pageNo,
    "limit":this.currentPageNo
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watchdogs/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          this.loading = false;
         console.log("recruiterId--", data);
         if (data && data.status == 'TRUE') {  
         this.maxPage = data.TotalPage;         
           //this.watchListDataArr = data.data;
           for(var i =0;i<data.data.length;i++) {
             this.watchListDataArr.push(data.data[i]);
           }
           this.watchListDataArrCount = data.data.length;
         } else if(data && data.status == 'FALSE'){
           this.commonService.goToRecruiterLogin(data);
           this.watchListDataArr = [];
           this.watchListDataArrCount = 0;
         }
         
        }
    );
  }

  deleteWatchDogOpenPopup(id) {
    console.log("id--", id);
    this.currentWatchdogDeleteId = id;
    this.openWatchdogPopupFlag = true;
  }

  closeWatchdogDeletePopup() {
    this.openWatchdogPopupFlag = false;
  }

  deleteWatchDog() {
    this.errorMsg = "";
    console.log("currentSortBy--", this.currentWatchdogDeleteId);
     var input = {
     "email":"test@test7.com",
  "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "id":this.currentWatchdogDeleteId
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watchdogs/delete";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("recruiterId--", data);
         window.scroll(0,0);
         if(data && data.status == 'TRUE') {
           this.openWatchdogPopupFlag = false;
           this.successMessageFlag = true;
           this.errorMsg = "";
           this.pageNo = 1;
           this.currentPageNo = 10;
           this.watchListDataArr = [];
           this.getWatchDogListData(this.currentPageNo);
           //this.router.navigate(['./recruiter/watchdog']);
         } else if(data && data.status == 'FALSE'){
           this.successMessageFlag = false;
           this.openWatchdogPopupFlag = false;
           this.commonService.goToRecruiterLogin(data);
           this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
         }
        }
    );
  }

  shareContractorProfile(id, emailId) {
    console.log("currentSortBy--", id);
     var input = {
     "email":"test@test7.com",
      "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
      "contractor_id":id,
      "send_to":emailId

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/send_contractor_by_email";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          window.scroll(0,0);
         console.log("result shrae email--", data);
         if(data && data.status === 'TRUE') {
           this.errorMsg = "";
         } else if(data && data.status === 'FALSE'){
           this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
           this.commonService.goToRecruiterLogin(data);
         }
         // this.getWatchDogListData(this.pageNo);
         // this.router.navigate(['./recruiter/watchdog']);
        }
    );
  }

  playButtonClick(item) {
   //  console.log("currentSortBy--", id);
   //   var input = {
   //   "email":"test@test7.com",
   //    "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
   //    "contractor_id":id,
   //    "Job_id":2,
   //    "notify":"1 week"


   // };
   // console.log("input--", input);
   // var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watch_add";
   //     this._commonRequestService.postData(wsUrl,input).subscribe(
   //      data => {
   //       console.log("add watch list--", data);
   //       // this.getWatchDogListData(this.pageNo);
   //       // this.router.navigate(['./recruiter/watchdog']);
   //      }
   //  );
   if(item) {
     var savedSearchSaveJson = {
        // "email":"test@test8.com",
        // "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
        // "recuriter_saved_search_name":this.savedSearchName,
        // "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 2,
        "recuriter_search_job_title": item && item.params && item.params.recuriter_search_job_title ? item.params.recuriter_search_job_title : '',
        "recuriter_search_keywords":item && item.params && item.params.recuriter_search_keywords ? item.params.recuriter_search_keywords : '',
        "recuriter_search_stemmed_terms":item && item.params && item.params.recuriter_search_stemmed_terms,
        "recuriter_search_core_skills":item && item.params && item.params.recuriter_search_core_skills ? item.params.recuriter_search_core_skills : '',
        "recuriter_search_certifications":item && item.params && item.params.recuriter_search_certifications ? item.params.recuriter_search_certifications : '',
        "recuriter_search_dont_show_to_contractor":item && item.params && item.params.recuriter_search_dont_show_to_contractor ? item.params.recuriter_search_dont_show_to_contractor : '',
        "recuriter_search_location":item && item.params && item.params.recuriter_search_location ? item.params.recuriter_search_location : '',
        "recuriter_search_include_relocators":item && item.params && item.params.recuriter_search_include_relocators,
        "recuriter_search_by_rate_min":item && item.params && item.params.recuriter_search_by_rate_min ? item.params.recuriter_search_by_rate_min : '',
        "recuriter_search_by_rate_max":item && item.params && item.params.recuriter_search_by_rate_max ? item.params.recuriter_search_by_rate_max : '',
        "recuriter_search_by_rate_type":item && item.params && item.params.recuriter_search_by_rate_type ? item.params.recuriter_search_by_rate_type : '',
        "recuriter_search_by_time_left":item && item.params && item.params.recuriter_search_by_time_left ? item.params.recuriter_search_by_time_left : '',
        "recuriter_search_by_unavailable":item && item.params && item.params.recuriter_search_by_unavailable,
        "recuriter_search_by_updated_contractor_since":item && item.params && item.params.recuriter_search_by_updated_contractor_since ? item.params.recuriter_search_by_updated_contractor_since : '',
        "recuriter_search_by_contract_name":item && item.params && item.params.recuriter_search_by_contract_name ? item.params.recuriter_search_by_contract_name : '',
        "recuriter_search_by_education":item && item.params && item.params.recuriter_search_by_education ? item.params.recuriter_search_by_education : '',
        "recuriter_search_by_industry":item && item.params && item.params.recuriter_search_by_industry ? item.params.recuriter_search_by_industry.toString() : '',
        "recuriter_search_by_security_clearance":item && item.params && item.params.recuriter_search_by_security_clearance ? item.params.recuriter_search_by_security_clearance.toString() : '',
        "recuriter_search_by_driving_license":item && item.params && item.params.recuriter_search_by_driving_license,
        "postcode": item && item.location && item.location.postcode ? item.location.postcode : '',
        "display_town" : item && item.location && item.location.display_town ? item.location.display_town : '',
        "display_county": item && item.location && item.location.display_county ? item.location.display_county :  '',
        "display_name" : item && item.location && item.location.display_name ? item.location.display_name :  ''
        //"page":1,
        //"limit":12
        //"sort":8
      }

      // this.commonService.setSearchResult(savedSearchSaveJson);
      // this.router.navigate(['/recruiter/searchresult-loggedin']);
      this.router.navigate(['/recruiter/recruiter-home'], { skipLocationChange: true }).then(() =>
        this.router.navigate(['/recruiter/searchresult-loggedin'], { 'relativeTo': this.activateRoute, queryParams :  savedSearchSaveJson} )
      );
    }
  }

  editJob(id) {
  //   console.log("currentSortBy--", id);
  //    var input = {
  //    "email":"test@test7.com",
  // "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
  //   "id":id
  //  };
  //  console.log("input--", input);
  //  var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watchdogs/delete";
  //      this._commonRequestService.postData(wsUrl,input).subscribe(
  //       data => {
  //        console.log("recruiterId--", data);
  //        this.getWatchDogListData();
  //       }
  //   );
  var input = {"watchDogId": id ? id : ''};
  var obj = {'watchDogData' : input};
  localStorage.setItem('watchDogData', JSON.stringify(obj));
  this.router.navigate(['./recruiter/saved-watch-dog']);

  }


  onPageJobList(pageNo) {
    this.currentPageNo = parseInt(pageNo);
    //this.onPageClick = parseInt(pageNo);    
     this.pageNo = 1;
     this.watchListDataArr = [];
    this.getWatchDogListData(this.currentPageNo);
  }

  showMoreWatchDogs() {
    // console.log("before", this.currentPageNo);
    // console.log("this.onPageClick", this.onPageClick);
    //this.pageNo = 2;
     //console.log("this.pageNo before", this.pageNo)
    //this.pageNo += 1;
    //console.log("this.pageNo", this.pageNo)
    //this.currentPageNo = this.onPageClick * this.pageNo;
    //console.log("this.currentPageNo", this.currentPageNo);
    console.log("this.maxPage", this.maxPage);
    if(this.maxPage >= this.pageNo) {
      this.pageNo += 1;
    }
    this.getWatchDogListData(this.currentPageNo);
  }

}
