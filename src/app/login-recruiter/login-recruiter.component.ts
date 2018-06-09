import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-login-recruiter',
  templateUrl: './login-recruiter.component.html',
  styleUrls: ['./login-recruiter.component.css']
})
export class LoginRecruiterComponent implements OnInit {
password="";email=""; inputLogin;
valid;input;response;
recruiterviewProfileData;
wsUrl;
inputData;min;max;getData;addNumber;number;number2;errorMessage;inputUrl;status;succesLoginFlag=false;errorMsgFlag=false;
  emailNameFlag = false;
emailNamePatternFlag = false;
passwordReqFlag = false;
humanKnowFlag = false;
saveFlag = false;
invalidErrorMsg = "";
  constructor(private router: Router, public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    window.scroll(0,0);
  this.generate();
  }

    onLogin(f:NgForm){
      this.invalidErrorMsg = "";
      var emailRefex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(this.email) {
        this.emailNameFlag = false;
      } else {
        this.emailNameFlag = true;
      }

      if(this.email) {
        if(emailRefex.test(this.email)) {
          this.emailNamePatternFlag = false;
        } 
        else {
          this.emailNamePatternFlag = true;
        }
      }

      if(this.password) {
        this.passwordReqFlag = false;
      } else {
        this.passwordReqFlag = true;
      }

      if(this.addNumber) {
        this.humanKnowFlag = false;
      } else {
        this.humanKnowFlag = true;
      }

      if(this.emailNameFlag || this.emailNamePatternFlag || this.passwordReqFlag || this.passwordReqFlag) {
        this.saveFlag = true;
      } else {
        this.saveFlag = false;
      }

      if(!this.saveFlag) {
       if(parseInt(this.addNumber) === (this.number + this.number2)){
           this.errorMessage="";
        this.inputLogin={
          "email":this.email,
          "password":this.password
        }
            console.log( this.inputLogin,"login-recru")
        this.inputUrl= "http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/signin";
       this._commonRequestService.postData(this.inputUrl, this.inputLogin).subscribe(
        data => {
          console.log("data--", data);
          this.getData = data;
           if( this.getData.status === "TRUE" && this.getData.data.type === "recuriter"){
             this.invalidErrorMsg ="";
             this.errorMsgFlag =false;
             localStorage.setItem("loginDetail", JSON.stringify({"token": data.data.loginToken, "email": data.data.email, "role": data.data.type, 'isCompanyEditable':data.data.is_company_editable}))
              this.succesLoginFlag =true;
              this.router.navigate(['/recruiter/recruiter-home']);
              //this.getViewProfileDta();
             
          }
          else{
             this.errorMsgFlag =true;
              this.succesLoginFlag =false;
              this.invalidErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
               //this.generate();
               this.addNumber="";
          }
          this.inputLogin={};
          console.log("login_status: ", this.status);
        }
    )
      }else{
         //this.errorMessage ="please enter valid number!"
       }
     }
}

getRandamValue(max,min){
    return  Math.floor(Math.random() * 4) + 2; 
}
getRandamValue1(max,min){
    return  Math.floor(Math.random() * 6) + 1  
}
    generate = function() {
        this.number = this.getRandamValue(1, 10);
        this.number2 = this.getRandamValue1(1, 10);
    }


  // getViewProfileDta() {
  //         this.input={
  //       "email":this.email,
  //       // "password":this.password,
  //       "loginToken": this.getData.data.loginToken
  //     }
  //  this.wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/profile/view";
  //      this._commonRequestService.postData(this.wsUrl,this.input).subscribe(
  //       data => {
  //         this.response = data;
  //          this.recruiterviewProfileData = data.data;
  //           if( this.response.status === "TRUE"){
  //            //if( this.response.status === "FALSE"){
  //             this.router.navigate(['recruiter/profile']);
  //              this._commonRequestService.setDataWithoutObserval( this.recruiterviewProfileData,'recruiter-profile-view-data');
  //            console.log("view_profile: ", this.recruiterviewProfileData);
  //          }
         
  //       }
  //   );


  // }
}
