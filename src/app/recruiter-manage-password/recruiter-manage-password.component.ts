import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { CommonRequestService } from '../common-request.service';
import { Router } from '@angular/router';
import { CommonService } from '../commonService.service';

@Component({
  selector: 'app-recruiter-manage-password',
  templateUrl: './recruiter-manage-password.component.html',
  styleUrls: ['./recruiter-manage-password.component.css']
})
export class RecruiterManagePasswordComponent implements OnInit {
  oldPassword;
  newPassword;
  confirmPassword;
  oldPasswordFlag = false;
  newPasswordFlag = false;
  confirmPasswordFlag = false;
  allErrorMessageFlag = false;
  errorMessageValue = "";
  WSErrorMsg = "";
  constructor(public _commonRequestService: CommonRequestService, private router: Router, private commonService: CommonService) { }

  ngOnInit() {
  }

  savePassword(form: NgForm) {
    this.WSErrorMsg = "";
    if(this.oldPassword) {
      this.oldPasswordFlag = false;
    } else {
      this.oldPasswordFlag = true;
    }

    if(this.newPassword) {
      this.newPasswordFlag = false;
    } else {
      this.newPasswordFlag = true;
    }

    if(this.confirmPassword) {
      this.confirmPasswordFlag = false;
    } else {
      this.confirmPasswordFlag = true;
    }

    if(this.oldPasswordFlag || this.newPasswordFlag || this.confirmPasswordFlag) {
      this.allErrorMessageFlag = true;
    } else {
      this.allErrorMessageFlag = false;
    }

    if(!this.allErrorMessageFlag) {

    	var recruiterPasswordJson = {
        "email":"test@test7.com",
        "loginToken":"$2y$10$DTSQAfFihO1F3OSQv.najuvalS6q57RU.NzsyPBVHi9tgpQmcl14y",
    		'oldPassword': this.oldPassword,
    		'newPassword': this.newPassword,
    		'confirmPassword': this.confirmPassword
    	}
      var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/password";
         this._commonRequestService.postData(wsUrl,recruiterPasswordJson).subscribe(
          data => {
           console.log("recruiter password--", data);
           if(data && data.status === "TRUE") {
             this.errorMessageValue = "password update successfully."
             this.router.navigate(['../recruiterLogin']);
             this.oldPassword = "";
             this.newPassword = "";
             this.confirmPassword = "";
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
