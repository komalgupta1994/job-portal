import { Component, OnInit } from '@angular/core';
import { CommonDataSharedService } from '../commonDataSharedService';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  showtabValue = "privacy";
  constructor(private _commonDataShareService: CommonDataSharedService) { }

  ngOnInit() {

     var localStorageData = JSON.parse(localStorage.getItem('termsValue'));
    console.log("localStorageData from privacy--", localStorageData);
    if(localStorageData && localStorageData.value) {
      this.showtabValue = localStorageData.value;
      //this.jobPostingData(localStorageData.jobId);
    }
  	this._commonDataShareService.termsAndUsePage.subscribe((data) =>{
      
      console.log("data--", data);
          if(data) {
            this.setValue(data);
          }
        });

  }

  onTabClick(value) {
  	this.showtabValue = value;
  }

  setValue(value) {
    console.log("value--", value);
    this.showtabValue = value;
    console.log("this.showtabValue", this.showtabValue);
  }

}
