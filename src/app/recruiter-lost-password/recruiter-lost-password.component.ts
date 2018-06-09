import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router } from '@angular/router';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonService } from '../commonService.service';

@Component({
  selector: 'app-recruiter-lost-password',
  templateUrl: './recruiter-lost-password.component.html',
  styleUrls: ['./recruiter-lost-password.component.css']
})
export class RecruiterLostPasswordComponent implements OnInit {
	emailId;
	emailIdFlag = false;
	WSErrorMsg = "";
  constructor(private router: Router, public _commonRequestService: CommonRequestService, 
    private commonService: CommonService) { }

  ngOnInit() {
  }

  submitEmailId() {
  	this.WSErrorMsg = "";
  	var input = {
     "email":this.emailId

   };
   if(this.emailId) {
   	this.emailIdFlag = false;
   } else {
   	this.emailIdFlag = true;
   }
   console.log("input--", input);
   if(!this.emailIdFlag) {
	   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/forget_password/request";
	       this._commonRequestService.postData(wsUrl,input).subscribe(
	        data => {
	          //this.templateData = data.data;
	          if(data && data.status === "TRUE") {
	          	console.log("forget password--", data);
              this.emailId = "";
	          	this.WSErrorMsg = "";
	          } else if(data && data.status == 'FALSE'){
              this.commonService.goToRecruiterLogin(data);
	          	this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
	          }
	        }
	    );
	}
  }

}
