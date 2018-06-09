import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ToolTipModule} from 'angular2-tooltip';
import {TooltipModule} from "ng2-tooltip";
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common'; 
import { IonRangeSliderModule } from "ng2-ion-range-slider";

import { SharedModule } from '../shared/shared.module';

import { RecruiterRoutingModule } from './recruiter-routing.module'
import { RecruiterManagePasswordComponent } from '../recruiter-manage-password/recruiter-manage-password.component';
import { RecruiterManageAccountComponent } from '../recruiter-manage-account/recruiter-manage-account.component';
import { RecruiterManageProfileComponent } from '../recruiter-manage-profile/recruiter-manage-profile.component';
import { RecruiterManageUserComponent } from '../recruiter-manage-user/recruiter-manage-user.component';
//import { LoginRecruiterComponent } from '../login-recruiter/login-recruiter.component';
//import { RecruiterSignUpComponent } from '../recruiter-sign-up/recruiter-sign-up.component';

//import { AboutRecruiterComponent } from '../about-recruiter/about-recruiter.component';
//import { RecruiterAdvancedSearchComponent } from '../recruiter-advanced-search/recruiter-advanced-search.component';
import { RecruiterHelpComponent } from '../recruiter-help/recruiter-help.component';
import { RecruiterJobPostingComponent } from '../recruiter-job-posting/recruiter-job-posting.component';
import { RecruiterManageJobsComponent } from '../recruiter-manage-jobs/recruiter-manage-jobs.component';
import { RecruiterPreviewJobComponent } from '../recruiter-preview-job/recruiter-preview-job.component';
//import { RecruiterSavedSearchComponent } from '../recruiter-saved-search/recruiter-saved-search.component';
//import { RecruiterSearchresultLoggedinComponent } from '../recruiter-searchresult-loggedin/recruiter-searchresult-loggedin.component';
import { RecruiterViewApplicationsComponent } from '../recruiter-view-applications/recruiter-view-applications.component';
import { RecruiterViewProfileComponent } from '../recruiter-view-profile/recruiter-view-profile.component';
import { RecruiterWatchListComponent } from '../recruiter-watch-list/recruiter-watch-list.component';
import { RecruiterWatchdogComponent } from '../recruiter-watchdog/recruiter-watchdog.component';
//import { ViewContractorProfileComponent } from '../view-contractor-profile/view-contractor-profile.component';
import { RecuriterSavedWatchDogComponent } from '../recuriter-saved-watch-dog/recuriter-saved-watch-dog.component';
import { RecruiterHomeComponent } from '../recruiter-home/recruiter-home.component';

@NgModule({
  declarations: [
    RecruiterManagePasswordComponent,
	RecruiterManageAccountComponent,
	RecruiterManageProfileComponent,
	RecruiterManageUserComponent,
	//LoginRecruiterComponent,
	//RecruiterSignUpComponent,
	//AboutRecruiterComponent,
	//RecruiterAdvancedSearchComponent,
	RecruiterHelpComponent,
	RecruiterJobPostingComponent,
	RecruiterManageJobsComponent,
	RecruiterPreviewJobComponent,
	//RecruiterSavedSearchComponent,
	//RecruiterSearchresultLoggedinComponent,
	RecruiterViewApplicationsComponent,
	RecruiterViewProfileComponent,
	RecruiterWatchListComponent,
	RecruiterWatchdogComponent,
	//ViewContractorProfileComponent,
	RecuriterSavedWatchDogComponent,
	RecruiterHomeComponent
  ],
  imports: [
   
   FormsModule,
   ToolTipModule,
	TooltipModule,
	HttpModule,
	SharedModule,
	RecruiterRoutingModule,
	CommonModule,
	IonRangeSliderModule
  ],
  providers: []
})
export class RecruiterModule { }
