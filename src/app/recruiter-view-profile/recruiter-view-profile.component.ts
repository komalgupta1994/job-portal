import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { CommonService } from '../commonService.service';

@Component({
  selector: 'app-recruiter-view-profile',
  templateUrl: './recruiter-view-profile.component.html',
  styleUrls: ['./recruiter-view-profile.component.css']
})
export class RecruiterViewProfileComponent implements OnInit {
	companyProfileView;
	companySizeArray;
	companySize;
	companySizeName = '';
	companyAdd;
	webAddress;
	email;
  constructor(public _commonRequestService: CommonRequestService, private commonService: CommonService) { }

  ngOnInit() {
  	this.profileViewData();
  }

  profileViewData() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/profile/view";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("profile view--", data);
          if(data && data.status == 'TRUE') {
            this.companyProfileView = data.data;
            this.companySizeList();
            this.companySize = this.companyProfileView && this.companyProfileView['companyDetails'] && this.companyProfileView['companyDetails'].companySize ? this.companyProfileView['companyDetails'].companySize : '';
            this.webAddress = this.companyProfileView && this.companyProfileView['companySocial'] && this.companyProfileView['companySocial'].webAddress ? this.companyProfileView['companySocial'].webAddress : '';
            this.email = this.companyProfileView && this.companyProfileView['companySocial'] && this.companyProfileView['companySocial'].emailAddress ? this.companyProfileView['companySocial'].emailAddress : '';
            this.companyAdd = this.companyProfileView && this.companyProfileView['companyDetails'] && this.companyProfileView['companyDetails'].companyAddress ? this.companyProfileView['companyDetails'].companyAddress : '';
          } else if(data && data.status == 'FALSE') {
           this.commonService.goToRecruiterLogin(data);
         }
          //this.countryValueArray = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  companySizeList() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/company_sizes";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("company size--", data);
          if(data && data.status == 'TRUE') {
            this.companySizeArray = data.data;
            if(this.companySizeArray && this.companySizeArray.length > 0) {
            	for(var i=0;i<this.companySizeArray.length;i++) {
            		if(this.companySizeArray[i].sel_value === parseInt(this.companySize)) {
            			this.companySizeName = this.companySizeArray[i].display;
            		}
            	}
            }
          } else if(data && data.status == 'FALSE') {
           this.commonService.goToRecruiterLogin(data);
         }
          //this.recruiterNameArray = data.data;
        }
    );
  }

}
