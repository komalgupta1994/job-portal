import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-recuriter-profile',
  templateUrl: './contractor-recuriter-profile.component.html',
  styleUrls: ['./contractor-recuriter-profile.component.css']
})
export class ContractorRecuriterProfileComponent implements OnInit {
  jobList = [];
  companyId;
  pageNo = 1;
  pageSize = 3;
  showAll = true;
  companyDetail;
  comapnySocial;
  totalPage;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.companyId = this._commonRequestService.getDataWithoutObserval("viewCompanyId");
    if (!this.companyId) {
      this.companyId = localStorage.getItem("viewCompanyId");
    }
    this.getCompanyProfile(this.companyId);

    this.getJobList();
  }


  ngAfterViewInit() {
    window.scroll(0, 0);
  }

  getCompanyProfile(companyId) {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/company_detail";
    var inputJson = {
      "email": "test@gmail.com",
      "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
      "company_id": companyId

    }
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        this.companyDetail = data.data;
        this.comapnySocial =  this.companyDetail.companySocial && typeof(this.companyDetail.companySocial) == 'string'  ? JSON.parse(this.companyDetail.companySocial) : this.companyDetail.companySocial;
        
      }
    );
  }

  getJobList() {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/job/list";
    var inputJson = {
      "email": "test@gmail.com",
      "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
      "page": this.pageNo,
      "limit": this.pageSize

    }
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        if (data.status == 'TRUE') {
          this.jobList = data.data;
          this.totalPage = data.TotalPage;
        }
        else if (data.status == 'NO RECORD FOUND') {
          this.totalPage = undefined;
        }

      }
    );
  }

  getAllJobs() {
    if (this.showAll) {
      this.pageNo = 1;
      this.pageSize = -1;

    } else {
      this.pageNo = 1;
      this.pageSize = 3;
    }

    this.getJobList();
    this.showAll = !this.showAll;
  }





  applyJob(jobDetail) {
    if (jobDetail.applied !== 1) {
      var url = " http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/job/apply";
      var inputJson = {
        "email": "test@gmail.com",
        "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
        "jobid": jobDetail.jobid

      }
      this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.getJobList();
        }
      );
    }

  }

}
