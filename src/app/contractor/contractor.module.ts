import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolTipModule } from 'angular2-tooltip';
import { TooltipModule } from "ng2-tooltip";
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { IonRangeSliderModule } from "ng2-ion-range-slider";

import { ContractorRoutingModule } from './contractor-routing.module';

import { ContractorProfileComponent } from '../contractor-profile/contractor-profile.component';
import { ContractorViewProfileComponent } from '../contractor-view-profile/contractor-view-profile.component';

// import { ContractorSearchResultComponent } from '../contractor-search-result/contractor-search-result.component';
import { ContractorApplicationsComponent } from '../contractor-applications/contractor-applications.component';
import { ContractorJobSearchSavedComponent } from '../contractor-job-search-saved/contractor-job-search-saved.component';
//import { ContractorDirectoryComponent } from '../contractor-directory/contractor-directory.component';
import { SharedModule } from '../shared/shared.module';

//import { ContractorHubHomeComponent } from '../contractor-hub-home/contractor-hub-home.component';
// import { ContractorAdviceMenuListingComponent } from '../contractor-advice-menu-listing/contractor-advice-menu-listing.component';
// import { ContractorAdviceListingComponent } from '../contractor-advice-listing/contractor-advice-listing.component';
// import { ContractorAdviceComponent } from '../contractor-advice/contractor-advice.component';
// import { ContractorAdviceArticleComponent } from '../contractor-advice-article/contractor-advice-article.component';
// import { ContractorAdviceCategoryComponent } from '../contractor-advice-category/contractor-advice-category.component';
// import { ContractorNewsArticleComponent } from '../contractor-news-article/contractor-news-article.component';
import { ContractorHelpComponent } from '../contractor-help/contractor-help.component';
//import { AboutContractorComponent } from '../about-contractor/about-contractor.component';
//import { AgmCoreModule } from '@agm/core';
//import { LyResizingCroppingImagesModule } from 'angular2-resizing-cropping-image';

import { ImageCropperModule } from 'ng2-img-cropper';

@NgModule({
  declarations: [

    ContractorProfileComponent,
    ContractorViewProfileComponent,
    ContractorApplicationsComponent,
    ContractorJobSearchSavedComponent,
    //ContractorSearchResultComponent,
    // ContractorHubHomeComponent,
    // ContractorAdviceMenuListingComponent,
    // ContractorAdviceListingComponent,
    // ContractorAdviceComponent,
    // ContractorAdviceArticleComponent,
    // ContractorAdviceCategoryComponent,
    //AboutContractorComponent,
    ContractorHelpComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ToolTipModule,
    TooltipModule,
    HttpModule,
    ContractorRoutingModule,
    IonRangeSliderModule,
    SharedModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCcc7ZyRGjRbAuDgsLSQGdTuFxvLW9FGiI'
    // }),
    ImageCropperModule
  ],
  providers: []
})
export class ContractorModule { }
