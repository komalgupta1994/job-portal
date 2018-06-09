import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contractor-applications',
  templateUrl: './contractor-applications.component.html',
  styleUrls: ['./contractor-applications.component.css']
})
export class ContractorApplicationsComponent implements OnInit {
  appliedJobList;
  sortOptions = [];
  sortBy = 1;
  loading = true;
  currentPage = 1;
  totalPage;
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
    this.getSortOptions()
    this.getAppliedjobList();
  }

  ngAfterViewInit() {
    window.scroll(0, 0);
  }


  getSortOptions() {
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by";
    this._commonRequestService.getData(url).subscribe(
      data => {
        this.sortOptions = data.data;
      }
    );
  }

  getAppliedjobList() {
    this.loading = true;
    let input = {
      "email": "test@test.com",
      "loginToken": "lsbdjaGUJ46fdsfJnLMjdfsdfssdfJG67",
      "page": this.currentPage,
      "limit": 6,
      "sort_by": this.sortBy
    }
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/applied_job/list";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        this.loading = false;
        if (data.status == "TRUE") {
          if (this.currentPage > 1) {
            this.appliedJobList = this.appliedJobList.concat(data.data);
          } else {
            this.appliedJobList = data.data;
          }
          this.totalPage = data.TotalPage;

        } else {
          if (data.error == "No Record Found") {

            this.totalPage = 0;
            this.appliedJobList = [];
          }
        }
      }
    );

  }


  viewCompany(job) {
    this._commonRequestService.setDataWithoutObserval(job.company_id, "viewCompanyId");
    localStorage.setItem("viewCompanyId", job.company_id);
    this._router.navigate(['../companyProfile'], { relativeTo: this._routes });
  }

}
