import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, ActivatedRoute, CanActivate } from '@angular/router';
import { Http } from '@angular/http';
import { CommonRequestService } from './common-request.service';

@Injectable()
export class ResolverService implements Resolve<any> {

  constructor(private router: Router, 
              private routes: ActivatedRoute,
              private _commonRequestService : CommonRequestService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let localStorageData = localStorage.getItem("loginDetail") ?  JSON.parse(localStorage.getItem("loginDetail")) : ""; 
    
    var currentRoute = route['_routerState'].url.split('/');
    console.log("currentRoute",currentRoute);
    console.log("localStorageData", localStorageData);

    /*condition of contractor page*/

    if(currentRoute && currentRoute[1] && currentRoute[1]== 'contractor'){
      if(localStorageData && localStorageData.role==='contractor'){
        this.getRecruiterCount('contractre');
        return true;
      }else{
        this.router.navigate(['/public/home'], {relativeTo: this.routes});
      }
    }

    if(currentRoute && currentRoute[1] && currentRoute[1]== "recruiter"){
      if(localStorageData && localStorageData.role==="recuriter"){
        console.log("if")
        this.getRecruiterCount('recuriter');
        return true;
      }else{
        console.log("else")
        this.router.navigate(['/public/home'], {relativeTo: this.routes});
      }
    }

}

getRecruiterCount(type) {
   var input = {
     "email":"dummy@test.com",
  "loginToken":"$2y$10$dAixE9mJsFhouUU1NzgtvePYp7WjCcZ5NhzJPOLAO6Cz.wH0It0za",
  "login_type":type

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/add_last_view";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("add last view--", data);
         // if(data && data.status === "TRUE") {
         //   this.listingData = data.data;
         //  } else {
         //    if(data && data.error && data.error.length > 0) {
         //    // this.errorMsgFlag = true;
         //    //   this.errorMsg = data.error[0];
         //    }
         //  }
        }
    );
  }
}




