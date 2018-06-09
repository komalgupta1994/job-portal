import { Component, OnInit } from '@angular/core';
import { CommonService } from '../commonService.service';

@Component({
  selector: 'app-recruiter-header',
  templateUrl: './recruiter-header.component.html',
  styleUrls: ['./recruiter-header.component.css']
})
export class RecruiterHeaderComponent implements OnInit {
	showMenu = false;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  postJobs() {
    this.commonService.setJobIdForJobPosting('');
  	var obj = {'jobId' : ''};
    localStorage.setItem('recruiterJobData', JSON.stringify(obj));

    var obj1 = {'jobPreviewData' : ''};
    localStorage.setItem('editJobPost', JSON.stringify(obj1));
  }

  logoutRecruiter(){
    localStorage.removeItem("loginDetail");
  }

}
