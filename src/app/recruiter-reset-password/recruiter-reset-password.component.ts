import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-reset-password',
  templateUrl: './recruiter-reset-password.component.html',
  styleUrls: ['./recruiter-reset-password.component.css']
})
export class RecruiterResetPasswordComponent implements OnInit {
uniqueId;
	succesMessageFlag;
	ErrorMesageFlag;
	successMsg;
	errorMsg;
	password;
	confirmPassword;
	constructor(private _router: Router, private _routes: ActivatedRoute, private _commonRequestService: CommonRequestService) { }

	ngOnInit() {
		this._routes.params.subscribe((params: Params) => {
			this.uniqueId = params['id'];

		})
	}

	ngAfterViewInit() {
		window.scroll(0, 0);
	}


	onReset(form) {
		if (form.valid && form.value.password === form.value.confirmPassword) {
			let accountJson = {
				"token": this.uniqueId,
				"newPassword": form.value.password,
				"confirmPassword": form.value.confirmPassword 
			}
			let inputUrl = " http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/forget_password/submit";
			this._commonRequestService.postData(inputUrl, accountJson).subscribe(
				data => {
					let responseData = data;
					if (responseData.status === "TRUE") {
						this.succesMessageFlag = true;
						this.ErrorMesageFlag = false;
						this.successMsg = "Password change";
						this._router.navigate(['/public/recruiterLogin'])
						form.reset();
						form.form.submitted = false;
					}
					else {
						this.succesMessageFlag = false;
						this.ErrorMesageFlag = true;
						this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
						window.scroll(0, 0);
					}
				}
			);

		} else {
			this.ErrorMesageFlag = false;
		}
	}

}
