import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {ToolTipModule} from 'angular2-tooltip';
import {TooltipModule} from "ng2-tooltip";
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common'; 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderAdsComponent } from './header-ads/header-ads.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { CommonRequestService } from './common-request.service';
import { PublicComponent } from './public/public.component';
import { ContractorComponent } from './contractor/contractor.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { ContractorHeaderComponent } from './contractor-header/contractor-header.component';
import { RecruiterHeaderComponent } from './recruiter-header/recruiter-header.component';
// import {PublicModule} from './public/public.module';
// import {RecruiterModule} from './recruiter/recruiter.module';
// import {ContractorModule} from './contractor/contractor.module';
import { ContractorAccountComponent } from './contractor-account/contractor-account.component';
import { ContractorLoginFullJobComponent } from './contractor-login-full-job/contractor-login-full-job.component';
import { CommonDataSharedService } from './commonDataSharedService';
import { ResolverService } from './resolver.service';
import { CommonService } from './commonService.service';

// import { ContractorJobDetailComponent } from './contractor-job-detail/contractor-job-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderAdsComponent,
    HeaderLogoComponent,
    TopMenuComponent,
    FooterComponent,
    PublicComponent,
    ContractorComponent,
    RecruiterComponent,
    ContractorHeaderComponent,
    RecruiterHeaderComponent,
    ContractorAccountComponent,
    ContractorLoginFullJobComponent,
    //ContractorJobDetailComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    IonRangeSliderModule,
    FormsModule,
    ToolTipModule,
    TooltipModule,
    HttpModule
  ],
  providers: [CommonRequestService, CommonDataSharedService, ResolverService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
