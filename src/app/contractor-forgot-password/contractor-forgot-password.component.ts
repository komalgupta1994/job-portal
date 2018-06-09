import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
@Component({
	selector: 'app-contractor-forgot-password',
	templateUrl: './contractor-forgot-password.component.html',
	styleUrls: ['./contractor-forgot-password.component.css']
})
export class ContractorForgotPasswordComponent implements OnInit {
	successMsgFlag = false;
	errorMsg = "";
	formSubmittedFlag = false;
	email;
	constructor(private _commonRequestService: CommonRequestService) { }

	ngOnInit() {
	}

	ngAfterViewInit(){
   window.scroll(0,0);
  }


	forgotPasswordClicked(form) {
		this.errorMsg = "";
		this.successMsgFlag = false;	
		if (form.valid) {
			let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/forget_password/request";
			let input = {
				"email": form.value.email
			}

			this._commonRequestService.postData(url, input).subscribe(
				data => {
					if(data.status =='TRUE'){
						this.successMsgFlag = true;
						form.form.patchValue({'email' :''});
						form.form.submitted = false;
					} else{
						this.errorMsg = data.error;
					}

				}
			);
		}else{
			this.formSubmittedFlag = true;
		}

	}

}
