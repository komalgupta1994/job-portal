import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonService } from '../commonService.service';
import { FormsModule,NgForm, FormControl } from '@angular/forms';
// import { } from 'googlemaps';
// import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-recruiter-advanced-search',
  templateUrl: './recruiter-advanced-search.component.html',
  styleUrls: ['./recruiter-advanced-search.component.css']
})
export class RecruiterAdvancedSearchComponent implements OnInit {

   public searchControl: FormControl;
  @ViewChild("advancedSearch")
  public searchElementRef: ElementRef;

  @ViewChild("searchResultElement")
  public searchMiles: ElementRef;
  // @ViewChild("advancedSearch1")
  // public searchElementRef1: ElementRef;

jobTitle: string;
keyWordSearch;
stemmedTermsCheck = false;
coreSkills:string;
certifications: string;
dontShowContractor: any;
cityTown;
preferredMinRate: number;
preferredMaxRate: number;
dailyHourlyRate = 'daily';
timeLeft = 0;
includeContractor = false;
showContractor = 0;
contractorName: string;
contractorEducation;
drivingLicence;
mappingFlag = true;
radialFlag = false;
securityClearanceArray;
industryArrayData;
currentLocation;
timeLeftData;
sortByData;
industrySectorValue;
securityClearValue;
currentUrl;
milesValue;
postcode = '';
displayTown = '';
displayCountry = '';
displayLocationName = '';
showRadialDescription = false;
showMappingDescription = true;
//displayLocationName = '';
  constructor(public _commonRequestService: CommonRequestService, private activateRoute: ActivatedRoute,
    private _route: Router, private commonService: CommonService, 
    private ngZone: NgZone) {
    console.log("activateRoute", _route.url);
    this.currentUrl = _route.url;
   }

  ngOnInit() {
    this.getSecurityClearance();
    this.getIndustry();
    this.getTimeLeftData();
    this.getSortByData();
    //this.loadLocationAutoData();
  }

  ngAfterViewInit() {
    this.loadLocationAutoData();
  }

  closeDescription() {
    this.showMappingDescription = false;
    this.showRadialDescription = false;
  }

  getTimeLeftData() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/time_slot";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
          console.log("timeLeftData--", data);
          if(data && data.status == 'TRUE') {
            this.timeLeftData = data.data;
          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
          //this.recruiterNameArray = data.data;
        }
    );
  }

  loadLocationAutoData() {
    //this.mapsAPILoader.load().then(() => {
      console.log("this.searchElementRef.nativeElement", this.searchElementRef.nativeElement);
      //if(this.mappingFlag) {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["geocode"],
          componentRestrictions : {'country' : 'GB'}
        });
        console.log("autocomplete", autocomplete);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            //alert(0)
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            console.log("place--", place);
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            if(place && place.address_components && place.address_components.length > 0 && place.formatted_address) {
            for(var i=0;i<place.address_components.length; i++) {
              for(var j=0; j<place.address_components[i].types.length; j++) {
                if(place.address_components[i].types[j] == "postal_code") {
                  this.postcode = place.address_components[i].long_name;
                }
                if(place.address_components[i].types[j] == "postal_town") {
                  this.displayTown = place.address_components[i].long_name;
                }
                if(place.address_components[i].types[j] == "country") {
                  this.displayCountry = place.address_components[i].long_name;
                }
                this.displayLocationName = this.displayTown + " " + this.postcode + "," + this.displayCountry;
              }
            }
          }
          });
        });
      //}
    //});
    // this.mapsAPILoader.load().then(() => {
    //   if(this.radialFlag) {
    //     let autocomplete1 = new google.maps.places.Autocomplete(this.searchElementRef1.nativeElement, {
    //       types: ["geocode"],
    //       componentRestrictions : {'country' : 'GB'}
    //     });
    //     autocomplete1.addListener("place_changed", () => {
    //       this.ngZone.run(() => {
    //         //get the place result
    //         let place: google.maps.places.PlaceResult = autocomplete1.getPlace();
    //         console.log("place--", place);
    //         //verify result
    //         if (place.geometry === undefined || place.geometry === null) {
    //           return;
    //         }
    //       });
    //     });
    //   }
    // });
  }

  getRangeSliderValue(e) {
    console.log("e--", e);
    this.milesValue = e.from;
  }

  // getSortByData() {
  //    var input = {
  //    "email":"test@test7.com",
  //   "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

  //  };
  //  console.log("input--", input);
  //  var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by";
  //      this._commonRequestService.getData(wsUrl).subscribe(
  //       data => {
  //         console.log("sort by--", data);
  //         this.sortByData = data.data;
  //         //this.recruiterNameArray = data.data;
  //       }
  //   );
  // }

  getSortByData() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by_recruiter_search";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
          console.log("sort by--", data);
          if(data && data.status == 'TRUE') {
            this.sortByData = data.data;
          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
          //this.recruiterNameArray = data.data;
        }
    );
  }

  getSecurityClearance() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/security_clearance";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("securityClearanceArray--", data);
          if(data && data.status == 'TRUE') {
            this.securityClearanceArray = data.data;
          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
          //this.recruiterNameArray = data.data;
        }
    );
  }

  lastSearchClick() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/last_search";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("last search data--", data);
          if(data && data.data && data.status == 'TRUE') {
            //this.commonService.setLastSearchData(data.data);
            this.jobTitle = data.data.recuriter_search_job_title ? data.data.recuriter_search_job_title : '';
            this.keyWordSearch = data.data.recuriter_search_keywords ? data.data.recuriter_search_keywords : '';
            this.stemmedTermsCheck = data.data.recuriter_search_stemmed_terms == 1 ? true : false;
            this.coreSkills = data.data.recuriter_search_core_skills ? data.data.recuriter_search_core_skills : '';
            this.certifications = data.data.recuriter_search_certifications ? data.data.recuriter_search_certifications : '';
            this.dontShowContractor = data.data.recuriter_search_dont_show_to_contractor ? data.data.recuriter_search_dont_show_to_contractor : '';
            //this.cityTown = data.data.recuriter_search_location ? data.data.recuriter_search_location : '';
            this.searchElementRef.nativeElement.value = data.data.recuriter_search_location ? data.data.recuriter_search_location : '';
            //this.searchElementRef1.nativeElement.value = data.data.recuriter_search_location ? data.data.recuriter_search_location : '';
            this.preferredMinRate = data.data.recuriter_search_by_rate_min ? data.data.recuriter_search_by_rate_min : '';
            this.preferredMaxRate = data.data.recuriter_search_by_rate_max ? data.data.recuriter_search_by_rate_max : '';
            this.dailyHourlyRate = data.data.recuriter_search_by_rate_type ? data.data.recuriter_search_by_rate_type : '';
            this.timeLeft = data.data.recuriter_search_by_time_left ? data.data.recuriter_search_by_time_left : '';
            this.includeContractor = data.data.recuriter_search_by_unavailable == 1 ? true : false;
            this.showContractor = data.data.recuriter_search_by_updated_contractor_since ? data.data.recuriter_search_by_updated_contractor_since : '';
            this.contractorName = data.data.recuriter_search_by_contract_name ? data.data.recuriter_search_by_contract_name : '';
            this.contractorEducation = data.data.recuriter_search_by_education ? data.data.recuriter_search_by_education : '';
            this.drivingLicence = data.data.recuriter_search_by_driving_license === 1 ? 'yes' : 'no';
            //this.currentLocation = data.data.recuriter_search_job_title
            this.industrySectorValue = data.data.recuriter_search_by_industry ? data.data.recuriter_search_by_industry : '';
            this.securityClearValue = data.data.recuriter_search_by_security_clearance ? data.data.recuriter_search_by_security_clearance : '';
          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
          // if(this._route.url == "/public/advanced-search") {
          //   this._route.navigate(['/public/saved-search']);
          // } else if(this._route.url == "/recruiter/advanced-search") {
          //   this._route.navigate(['/recruiter/saved-search']);
          // } 
          //this.securityClearanceArray = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  getIndustry() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("industryArrayData--", data);
          if(data && data.status == 'TRUE') {
            this.industryArrayData = data.data;
          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
          //this.recruiterNameArray = data.data;
        }
    );
  }

  mappingClick() {
  	this.mappingFlag = true;
  	this.radialFlag = false;
    this.showMappingDescription = true;
    this.showRadialDescription = false;
    this.milesValue = 0;
    // if(this.searchMiles && this.searchMiles.nativeElement) {
    //   this.searchMiles.nativeElement.value = 0;
    // }
    this.loadLocationAutoData();
  }

  radialClick() {
  	this.radialFlag = true;
  	this.mappingFlag = false;
    // if(this.searchMiles && this.searchMiles.nativeElement) {
    //   this.searchMiles.nativeElement.value = 5;
    // }
    this.showMappingDescription = false;
    this.showRadialDescription = true;
    this.milesValue = 5;
    this.loadLocationAutoData();
  }

  resetSearch() {
  	this.jobTitle = "";
	this.keyWordSearch = "";
	this.stemmedTermsCheck = false;
	this.coreSkills = "";
	this.certifications = "";
	this.dontShowContractor = ""
	this.cityTown = "";
	this.preferredMinRate = 0;
	this.preferredMaxRate = 0;
	this.dailyHourlyRate = '';
	this.timeLeft = 0;
	this.includeContractor = false;
	this.showContractor = 0;
	this.contractorName = "";
	this.contractorEducation = "";
	this.drivingLicence = '';
  this.currentLocation = '';
  this.industrySectorValue = [];
  this.securityClearValue = [];
  }

  saveAdvanceSearch() {
    var savedSearchSaveJson = {
      // "email":"test@test8.com",
      // "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
      // "recuriter_saved_search_name":this.savedSearchName,
      // "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 2,
      "recuriter_search_job_title":this.jobTitle?this.jobTitle:'',
      "recuriter_search_keywords":this.keyWordSearch ?this.keyWordSearch :'',
      "recuriter_search_stemmed_terms":this.stemmedTermsCheck === true ? 1 : 0,
      "recuriter_search_core_skills":this.coreSkills ? this.coreSkills :'',
      "recuriter_search_certifications":this.certifications ? this.certifications : '',
      "recuriter_search_dont_show_to_contractor":this.dontShowContractor ? this.dontShowContractor : '',
      "recuriter_search_location":this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value : '',
      "recuriter_search_include_relocators":0,
      "recuriter_search_by_rate_min":this.preferredMinRate ? this.preferredMinRate : '',
      "recuriter_search_by_rate_max":this.preferredMaxRate ? this.preferredMaxRate : '',
      "recuriter_search_by_rate_type":this.dailyHourlyRate ? this.dailyHourlyRate : '',
      "recuriter_search_by_time_left":this.timeLeft ? this.timeLeft : '',
      "recuriter_search_by_unavailable":this.includeContractor ? 1 : 0,
      "recuriter_search_by_updated_contractor_since":this.showContractor ? this.showContractor : '',
      "recuriter_search_by_contract_name":this.contractorName?this.contractorName:'',
      "recuriter_search_by_education":this.contractorEducation ? this.contractorEducation : "",
      "recuriter_search_by_industry":this.industrySectorValue ? this.industrySectorValue.toString()   : "",
      "recuriter_search_by_security_clearance":this.securityClearValue ? this.securityClearValue.toString() :  "",
      "recuriter_search_by_driving_license":this.drivingLicence == 'yes' ? 1 : 0,
      "postcode": this.postcode ? this.postcode : '',
      "display_town" : this.displayTown ? this.displayTown : '',
      "display_county": this.displayCountry ? this.displayCountry : '',
      "display_name" : this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value :''
      // "page":1,
      // "limit":10,
      // "sort":8
    }

    //this._commonDataShareService.advancedSerahcResult.next(savedSearchSaveJson);
    //this.commonService.setSearchResult(savedSearchSaveJson);
    //this._route.navigate(['/recruiter/searchresult-loggedin']);
    if(this._route.url.indexOf("/public/advanced-search") >= 0) {
      this._route.navigate(['../public/home'], { skipLocationChange: true }).then(() =>
        this._route.navigate(['/public/searchresult-loggedin'], { 'relativeTo': this.activateRoute, queryParams :  savedSearchSaveJson} )
      );
      //this._route.navigate(['/public/searchresult-loggedin']);
    } else if(this._route.url.indexOf("/recruiter/advanced-search") >= 0) {
      //this._route.navigate(['/recruiter/searchresult-loggedin']);
      this._route.navigate(['/recruiter/recruiter-home'], { skipLocationChange: true }).then(() =>
        this._route.navigate(['/recruiter/searchresult-loggedin'], { 'relativeTo': this.activateRoute, queryParams :  savedSearchSaveJson} )
      );
    } 


  }

}
