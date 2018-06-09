import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router } from '@angular/router';
import { CommonService } from '../commonService.service';
// import { } from 'googlemaps';
// import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-recuriter-saved-watch-dog',
  templateUrl: './recuriter-saved-watch-dog.component.html',
  styleUrls: ['./recuriter-saved-watch-dog.component.css']
})
export class RecuriterSavedWatchDogComponent implements OnInit, AfterViewInit {
  @ViewChild("savedWatchdog")
  public searchElementRef: ElementRef;

  savedSearchName: string;
  addToWatchDogCheck= false;
  jobTitle: string;
  keywordSearch;
  stemmedTerms = false;
  coreSkills;
  certificationValues;
  dontShowContractor;
  cityTownValue;
  includeRelocators = false;
  minRate;
  maxRate;
  dailyHourlyValue;
  timeLeftOnCutCont="";
  includeUnavailable = false;
  showContractors="";
  contractorName;
  drivingLicenceValue;
  securityClearanceArray;
  industryArrayData;
  timeLeftData;
  educationData;
  succesMessageFlag = false;
  responseData;
  searchListData;
  recentRecruiterSaveId;
  searchListDataFlag = false;
  showSaveSearchList = false;
  educationValue = "";
  errorMessageFlag = false;
  errorMessage = "";
  industrySectorValue;
  securityClearValue;
  postcode = '';
  displayTown = '';
  displayCountry = '';
  displayLocationName = '';
  constructor(public _commonRequestService: CommonRequestService, private router: Router,
    private ngZone: NgZone, private commonService: CommonService) { }

  ngOnInit() {
    this.getSecurityClearance();
    this.getIndustry();
    this.getTimeLeftData();
    this.getEducationData();
    //this.loadLocationAutoData();
    var localStorageData = JSON.parse(localStorage.getItem('watchDogData'));
    console.log("localStorageData--", localStorageData);
    if(localStorageData && localStorageData.watchDogData && localStorageData.watchDogData.watchDogId) {
      this.getSaveSearchDetails(localStorageData.watchDogData.watchDogId);
    }

  }
  ngAfterViewInit() {
    this.loadLocationAutoData();
  }

  loadLocationAutoData() {
    //this.mapsAPILoader.load().then(() => {
      //console.log("this.searchElementRef.nativeElement", this.searchElementRef.nativeElement);
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"],
        componentRestrictions : {'country' : 'GB'}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log("place--", place);
          this.postcode = "";
          this.displayTown = "";
          this.displayCountry = "";
          this.displayLocationName = "";
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
                this.displayLocationName = this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value : '';
              }
            }
          }
          console.log("this.postcode", this.postcode);
          console.log("this.displayTown", this.displayTown);
          console.log("this.displayCountry", this.displayCountry);
          console.log("this.displayLocationName", this.displayLocationName);
          //set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          // this.zoom = 12;
        });
      });
      console.log("cityTownValue", this.cityTownValue);
    //});
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

  getEducationData() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/education_level";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
          console.log("education data--", data);
          if(data && data.status == 'TRUE') {
            this.educationData = data.data;
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
          }
          else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
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
          }  else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
          //this.recruiterNameArray = data.data;
        }
    );
  }

  saveSearchDelete() {
     var input = {
     "email": "johnsmith21@gmail.com",
      "loginToken": "$2y$10$U2wRqqX16ZU5/bno9773M.79k5Pag7h9njwxC7Bk6aqgB1NyElP0m",
      "id":this.recentRecruiterSaveId
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watchdogs/delete";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("delete data--", data);
          if(data && data.status == 'TRUE') {
            this.getSaveSearchList();
            this.resetFields();
          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
          //this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  getSaveSearchDetails(id) {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "id":id
   };
   this.recentRecruiterSaveId = id;
   console.log("this.recentRecruiterSaveId--", this.recentRecruiterSaveId)
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watchdogs/detail";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("save search details--", data);
          //this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
          if(data && data.status == 'TRUE') {
          if(data && data.data && data.data.params) {
            this.savedSearchName = data.data.name;
            this.addToWatchDogCheck = data.data.params.recuriter_search_add_to_watchdog === 1 ? true : false;
            this.jobTitle = data.data.params.recuriter_search_job_title;
            this.keywordSearch = data.data.params.recuriter_search_keywords;
            this.stemmedTerms = data.data.params.recuriter_search_stemmed_terms === 1 ? true : false;
            this.coreSkills = data.data.params.recuriter_search_core_skills;
            this.certificationValues = data.data.params.recuriter_search_core_skills;
            this.dontShowContractor = data.data.params.recuriter_search_certifications;
            this.cityTownValue = data.data.params.recuriter_search_location;
            this.searchElementRef.nativeElement.value = data.data.params.recuriter_search_location;
            this.includeRelocators = data.data.params.recuriter_search_include_relocators === 1 ? true : false;
            this.minRate = data.data.params.recuriter_search_by_rate_min;
            this.maxRate = data.data.params.recuriter_search_by_rate_max;
            this.dailyHourlyValue = data.data.params.recuriter_search_by_rate_type;
            this.timeLeftOnCutCont = data.data.params.recuriter_search_by_time_left;
            this.includeUnavailable = data.data.params.recuriter_search_by_updated_contractor_since;
            this.showContractors = data.data.params.recuriter_search_dont_show_to_contractor;
            this.contractorName = data.data.params.recuriter_search_by_contract_name;
            this.educationValue = data.data.params.recuriter_search_by_education;
            this.drivingLicenceValue = data.data.params.recuriter_search_by_driving_license === 1 ? 'yes' : 'no';
            this.industrySectorValue = data.data.params.recuriter_search_by_industry? data.data.params.recuriter_search_by_industry : [];
            this.securityClearValue = data.data.params.recuriter_search_by_security_clearance ? data.data.params.recuriter_search_by_security_clearance : [];
          }
        } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
        }
    );
  }

  getSaveSearchList() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("list save search--", data);
          if(data && data.data && data.data.length > 0) {
            this.searchListDataFlag = true;
            this.searchListData = data.data;
          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
          //this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  resetFields() {
    this.savedSearchName = "";
    this.addToWatchDogCheck = false;
    this.jobTitle = "";
    this.keywordSearch = "";
    this.stemmedTerms = false;
    this.coreSkills = "";
    this.certificationValues = "";
    this.dontShowContractor = "";
    this.cityTownValue = "";
    this.includeRelocators = false;
    this.minRate = "";
    this.maxRate = "";
    this.dailyHourlyValue = "";
    this.timeLeftOnCutCont = "";
    this.includeUnavailable = false;
    this.showContractors = "";
    this.contractorName = "";
    this.educationValue = "";
    this.drivingLicenceValue = "";
  }

  saveSearch() {
    var savedSearchSaveJson = {
      "email":"test@test8.com",
      "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
      "id": this.recentRecruiterSaveId,
      "detail":{
        "name":this.savedSearchName,
        "params":{          
      "recuriter_search_add_to_watchdog":1,
      "recuriter_search_job_title":this.jobTitle,
      "recuriter_search_keywords":this.keywordSearch,
      "recuriter_search_stemmed_terms":this.stemmedTerms === true ? 1 : 2,
      "recuriter_search_core_skills":this.coreSkills,
      "recuriter_search_certifications":this.certificationValues,
      "recuriter_search_dont_show_to_contractor":this.dontShowContractor,
      "recuriter_search_location":this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value : '',
      "recuriter_search_include_relocators":this.includeRelocators ? 1 : 2,
      "recuriter_search_by_rate_min":this.minRate,
      "recuriter_search_by_rate_max":this.maxRate,
      "recuriter_search_by_rate_type":this.dailyHourlyValue,
      "recuriter_search_by_time_left":this.timeLeftOnCutCont,
      "recuriter_search_by_unavailable":this.includeUnavailable ? 1 : 2,
      "recuriter_search_by_updated_contractor_since":this.showContractors,
      "recuriter_search_by_contract_name":this.contractorName,
      "recuriter_search_by_education":this.educationValue,
      "recuriter_search_by_industry":this.industrySectorValue?this.industrySectorValue:[],
      "recuriter_search_by_security_clearance":this.securityClearValue?this.securityClearValue:[],
      "recuriter_search_by_driving_license":this.drivingLicenceValue == 'yes' ? 1 : 2,      
        }
        // "location" : {
        //   "postcode" : this.postcode ? this.postcode : '',
        //   "display_name" : this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value : '',
        //   "display_town" : this.displayTown ? this.displayTown : '',
        //   "display_county" : this.displayCountry ? this.displayCountry : ''
        // }
      }

    }
    console.log("savedSearchSaveJson", savedSearchSaveJson);

    var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watchdogs/edit";
       this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
        data => {
          this.responseData = data;
          window.scroll(0,0);
          if(this.responseData.status === "TRUE"){
                  this.succesMessageFlag =true;
                  this.errorMessageFlag = false;
                  this.errorMessage = "";
                  this.errorMessage = "";
                  this.resetFields();
                  this.getSaveSearchList();

                  this.router.navigate(['./recruiter/watchdog']);
          //         this.ErrorMesageFlag =false
          // this.profileData={};
          // this.errorMsg = "";
          }
          else if(data && data.status == 'FALSE'){
            this.commonService.goToRecruiterLogin(data);
             this.succesMessageFlag =false;
             this.errorMessageFlag = true;
             this.errorMessage = "Error while saving Watch Dog";
              //this.ErrorMesageFlag =true;
              //this.errorMsg = this.responseData.error[0];
          }
    
          // console.log("keySkill: ", this.listSignUpData);
        }
    ); 
  }

  industrysectorChange(){
    
  }

}
