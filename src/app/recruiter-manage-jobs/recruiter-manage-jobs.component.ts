import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonService } from '../commonService.service';
import { CommonDataSharedService } from '../commonDataSharedService';

@Component({
  selector: 'app-recruiter-manage-jobs',
  templateUrl: './recruiter-manage-jobs.component.html',
  styleUrls: ['./recruiter-manage-jobs.component.css']
})
export class RecruiterManageJobsComponent implements OnInit {
	listingData = [];
	recruiterName;
	firstArray = [];
	secondArray = [];
	thirdArray = [];
	currentPageNo = 9;
  errorMsg = "";
  errorMsgFlag = false;
  jobPostFlag = false;
  pageNo = 1;
  onPageClick = 9;
  sortByData;
  jobPostFlagError = false;
  totalPage;
  maxRecord;
  loading = true;
  firstFound;
  secondFound;
  thirdFound;
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService, private _commonService: CommonService) { }

  ngOnInit() {
  	this.getManageJobsList(9);
    this.getSortByData();
  }

  passJobId(id) {
  	//this._commonDataSharedService.manageJobsJobId.next(id);
  	// var obj = {'jobId' : id};
   //  localStorage.setItem('recruiterJobData', JSON.stringify(obj));
    this._commonService.setJobIdForJobPosting(id);
  }

  passJobIdForPreview(id) {
    this._commonService.setJobIdForPreview(id);
  }

  getSortByData() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
          console.log("sort by--", data);
          if(data && data.status == 'TRUE') {
            this.sortByData = data.data;
          }
          //this.recruiterNameArray = data.data;
          else if(data && data.status === "FALSE") {
            this.errorMsgFlag = true;
              this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
              this._commonService.goToRecruiterLogin(data);
              // if(data.auth_error) {
              //   this.router.navigate(['/public/recruiterLogin']);
              // }
            }
        }
    );
  }

  recruiterList(recruiterId) {
  	 var input = {
   	"email":"test@test7.com",
	"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("recruiterId--", data);
         if(data && data.status == 'TRUE') {
           for(var i=0;i<data.data.length;i++) {
           	if(data.data[i].recuriter_id === parseInt(recruiterId)) {
           		this.recruiterName = data.data[i].recuriter_contact_name
           	}
           }
           console.log("this.recruiterName", this.recruiterName);
         } else if(data && data.status === "FALSE") {
            this.errorMsgFlag = true;
              this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
              this._commonService.goToRecruiterLogin(data);
              // if(data.auth_error) {
              //   this.router.navigate(['/public/recruiterLogin']);
              // }
            }
         //this.listingData = data.data;
         
        }
    );
       return this.recruiterName;
  }

  getManageJobsList(pageLimit) {
    this.loading = true;
    console.log("pageLimit--", pageLimit);
   var input = {
   	"email":"test@test7.com",
	"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
   	"page":this.pageNo,
	"limit":pageLimit
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          this.loading = false;
         console.log("data from manage job list--", data);
         if(data && data.status === "TRUE") {
           this.errorMsg = "";
           this.errorMsgFlag = false;
           //this.listingData = data.data;
           this.totalPage = data.TotalPage;
           this.maxRecord = data.recordsTotal;
           for(var i=0;i<data.data.length;i++) {
             this.listingData.push(data.data[i]);
           }
             for(var i=0;i<3;i++) {
             	if(this.listingData && this.listingData[i]) {
             		this.firstArray[i] = this.listingData[i];
             	}
             };
             
           if(this.listingData.length > 3) {
             this.secondArray = [];
             for(var i=0; i<6; i++) {
             	if(this.listingData && this.listingData[i+3]) {
             		this.secondArray[i] = this.listingData[i+3];
             	}
             }
           } else {
             this.secondArray = [];
           }
           if(this.listingData.length > 9) {
             this.thirdArray = [];
             for(var i=0; i<this.listingData.length; i++) {
               console.log("this.listingData[i+9]", this.listingData[i+9]);
             	if(this.listingData && this.listingData[i+9]) {
             		this.thirdArray[i] = this.listingData[i+9];
             	}
             }
           } else {
             this.thirdArray = [];
           }
           console.log("firstarray", this.firstArray);
           console.log("secondArray", this.secondArray);
           console.log("thirdArray", this.thirdArray);
          } else if(data && data.status === "FALSE") {
            this.errorMsgFlag = true;
              this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
              this._commonService.goToRecruiterLogin(data);
              // if(data.auth_error) {
              //   this.router.navigate(['/public/recruiterLogin']);
              // }
            }
        }
    );
  }

  checkAndAdd(name) {
  //var id = arr.length + 1;
  //var found:any;
  this.firstFound = this.firstArray.some(function (el) {
    console.log("el-", el);
    return el.jobid === name;
  });
  this.secondFound = this.secondArray.some(function (el) {
    console.log("el-", el);
    return el.jobid === name;
  });
  this.thirdFound = this.thirdArray.some(function (el) {
    console.log("el-", el);
    return el.jobid === name;
  });
  console.log("firstFound", this.firstFound);
  console.log("secondFound", this.secondFound);
  console.log("thirdFound", this.thirdFound);
  //if (!found) { arr.push({ id: id, username: name }); }
}

  onPageJobList(pageNo) {
    this.currentPageNo = parseInt(pageNo);
    this.pageNo = 1;
    //this.onPageClick = parseInt(pageNo);
     this.listingData = [];
    this.firstArray = [];
     this.secondArray = [];
     this.thirdArray = [];
     this.pageNo = 1;
    this.getManageJobsList(this.currentPageNo);
  }

  showMoreJobs() {
    // console.log("before", this.currentPageNo);
    // console.log("this.onPageClick", this.onPageClick);
    //this.pageNo = 2;
     //console.log("this.pageNo before", this.pageNo)
    //this.pageNo += 1;
    //console.log("this.pageNo", this.pageNo)
    //this.currentPageNo = this.onPageClick * this.pageNo;
    if(this.totalPage >= this.pageNo) {
      this.pageNo += 1;
    }
    //console.log("this.currentPageNo", this.currentPageNo);
    this.getManageJobsList(this.currentPageNo);
  }

  refreshJob(jobId, index) {
    this.errorMsg = "";
    console.log("jobid", jobId, "index--", index);
    this.checkAndAdd(jobId);
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "jobid":jobId

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/view";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("data--", data);
          if(data && data.status == 'TRUE') {
            this.errorMsg = "";
            if(this.firstFound) {
              this.firstArray[index] = data.data;
            } else if(this.secondFound) {
              this.secondArray[index] = data.data;
            } else if(this.thirdFound) {
              this.thirdArray[index] = data.data;
            }
          } else if(data && data.status === "FALSE") {
              //this.errorMsgFlag = true;
              this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
              this._commonService.goToRecruiterLogin(data);
              // if(data.auth_error) {
              //   this.router.navigate(['/public/recruiterLogin']);
              // }
            }
         console.log("jobList--", this.firstArray[index]);
        }
    );
  }

  deleteJob(id) {
     var input = {
     "email":"test@test7.com",
  "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
  "jobid":id

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/delete";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("delete--", data);
         if (data) {
           this.jobPostFlag = true;
           this.jobPostFlagError = false;
           this.getManageJobsList(this.currentPageNo);
         } else if(data && data.status === "FALSE"){
           this.jobPostFlag = false;
           this.jobPostFlagError = true; 
           this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
           this._commonService.goToRecruiterLogin(data); 
                  
         }
        }
    );
  }

}
