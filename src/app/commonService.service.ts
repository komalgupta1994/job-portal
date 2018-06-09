import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
// import 'rxjs/Rx';
// import { Subject } from 'rxjs/Subject';

// import { APP_CONFIG } from './app.config';
// import { IAppConfig } from './app.config.shared'
// import { CommonRouteFunctionService } from './common-routing-service';
// import { CommonDataSharedService } from './components/shared/commonDataSharedService'
@Injectable()
export class CommonService {
  constructor(private router: Router) {
    
  }

  setSearchResultData;
  jobIdForPreview;
  jobIdForJobPosting;
  lastSearchData;

  setSearchResult(data) {
    this.setSearchResultData = data;
  }

  getSearchResult() {
    return this.setSearchResultData;
  }

  setJobIdForPreview(data) {
    this.jobIdForPreview = data;
  }

  getJobIdForPreview() {
    return this.jobIdForPreview;
  }

  setJobIdForJobPosting(data) {
    this.jobIdForJobPosting = data;
  }

  getJobIdForJobPosting() {
    return this.jobIdForJobPosting;
  }

  setLastSearchData(data) {
    this.lastSearchData = data;
  }

  getLastSearchData() {
    return this.lastSearchData;
  }

  goToRecruiterLogin(data) {
    if(data.auth_error) {
      this.router.navigate(['/public/recruiterLogin']);
    }
  }


}
