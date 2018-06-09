import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})
export class UploadCvComponent implements OnInit {
  recruiterCount;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    
    setInterval(()=>{
      this.getLiveContactor();  
    },60000)
    
  }

  getLiveContactor(){
    let  url ="http://dev.contractrecruit.co.uk/contractor_admin/api/logedin_contractor";
      this._commonRequestService.getData(url).subscribe(
        data => {
          this.recruiterCount = data.data[0][0].count;
          
        }
    );
  }



}
