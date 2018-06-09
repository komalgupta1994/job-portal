import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
 nameValue = "";
 emailValue = "";
 subjectValue = "";
 messageValue = "";
 yourAnswer = "";
 number;
 number2;
 invalidErrorMsg = "";
 nameRequiredFlag = false;
 emailRequiredFlag = false;
 messageRequiredFlag = false;
 humanBeingFlag = false;
 emailPatternFlag = false;
 saveFlag = false;
 succesLoginFlag = false;
 config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30
  }
  constructor(private router: Router, public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  	window.scroll(0,0);
  	this.generate();
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

  sendMail(){
  	window.scroll(0,0);
      this.invalidErrorMsg = "";
      var emailRefex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(this.emailValue) {
        this.emailRequiredFlag = false;
      } else {
        this.emailRequiredFlag = true;
      }

      if(this.emailValue) {
        if(emailRefex.test(this.emailValue)) {
          this.emailPatternFlag = false;
        } 
        else {
          this.emailPatternFlag = true;
        }
      }

      if(this.nameValue) {
        this.nameRequiredFlag = false;
      } else {
        this.nameRequiredFlag = true;
      }

      if(this.yourAnswer) {
        this.humanBeingFlag = false;
      } else {
        this.humanBeingFlag = true;
      }

      if(this.messageValue) {
        this.messageRequiredFlag = false;
      } else {
        this.messageRequiredFlag = true;
      }

      if(this.nameRequiredFlag || this.emailRequiredFlag || this.emailPatternFlag || this.messageRequiredFlag || this.humanBeingFlag) {
        this.saveFlag = true;
      } else {
        this.saveFlag = false;
      }

      if(!this.saveFlag) {
       if(parseInt(this.yourAnswer) === (this.number + this.number2)){
          var input = {
          	"name": this.nameValue,
			"email":this.emailValue,
			"subject":this.subjectValue ? this.subjectValue : '',
			"message": this.messageValue
          }
            console.log("input--", input);
        var inputUrl= "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contact";
       this._commonRequestService.postData(inputUrl, input).subscribe(
        data => {
          console.log("data--", data);
          //this.getData = data;
           if(data && data.status === "TRUE"){
             this.invalidErrorMsg ="";
             this.succesLoginFlag = true;
             this.nameValue = "";
             this.emailValue = "";
             this.messageValue = "";
             this.subjectValue = "";
             this.yourAnswer = "";
             // this.errorMsgFlag =false;
             // localStorage.setItem("loginDetail", JSON.stringify({"token": data.data.loginToken, "email": data.data.email, "role": data.data.type, 'isCompanyEditable':data.data.is_company_editable}))
             //  this.succesLoginFlag =true;
             //  this.router.navigate(['/recruiter/recruiter-home']);
              //this.getViewProfileDta();
             
          }
          else{
             //this.errorMsgFlag =true;
              this.succesLoginFlag =false;
              this.invalidErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
               //this.generate();
               this.yourAnswer="";
          }
        }
    )
      }
     }
}

}
