import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { CommonRequestService } from '../common-request.service';
import { CommonService } from '../commonService.service';

@Component({
  selector: 'app-recruiter-manage-account',
  templateUrl: './recruiter-manage-account.component.html',
  styleUrls: ['./recruiter-manage-account.component.css']
})
export class RecruiterManageAccountComponent implements OnInit, AfterViewInit {
  name: string;
  jobTitle: string;
  telePhone;
  nameFlag = false;
  jobTitleFlag = false;
  telephoneFlag = false;
  allErrorFlag = false;
  manageAccountFlag = false;
  telephoneValidFlag = false;
  accountCreatedValue;
  errorMessage = "";
  successMessage = "";
  manageErrorFlag = false;
  accountSuperUserName;
  WSErrorMsg = "";
  constructor(public _commonRequestService: CommonRequestService, private commonService: CommonService) { }

  ngOnInit() {
    this.recruiterAccountDetails();
  }
  ngAfterViewInit() {
    window.scroll(0,0);
  }

  recruiterAccountDetails() {
     var input = {
     "email":"test@test7.com",
  "loginToken":":$2y$10$AUQhfigHBiNAzCG9aSYZe.WEbqDIBNVxl6aBoSHJs8.oEuPFWMkHm"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/account";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("recruiter account--", data);
         if(data && data.data) {
           this.name = data.data.personalDetails && data.data.personalDetails.name ? data.data.personalDetails.name : "";
           this.jobTitle = data.data.personalDetails && data.data.personalDetails.jobTitle ? data.data.personalDetails.jobTitle : "";
           this.telePhone = data.data.contactDetails && data.data.contactDetails.telephone ? data.data.contactDetails.telephone : "";
           this.accountCreatedValue = data.data.personalDetails && data.data.personalDetails.accountCreated ? data.data.personalDetails.accountCreated : "";
           this.accountSuperUserName = data.data.personalDetails && data.data.personalDetails.name ? data.data.personalDetails.name : "";
         } else if(data && data.status == 'FALSE') {
           this.commonService.goToRecruiterLogin(data);
         }
        }
    );
  }

  saveRecruiterAccountForm(form: NgForm) {
    window.scroll(0,0);
    this.WSErrorMsg = "";
    if(this.name) {
      this.nameFlag = false;
    } else {
      this.nameFlag = true;
    }

    if(this.jobTitle) {
      this.jobTitleFlag = false;
    } else {
      this.jobTitleFlag = true;
    }

    if(this.telePhone) {
      this.telephoneFlag = false;
    } else {
      this.telephoneFlag = true;
    }

    if(this.telePhone) {
      if(this.telePhone.match(/^\d{10}$/) || this.telePhone.match(/^[0]\d{10}$/)) {
        this.telephoneValidFlag = false;
      } else {
        this.telephoneValidFlag = true;
      }
    }

    if(this.nameFlag || this.jobTitleFlag || this.telephoneFlag || this.telephoneValidFlag) {
      this.allErrorFlag = true;
    } else {
      this.allErrorFlag = false;
    }

    if(!this.allErrorFlag) {
    	var recruiterAccountJson = {
      'email':"test@test7.com",
      'loginToken':"$2y$10$DTSQAfFihO1F3OSQv.najuvalS6q57RU.NzsyPBVHi9tgpQmcl14y",
      'recuriter_contact_name':this.name,
      'recuriter_contact_job_title':this.jobTitle,
      'recuriter_phone_number':this.telePhone

  	}
  	console.log("recruiterAccountJson--", recruiterAccountJson);
    var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/account/update";
         this._commonRequestService.postData(wsUrl,recruiterAccountJson).subscribe(
          data => {
           console.log("recruiter acoount update--", data);
           window.scroll(0,0);
           if(data && data.status === "TRUE") {
             this.manageAccountFlag = true;
             this.manageErrorFlag = false;
             this.successMessage = "Account Update Successfully.";
             //this.router.navigate(['../recruiterLogin']);
             this.name = "";
             this.jobTitle = "";
             this.telePhone = "";
             this.WSErrorMsg = "";
             this.recruiterAccountDetails();
           } else if(data && data.status == 'FALSE'){
             this.manageErrorFlag = true;
             this.manageAccountFlag = false;
             this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
             this.commonService.goToRecruiterLogin(data);
           }
          }
      );
    }
  }

}
