import { Component, OnInit } from '@angular/core';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonRequestService } from '../common-request.service';
import { CommonService } from '../commonService.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recruiter-searchresult-loggedin',
  templateUrl: './recruiter-searchresult-loggedin.component.html',
  styleUrls: ['./recruiter-searchresult-loggedin.component.css']
})
export class RecruiterSearchresultLoggedinComponent implements OnInit {
  searchList = [];
  list = [1,2,3];
  firstArrayValue = [];
  secondArray = [];
  thirdArray = [];
  pageLimit = 12;
  savedResult:any;
  WSErrorMsg = "";
  sortByData;
  currentSortBy = 1;
  pageNo = 1;
  addDynamicallyClass;
  showMoreDetailsFlag: boolean[];
  showPhoneFlag: boolean[];
  jobListData;
  showWatchPopup = false;
  notifyMeValue = "24 hours";
  currentContractorId;
  currentJobId;
  unwatchPopupFlag = false;
  currentUnWatchId;
  showSearchOptionFlag = false;
  searchOptionsDisabled = false;
  showSaveSearchBox = false;
  showSendSearchBox = false;
  showDownloadCVFlag = false;
  storeSaveSearchJson;
  maxPageSize;
  totalRecords;
  showLoginMoreDetailsOptions = false;
  showWithoutLoginMoreOptions = false;
  currentUrl;
  searchNameValue = "";
  searchNameErrorFlag = false;
  successMessage = "";
  successMessageFlag = false;
  saveSearchDataListing = [];
  sameSearchNameFlag = false;
  emailValue = "";
  messageValue = "";
  loading = true;
  searchResultId;
  currentUrlValue;
  emailValueFlag = false;
  constructor(private _commonDataShareService: CommonDataSharedService, public _commonRequestService: CommonRequestService,
    private _commonService: CommonService, private router: Router, private _routes: ActivatedRoute) {
      this.currentUrl = router.url;
     }

  ngOnInit() {
    window.scroll(0,0);
    this.currentUrlValue = this.router.url.match("")
    if(this.router.url.indexOf("/public/searchresult-loggedin") >= 0) {
      this.searchOptionsDisabled = true;
    }
    // var jsonForSearch = {
    //   "recuriter_search_job_title": '',
    //   "recuriter_search_keywords": '',
    //   "recuriter_search_stemmed_terms": 0,
    //   "recuriter_search_core_skills": '',
    //   "recuriter_search_certifications": '',
    //   "recuriter_search_dont_show_to_contractor": '',
    //   "recuriter_search_location": '',
    //   "recuriter_search_include_relocators": 0,
    //   "recuriter_search_by_rate_min": '',
    //   "recuriter_search_by_rate_max": '',
    //   "recuriter_search_by_rate_type": '',
    //   "recuriter_search_by_time_left": '',
    //   "recuriter_search_by_unavailable": 1,
    //   "recuriter_search_by_updated_contractor_since": '',
    //   "recuriter_search_by_contract_name": '',
    //   "recuriter_search_by_education": "",
    //   "recuriter_search_by_industry": "",
    //   "recuriter_search_by_security_clearance": "",
    //   "recuriter_search_by_driving_license": 0,
    //   "postcode": '',
    //   "display_town" : '',
    //   "display_county": '',
    //   "display_name" : ''
    // }
    this.getSortByData();
    this.getJobList();
    //this.savedResult = this._commonService.getSearchResult();
    // console.log("this.savedResult", this.savedResult, "this.searchResultId", this.searchResultId);
    // if(!this.savedResult) {
    //   console.log("on load search");
    //   this.savedResult = jsonForSearch;
    // }

    console.log("this.router.url", this.router.url);

    if (this.router.url.split('/')[2].indexOf('searchresult-loggedin') > -1) {
      this._routes.queryParams.subscribe((params: Params) => {
        let paramData = params;
        console.log("params--", params);
        let output = {};        

        let keyArray = []
        for (let prop in paramData) {
            keyArray.push(prop); 
        }
        console.log("keyArray--", keyArray);

        for(let i=0; i<keyArray.length; i++){
          
          output[keyArray[i]] = paramData[keyArray[i]] && paramData[keyArray[i]].indexOf('+')>-1 ? paramData[keyArray[i]].replace(/\+/g, ' ') : paramData[keyArray[i]];
        }
         this.savedResult = output;
        this.getSearchResultList();
        console.log("jbdjasd",output);

      });
    }

    // this._routes.params.subscribe((params: Params) => {
    //   this.searchResultId = params['id'];
    //   console.log("this.searchResultId--", this.searchResultId);
    //   if (this.searchResultId) {
    //     //alert(1)
    //     console.log("this.savedResult", this.savedResult);
    //     if(this.savedResult) {
    //       this.savedResult['recuriter_search_job_title'] = this.searchResultId;
    //       this.getSearchResultList();
    //     }
    //     //this.getCompanyList();
    //   } else if(this.savedResult) {
    //     //alert(0)
    //     this.getSearchResultList();
    //    }
    // })
  }

  goToAdvancedSearch() {
    if(this.router.url.indexOf("/public/searchresult-loggedin") >= 0) {
      this.router.navigate(['/public/advanced-search']);
    } else if(this.router.url.indexOf("/recruiter/searchresult-loggedin") >= 0) {
      this.router.navigate(['/recruiter/advanced-search']);
    } 
    //this.router.navigate(['./recruiter/advanced-search']);
  }

  getSortByData() {
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by_recruiter_search ";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
         console.log("short by--", data);
         if(data) {
           this.sortByData = data.data;
           
        }
      }
    );
  }

  openWatchPopup(item) {
    this.showWatchPopup = true;
    this.currentContractorId = item && item.contractor_id ? item.contractor_id : '';
  }

  closePopup() {
    this.showWatchPopup = false;
  }

  openUnWatchPopup(item) {
    this.unwatchPopupFlag = true;
    this.currentUnWatchId = item && item.watch_id ? item.watch_id : '';
  }

  closeUnwatchPopup() {
    this.unwatchPopupFlag = false;
  }

  showDownloadCVPopup() {
    this.showDownloadCVFlag = true;
  }

  closeDownloadCVPopup() {
    this.showDownloadCVFlag = false;
  }

  addToWatchList() {
      var input = {
     "email":"test@test7.com",
      "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
      "contractor_id":this.currentContractorId,
      "Job_id":this.currentJobId,
      "notify":this.notifyMeValue


   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watch_add";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("add watch list--", data);
         // this.getWatchDogListData(this.pageNo);
          this.router.navigate(['./recruiter/watch-list']);
          if(data && data.status == 'FALSE') {
           this._commonService.goToRecruiterLogin(data);
         }
        }
    );
  }

  unwatchContractor() {
      var input = {
     "email":"test@test7.com",
      "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
      "watch_id":this.currentUnWatchId
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watch_delete";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("unwatch--", data);
         this.unwatchPopupFlag = false;
         if(data && data.status == 'FALSE') {
           this._commonService.goToRecruiterLogin(data);
         }
         // this.getWatchDogListData(this.pageNo);
          //this.router.navigate(['./recruiter/watch-list']);
        }
    );
  }

  sortChange() {
    this.searchList = [];
    this.firstArrayValue = [];
    this.secondArray = [];
    this.thirdArray = [];
    this.getSearchResultList();
  }

  getJobList() {
    var input = {
      "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "page":1,
    "limit": -1

    }
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/list";
       this._commonRequestService.postData(wsUrl, input).subscribe(
        data => {
         console.log("filter by--", data);
         if(data) {
           this.jobListData = data.data;
           
        } else if(data && data.status == 'FALSE') {
           this._commonService.goToRecruiterLogin(data);
         }
      }
    );
  }

  goToContractorProfile(contractorId, name) {
     var contractorObj = {
      "contractorId" : contractorId
    }
    var obj = {'type':'search-result'};
    localStorage.setItem('currentContractorData', JSON.stringify(obj));
    //this.router.navigate(['./recruiter/view-contractor-profile']);

    this.router.navigate(['/recruiter/recruiter-home'], { skipLocationChange: true }).then(() =>
        this.router.navigate(['/recruiter/view-contractor-profile'], { 'relativeTo': this._routes, queryParams :  contractorObj} )
      );
  }

  showMoreDetails(index) {
    this.showMoreDetailsFlag[index] = !this.showMoreDetailsFlag[index];
  }

  getSearchResultList() {
    this.loading = true;
    console.log("value--", this.savedResult);
    var savedSearchSaveJson = {};
      this.showWithoutLoginMoreOptions = true;
      this.showLoginMoreDetailsOptions = false;
      console.log("currentSortBy", this.currentSortBy);
      savedSearchSaveJson = this.savedResult;
      savedSearchSaveJson['sort'] = this.currentSortBy;
      savedSearchSaveJson['page'] = this.pageNo;
      savedSearchSaveJson['limit'] = this.pageLimit;
      if(this.router.url.indexOf("/public/searchresult-loggedin") == -1) {
        this.showLoginMoreDetailsOptions = true;
        this.showWithoutLoginMoreOptions = false;
        savedSearchSaveJson['email'] = "test@test8.com";
        savedSearchSaveJson['loginToken'] = "$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y";
      }
    this.storeSaveSearchJson = savedSearchSaveJson;
    this.maxPageSize = '';
    this.totalRecords = '';
    //if(!this.sameSearchNameFlag) {
        console.log("savedSearchSaveJson00", savedSearchSaveJson)
        var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/search";
         this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
          data => {
            //this.responseData = data;
            this.loading = false;
            console.log("search result--", data);
            window.scroll(0,0);
            if(data.status === "TRUE"){
              this.maxPageSize = data.TotalPage;
              this.totalRecords = data.recordsTotal;
              //this.searchList = data.data;
              for(var i=0;i<data.data.length;i++) {
                this.searchList.push(data.data[i]);
              }
              this.showMoreDetailsFlag = Array(this.searchList.length).fill(false);
              this.showPhoneFlag = Array(this.searchList.length).fill(false);
              console.log("this.searchList", this.searchList);
             for(var i=0;i<4;i++) {
               if(this.searchList && this.searchList[i]) {
                 this.firstArrayValue[i] = this.searchList[i];
               }
             };
             
           if(this.searchList.length > 4) {
             this.secondArray = [];
             for(var i=0; i<4; i++) {
               if(this.searchList && this.searchList[i+4]) {
                 this.secondArray[i] = this.searchList[i+4];
               }
             }
           } else {
             this.secondArray = [];
           }
           if(this.searchList.length > 8) {
             this.thirdArray = [];
             for(var i=0; i<this.searchList.length; i++) {
               console.log("this.searchList[i+9]", this.searchList[i+8]);
               if(this.searchList && this.searchList[i+8]) {
                 this.thirdArray[i] = this.searchList[i+8];
               }
             }
           } else {
             this.thirdArray = [];
           }
           console.log("firstarrayValue", this.firstArrayValue);
           console.log("secondArray", this.secondArray);
           console.log("thirdArray", this.thirdArray);

              this.WSErrorMsg = "";
            }
            else if(data && data.status == 'FALSE'){
              // this.errorMessageFlag = true;
               this._commonService.goToRecruiterLogin(data);

               this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
      
          }
      ); 
  
  }

  shareSearchResult() {
    this.WSErrorMsg = "";
    if(this.emailValue) {
      this.emailValueFlag = false;
    } else {
      this.emailValueFlag = true;
    }
    var input = {};
    input = {
     "send_to": this.emailValue ? this.emailValue : '',
      "message": this.messageValue ? this.messageValue : '',
      "recuriter_search_job_title":this.savedResult.recuriter_search_job_title ? this.savedResult.recuriter_search_job_title : '',
      "recuriter_search_keywords": this.savedResult && this.savedResult.recuriter_search_keywords ? this.savedResult.recuriter_search_keywords : '',
      "recuriter_search_stemmed_terms":this.savedResult && this.savedResult.recuriter_search_stemmed_terms ? this.savedResult.recuriter_search_stemmed_terms : '',
      "recuriter_search_core_skills":this.savedResult && this.savedResult.recuriter_search_core_skills ? this.savedResult.recuriter_search_core_skills : '',
      "recuriter_search_certifications":this.savedResult && this.savedResult.recuriter_search_certifications ? this.savedResult.recuriter_search_certifications : '',
      "recuriter_search_dont_show_to_contractor": this.savedResult && this.savedResult.recuriter_search_dont_show_to_contractor ? this.savedResult.recuriter_search_dont_show_to_contractor : '',
      "recuriter_search_location": this.savedResult && this.savedResult.recuriter_search_location ? this.savedResult.recuriter_search_location : '',
      "recuriter_search_include_relocators":this.savedResult && this.savedResult.recuriter_search_include_relocators ? this.savedResult.recuriter_search_include_relocators : '',
      "recuriter_search_by_rate_min": this.savedResult && this.savedResult.recuriter_search_by_rate_min ? this.savedResult.recuriter_search_by_rate_min : '',
      "recuriter_search_by_rate_max":this.savedResult && this.savedResult.recuriter_search_by_rate_max ? this.savedResult.recuriter_search_by_rate_max : '',
      "recuriter_search_by_rate_type": this.savedResult && this.savedResult.recuriter_search_by_rate_type ? this.savedResult.recuriter_search_by_rate_type : '',
      "recuriter_search_by_time_left": this.savedResult && this.savedResult.recuriter_search_by_time_left ? this.savedResult.recuriter_search_by_time_left : '',
      "recuriter_search_by_unavailable":this.savedResult && this.savedResult.recuriter_search_by_unavailable ? this.savedResult.recuriter_search_by_unavailable : '',
      "recuriter_search_by_updated_contractor_since":this.savedResult && this.savedResult.recuriter_search_by_updated_contractor_since ? this.savedResult.recuriter_search_by_updated_contractor_since : '',
      "recuriter_search_by_contract_name": this.savedResult && this.savedResult.recuriter_search_by_contract_name ? this.savedResult.recuriter_search_by_contract_name : '',
      "recuriter_search_by_education": this.savedResult && this.savedResult.recuriter_search_by_education ? this.savedResult.recuriter_search_by_education : '',
      "recuriter_search_by_industry": this.savedResult && this.savedResult.recuriter_search_by_industry ? this.savedResult.recuriter_search_by_industry : '',
      "recuriter_search_by_security_clearance": this.savedResult && this.savedResult.recuriter_search_by_security_clearance ? this.savedResult.recuriter_search_by_security_clearance : '',
      "recuriter_search_by_driving_license": this.savedResult && this.savedResult.recuriter_search_by_driving_license ? this.savedResult.recuriter_search_by_driving_license : '',
      "page":this.pageNo,
      "limit":this.pageLimit,
      "sort":this.currentSortBy
   };
   // if(this.savedResult && typeof this.savedResult == 'string') {
   //    input['recuriter_search_job_title'] = this.savedResult ? this.savedResult : '';
   //  } else if(this.savedResult && typeof this.savedResult == 'object') {
   //    input['recuriter_search_job_title'] = this.savedResult.recuriter_search_job_title ? this.savedResult.recuriter_search_job_title : '';
      if(this.router.url.indexOf("/public/searchresult-loggedin") == -1) {
        input['email'] = "test@test8.com";
        input['loginToken'] = "$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y";
      }
    //}
   console.log("input--", input);
   if(!this.emailValueFlag) {
     var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/send_search";
         this._commonRequestService.postData(wsUrl,input).subscribe(
          data => {
            console.log("share details--", data);
            if(data && data.status == 'TRUE') {
              //this.saveSearchDataListing = data.data;
              this.successMessageFlag = true;
              this.successMessage = "Send Search Successfully.";
              this.WSErrorMsg = "";
              this.showSearchOptionFlag = false;
            } else if(data && data.status == 'FALSE'){
              this.successMessageFlag = false;
              this.successMessage = "";
                 this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
                 this._commonService.goToRecruiterLogin(data);

               
              }
            //this.industryArrayData = data.data;
            //this.recruiterNameArray = data.data;
          } 
      );
    }
  }

  onPageClick(pageNo) {
    this.pageNo = 1;
    this.pageLimit = parseInt(pageNo);
    this.searchList = [];
    this.firstArrayValue = [];
    this.secondArray = [];
    this.thirdArray = [];
    this.getSearchResultList();
  }

  getRangeSliderValue(event) {
    // this.filteredData = this.searchResult.filter(item=>{
    //   return  item.prefereedRate.minRate>event.from && item.prefereedRate.maxRate<event.to
    // })

    this.savedResult.recuriter_search_by_rate_min = event.from;
    this.savedResult.recuriter_search_by_rate_max = event.to;
    this.savedResult.recuriter_search_by_rate_type = this.savedResult.recuriter_search_by_rate_type ? this.savedResult.recuriter_search_by_rate_type : 'daily';
    this.searchList = [];
    this.firstArrayValue = [];
    this.secondArray = [];
    this.thirdArray = [];
    this.getSearchResultList();
  }

   showMoreContractors() {
    // console.log("before", this.currentPageNo);
    // console.log("this.onPageClick", this.onPageClick);
    //this.pageNo = 2;
     //console.log("this.pageNo before", this.pageNo)
    //this.pageNo += 1;
    if(this.maxPageSize >= this.pageNo) {
      this.pageNo += 1;
    }
    //console.log("this.pageNo", this.pageNo)
    // if(this.maxPageSize >= this.pageNo) {
    //   this.pageLimit = this.pageLimit * this.pageNo;
      
    // } 
    // if(this.pageLimit > this.totalRecords) {
    //     this.pageLimit = 12 * this.pageNo;
    //   }
      this.getSearchResultList();
    //console.log("this.currentPageNo", this.currentPageNo);
    //this.getSearchResultList();
  }

  getListOfSaveSearch() {
    this.WSErrorMsg = "";
    var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("list save search--", data);
          if(data && data.data && data.data.length > 0) {
            this.saveSearchDataListing = data.data;
            this.WSErrorMsg = "";
          } else if(data && data.status == 'FALSE'){
               this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
               this._commonService.goToRecruiterLogin(data);
             
            }
          //this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
        } 
    );
  }

   saveSearchField() {
    this.WSErrorMsg = "";

    if(this.searchNameValue) {
      this.searchNameErrorFlag = false;
    } else {
      this.searchNameErrorFlag = true;
    }
    var savedSearchSaveJson = {
      "email":"test@test8.com",
      "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
      "recuriter_saved_search_name":this.searchNameValue,
      "recuriter_search_add_to_watchdog":0,
      "recuriter_search_job_title":'',
      "recuriter_search_keywords":'',
      "recuriter_search_stemmed_terms":0,
      "recuriter_search_core_skills":'',
      "recuriter_search_certifications":'',
      "recuriter_search_dont_show_to_contractor":'',
      "recuriter_search_location":'',
      "recuriter_search_include_relocators": 0,
      "recuriter_search_by_rate_min":'',
      "recuriter_search_by_rate_max":'',
      "recuriter_search_by_rate_type":'',
      "recuriter_search_by_time_left":'',
      "recuriter_search_by_unavailable":0,
      "recuriter_search_by_updated_contractor_since":'',
      "recuriter_search_by_contract_name":'',
      "recuriter_search_by_education":"",
      "recuriter_search_by_industry":[],
      "recuriter_search_by_security_clearance":[],
      "recuriter_search_by_driving_license": 0
      // "postcode": this.postcode ? this.postcode : '',
      // "display_town" : this.displayTown ? this.displayTown : '',
      // "display_county": this.displayCountry ? this.displayCountry : '',
      // "display_name" : this.displayLocationName ? this.displayLocationName : '',
     
    }
          if(!this.searchNameErrorFlag) {
              var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search";
               this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
                data => {
                  //this.responseData = data;
                  window.scroll(0,0);
                  if(data && data.status === "TRUE"){
                          this.WSErrorMsg = "";
                          this.successMessageFlag = true;
                              this.successMessage = "Search name saved successfully.";
                              this.searchNameValue = "";
                          // setInterval(()=>{
                          //   this.successMessage = "";
                          // },10000);
                          
                          this.showSearchOptionFlag = false;
                          //this.errorSuccessMessage = "Saved succesfully !";
                  }
                  else if(data && data.status == 'FALSE'){
                    this.successMessageFlag = false;
                    this.successMessage = "";
                     this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
                     this._commonService.goToRecruiterLogin(data);
                  }
                }
              ); 
            }
  }

  slidePhoneNumber(index) {
    // $( "#slidePhone" ).slide( "slide" );
    //this.showPhoneFlag[index] = !this.showPhoneFlag[index];
    //if(this.showPhoneFlag[index]) {
     $(".box_"+index).css('display','inline-block');
     $("#slidePhone_"+index).animate({width:"toggle"});
    //}

  }

}
