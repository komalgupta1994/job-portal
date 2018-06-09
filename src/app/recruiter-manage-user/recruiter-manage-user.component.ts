import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { CommonService } from '../commonService.service';

@Component({
  selector: 'app-recruiter-manage-user',
  templateUrl: './recruiter-manage-user.component.html',
  styleUrls: ['./recruiter-manage-user.component.css']
})
export class RecruiterManageUserComponent implements OnInit {
	//addMulUserArray = [{'userName':'', 'jobTitle': '', 'password':'', 'confirmPassword':'', 'email':'', 'telephone':''}];
  newUserName: string;
  jobTitleValue;
  userPassword;
  confirmPassWord;
  emailAddress;
  telephoneV;
  manageUserMsg;
  showMessage = false;
  subUserArray;
  totalNumberOfUser;
  errorMessage = "";
  successMessage = "";
  successMessageFlag = false;
  errorMessageFlag = false;
  WSErrorMsg = "";
  companyEditableId;
  openPopupFlag = false;
  currentDeleteId;
  userAllowed = '';
  constructor(public _commonRequestService: CommonRequestService, private commonService: CommonService) {
  	//this.addMulUserArray.splice(0,1);
   }

  ngOnInit() {
    this.makeSubUser();
    let localStorageData = localStorage.getItem("loginDetail") ?  JSON.parse(localStorage.getItem("loginDetail")) : ""; 
    this.companyEditableId = localStorageData.isCompanyEditable;
  }

  addAnotherUser() {
    var saveJson = {
      "email":"test@test7.com",
      "loginToken":"$2y$10$qIXhfBp1FO4l8bfXilrWo.mgeDm2YiznM49TGdC00qeTP8.psEeFC",
      "recruiter_user_name":this.newUserName,
      "recuriter_business_email":this.emailAddress,
      "recuriter_contact_job_title":this.jobTitleValue,
      "recuriter_new_password":this.userPassword,
      "recuriter_new_c_password":this.confirmPassWord,
      "recuriter_phone_number":this.telephoneV
    }
    var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/add_user";
       this._commonRequestService.postData(wsUrl,saveJson).subscribe(
        data => {
         console.log("manage user--", data);
         window.scroll(0,0);
         if(data && data.status === "TRUE") {
           this.successMessage = " Manage User is Save Succesfully!";
           this.successMessageFlag = true;
           this.errorMessageFlag = false;
           //this.showMessage = true;
           this.newUserName = "";
           this.emailAddress = "";
           this.userPassword = "";
           this.jobTitleValue = "";
           this.confirmPassWord = "";
           this.telephoneV = "";
           this.WSErrorMsg = "";
           this.makeSubUser();
         } else if(data && data.status == 'FALSE'){
             this.commonService.goToRecruiterLogin(data);
           this.successMessageFlag = false;
           this.errorMessageFlag = true;
           this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
         }
        }
    );
  }

  makeSubUser() {
    var saveJson = {
      "email":"test@test7.com",
      "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"
    }

    var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/list/sub_user";
       this._commonRequestService.postData(wsUrl,saveJson).subscribe(
        data => {
         console.log("manage sub user--", data);
         if (data && data.status === "TRUE") {
           this.subUserArray = data.data;
           this.totalNumberOfUser = this.subUserArray.length + 1;
           this.WSErrorMsg = "";
           this.userAllowed = data.user_allowed;
           // this.successMessage = "Sub User Created Succesfully!";
           // this.successMessageFlag = true;
           // this.errorMessageFlag = false;
         } else if(data && data.status == 'FALSE'){
           this.commonService.goToRecruiterLogin(data);
           this.WSErrorMsg = "Error While Creating Sub User";
           this.successMessageFlag = false;
           this.errorMessageFlag = true;
         }
         window.scroll(0,0);
        }
    );
  }

  makeSuperUser(id) {
    var saveJson = {
      "email":"test@test7.com",
      "loginToken":"$2y$10$qIXhfBp1FO4l8bfXilrWo.mgeDm2YiznM49TGdC00qeTP8.psEeFC",
      "recuriter_id":id
    }
    var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/make/super/user";
       this._commonRequestService.postData(wsUrl,saveJson).subscribe(
        data => {
         console.log("manage super user--", data);
         if (data && data.status === "TRUE") {
           this.successMessage = "Super User Created Succesfully!";
           this.successMessageFlag = true;
           this.errorMessageFlag = false;
           this.makeSubUser();
           this.WSErrorMsg = "";
           //this.makeSubUser();
         } else if(data && data.status == 'FALSE'){
           this.WSErrorMsg = "Error While Creating Super User!";
           this.successMessageFlag = false;
           this.errorMessageFlag = true;
           this.commonService.goToRecruiterLogin(data);
         }
         window.scroll(0,0);
        }
    );
  }

  deleteUser() {
    this.openPopupFlag = false;
    var saveJson = {
      "email":"test@test7.com",
      "loginToken":"$2y$10$qIXhfBp1FO4l8bfXilrWo.mgeDm2YiznM49TGdC00qeTP8.psEeFC",
      "recuriter_id":this.currentDeleteId
    }
    var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/super/user/delete";
       this._commonRequestService.postData(wsUrl,saveJson).subscribe(
        data => {
         console.log("delete--", data);
          if (data && data.status === "TRUE") {
           this.successMessage = "User Deleted Succesfully!";
           this.successMessageFlag = true;
           this.errorMessageFlag = false;
           this.WSErrorMsg = "";
           this.makeSubUser();
         } else if(data && data.status == 'FALSE'){
           this.WSErrorMsg = "Error While Deleting Super User!";
           this.successMessageFlag = false;
           this.errorMessageFlag = true;
           this.commonService.goToRecruiterLogin(data);
         }
         window.scroll(0,0);
        }
    );
  }

  openDeletePopup(id) {
    this.currentDeleteId = id;
    this.openPopupFlag = true;
  }

  closeDeletePopup() {
    this.openPopupFlag = false;
  }

}
