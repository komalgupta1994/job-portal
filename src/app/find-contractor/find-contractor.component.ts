import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-find-contractor',
  templateUrl: './find-contractor.component.html',
  styleUrls: ['./find-contractor.component.css']
})
export class FindContractorComponent implements OnInit {
	contractorCount;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    setInterval(()=>{
      this.getLiveContactor();  
    },60000)
    
  }

  getLiveContactor(){
    let  url ="http://dev.contractrecruit.co.uk/contractor_admin/api/logedin_recruiter";
      this._commonRequestService.getData(url).subscribe(
        data => {
          this.contractorCount = data.data[0][0].count;
          
        }
    );
  }


}
