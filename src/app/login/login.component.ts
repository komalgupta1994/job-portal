import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  password = ""; email = ""; inputLogin;
  valid; dataUrl; response;
  contractorviewProfileData; wsUrl; input;
  inputData; min; max; addNumber; number; number2; errorMessage; inputUrl; status; succesLoginFlag = false; errorMsgFlag = false;
  errorMsg;
  totalInvalid = false;
  constructor(private router: Router, public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.generate();
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }

  onLogin(f: NgForm) {
    this.totalInvalid = false;
    if (f.valid && parseInt(this.addNumber) === (this.number + this.number2)) {
      this.inputLogin = {
        "email": this.email,
        "password": this.password

      }
      var email = this.email;
      console.log(this.inputLogin, "login-conta")
      this.inputUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/signin";
      this._commonRequestService.postData(this.inputUrl, this.inputLogin).subscribe(
        data => {
          console.log(data);
          if (data.status === "TRUE") {

            this.succesLoginFlag = true;
            this.errorMsgFlag = false;
            localStorage.setItem("loginDetail", JSON.stringify({ "token": data.data.loginToken, "email": email, "role": data.data.type }))
            this.router.navigate(['../contractor/viewProfile']);
          }
          else {
            this.errorMsgFlag = true;
            this.succesLoginFlag = false;
            this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
            //setTimeout(()=>{this.errorMsgFlag = false},1000)
          }
        }
      )

    } else {
      this.errorMsgFlag = false;
      if (parseInt(this.addNumber) !== (this.number + this.number2)) {
        this.totalInvalid = true;
      }
      window.scroll(0, 0);
    }
  }

  getRandamValue(max, min) {
    return Math.floor(Math.random() * 4) + 2;
  }
  getRandamValue1(max, min) {
    return Math.floor(Math.random() * 6) + 1
  }
  generate = function() {
    this.number = this.getRandamValue(1, 10);
    this.number2 = this.getRandamValue1(1, 10);
  }

  

}
