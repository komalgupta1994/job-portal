import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ReferenceListComponent } from './components/reference-list/reference-list.component';

import { RecruiterManagePasswordComponent } from '../recruiter-manage-password/recruiter-manage-password.component';
import { RecruiterManageAccountComponent } from '../recruiter-manage-account/recruiter-manage-account.component';
import { RecruiterManageProfileComponent } from '../recruiter-manage-profile/recruiter-manage-profile.component';
import { RecruiterManageUserComponent } from '../recruiter-manage-user/recruiter-manage-user.component';
//import { RecruiterSignUpComponent } from '../recruiter-sign-up/recruiter-sign-up.component';

import { RecruiterAdvancedSearchComponent } from '../recruiter-advanced-search/recruiter-advanced-search.component';
import { RecruiterHelpComponent } from '../recruiter-help/recruiter-help.component';
import { RecruiterJobPostingComponent } from '../recruiter-job-posting/recruiter-job-posting.component';
import { RecruiterManageJobsComponent } from '../recruiter-manage-jobs/recruiter-manage-jobs.component';
import { RecruiterPreviewJobComponent } from '../recruiter-preview-job/recruiter-preview-job.component';
import { RecruiterSavedSearchComponent } from '../recruiter-saved-search/recruiter-saved-search.component';
import { RecruiterSearchresultLoggedinComponent } from '../recruiter-searchresult-loggedin/recruiter-searchresult-loggedin.component';
import { RecruiterViewApplicationsComponent } from '../recruiter-view-applications/recruiter-view-applications.component';
import { RecruiterViewProfileComponent } from '../recruiter-view-profile/recruiter-view-profile.component';
import { RecruiterWatchListComponent } from '../recruiter-watch-list/recruiter-watch-list.component';
import { RecruiterWatchdogComponent } from '../recruiter-watchdog/recruiter-watchdog.component';
import { ViewContractorProfileComponent } from '../view-contractor-profile/view-contractor-profile.component';
import { ResolverService } from '../resolver.service';
import { RecuriterSavedWatchDogComponent } from '../recuriter-saved-watch-dog/recuriter-saved-watch-dog.component';
import { RecruiterHomeComponent } from '../recruiter-home/recruiter-home.component';
import { RecruiterGuidesPageComponent } from '../recruiter-guides-page/recruiter-guides-page.component';

const recruiterRoutes: Routes = [{
    "path": "manage-password",
    "component": RecruiterManagePasswordComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "manage-account",
    "component": RecruiterManageAccountComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "profile",
    "component": RecruiterManageProfileComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "manage-user",
    "component": RecruiterManageUserComponent,
    "resolve": {resolverData: ResolverService}
}, /*{
    "path": "register",
    "component": RecruiterSignUpComponent
}*/ {
    "path": "advanced-search",
    "component": RecruiterAdvancedSearchComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "help",
    "component": RecruiterHelpComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "job-posting",
    "component": RecruiterJobPostingComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "manage-jobs",
    "component": RecruiterManageJobsComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "preview-job",
    "component": RecruiterPreviewJobComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "saved-search",
    "component": RecruiterSavedSearchComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "searchresult-loggedin",
    "component": RecruiterSearchresultLoggedinComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "view-applications",
    "component": RecruiterViewApplicationsComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "view-profile",
    "component": RecruiterViewProfileComponent,
    "resolve": {resolverData: ResolverService}
},{
    "path": "view-contractor-profile",
    "component": ViewContractorProfileComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "watch-list",
    "component": RecruiterWatchListComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "watchdog",
    "component": RecruiterWatchdogComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path" : "saved-watch-dog",
    "component": RecuriterSavedWatchDogComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path" : "recruiter-home",
    "component": RecruiterHomeComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "guides",
    "component": RecruiterGuidesPageComponent,
    "resolve": {resolverData: ResolverService}
}
]

@NgModule({
    imports:[RouterModule.forChild(recruiterRoutes)],
    exports: [RouterModule]
})
export class RecruiterRoutingModule {


}