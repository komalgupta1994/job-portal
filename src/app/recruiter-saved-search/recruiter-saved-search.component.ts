import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonService } from '../commonService.service';
import { FormControl } from '@angular/forms';
// import { } from 'googlemaps';
// import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-recruiter-saved-search',
  templateUrl: './recruiter-saved-search.component.html',
  styleUrls: ['./recruiter-saved-search.component.css']
})
export class RecruiterSavedSearchComponent implements OnInit {
  public searchControl: FormControl;
  @ViewChild("savedSearch")
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
  dailyHourlyValue = 'daily';
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
  searchListData = [];
  recentRecruiterSaveId;
  searchListDataFlag = false;
  showSaveSearchList = false;
  educationValue = "";
  errorSuccessMessage = "";
  industrySectorValue;
  securityClearValue;
  successMessageFlag = false;
  errorMessageFlag = false;
  saveSearchDataListing;
  sameSearchNameFlag = false;
  WSErrorMsg = '';
  showDeleteButtonFlag = false;
  lastSearchResult;
  autocomplete;
postcode = '';
displayTown = '';
displayCountry = '';
displayLocationName = '';
searchListErrorMsg = "";
  constructor(public _commonRequestService: CommonRequestService, private _router: Router,
    private _commonDataShareService: CommonDataSharedService, private commonService: CommonService, 
    private ngZone: NgZone, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getSecurityClearance();
    this.getIndustry();
    this.getTimeLeftData();
    this.getEducationData();
    this.getListOfSaveSearch();
    //this.loadLocationAutoData();
    // if(this.commonService.getLastSearchData()) {
    //   this.lastSearchResult = this.commonService.getLastSearchData();
    //   //this.savedSearchName = this.lastSearchResult.recuriter_search_by_contract_name ? this.lastSearchResult.recuriter_search_by_contract_name : '';
    //   this.addToWatchDogCheck = this.lastSearchResult.recuriter_search_by_contract_name;
    //   this.jobTitle = this.lastSearchResult.recuriter_search_job_title;
    //   this.keywordSearch = this.lastSearchResult.recuriter_search_keywords;
    //   this.stemmedTerms = this.lastSearchResult.recuriter_search_stemmed_terms == 1 ? true : false;
    //   this.coreSkills = this.lastSearchResult.recuriter_search_core_skills;
    //   this.certificationValues = this.lastSearchResult.recuriter_search_certifications;
    //   this.dontShowContractor = this.lastSearchResult.recuriter_search_dont_show_to_contractor;
    //   this.cityTownValue = this.lastSearchResult.recuriter_search_location;
    //   this.includeRelocators = this.lastSearchResult.recuriter_search_include_relocators == 1 ? true : false;
    //   this.minRate = this.lastSearchResult.recuriter_search_by_rate_min;
    //   this.maxRate = this.lastSearchResult.recuriter_search_by_rate_max;
    //   this.dailyHourlyValue = this.lastSearchResult.recuriter_search_by_rate_type;
    //   this.timeLeftOnCutCont = this.lastSearchResult.recuriter_search_by_time_left;
    //   this.includeUnavailable = this.lastSearchResult.recuriter_search_by_unavailable;
    //   // this.showContractors = this.lastSearchResult.recuriter_search_by_contract_name
    //   // this.contractorName = this.lastSearchResult.recuriter_search_by_contract_name
    //   this.educationValue = this.lastSearchResult.recuriter_search_by_education ? this.lastSearchResult.recuriter_search_by_education : '';
    //   this.drivingLicenceValue = this.lastSearchResult.recuriter_search_by_driving_license === 1 ? 'yes' : 'no';
    //   this.industrySectorValue = this.lastSearchResult.recuriter_search_by_industry;
    //   this.securityClearValue = this.lastSearchResult.recuriter_search_by_security_clearance;
    // }
  }

  ngAfterViewInit() {
    this.loadLocationAutoData();
  }

  loadLocationAutoData() {
    //this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"],
        componentRestrictions : {'country' : 'GB'}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log("place--", place);
          // this.postcode = "";
          // this.displayTown = "";
          // this.displayCountry = "";
          // this.displayLocationName = "";
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
        });
      });
      console.log("cityTownValue", this.cityTownValue);
    //});
  }

  industrysectorChange() {
    console.log("industrySectorValue--", this.industrySectorValue);
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
          } else if(data && data.status == 'FALSE') {
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
          } else if(data && data.status == 'FALSE') {
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
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search/delete";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("delete data--", data);
          if(data && data.status == 'TRUE') {
            this.getListOfSaveSearch();
            this.resetFields();
            this.successMessageFlag =  true;
            this.errorSuccessMessage = "Saved Search Delete Successfully";
          } else if(data && data.status == 'FALSE') {
           this.commonService.goToRecruiterLogin(data);
         }
          window.scroll(0,0);
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
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search/detail";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("save search details--", data);
          //this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
          if(data && data.data) {
            this.showDeleteButtonFlag = true;
            this.savedSearchName = data.data.recuriter_saved_search_name ? data.data.recuriter_saved_search_name : '';
            this.addToWatchDogCheck = data.data.recuriter_search_add_to_watchdog === 1 ? true : false;
            this.jobTitle = data.data.recuriter_search_job_title ? data.data.recuriter_search_job_title : '';
            this.keywordSearch = data.data.recuriter_search_keywords ? data.data.recuriter_search_keywords : '';
            this.stemmedTerms = data.data.recuriter_search_stemmed_terms === 1 ? true : false;
            this.coreSkills = data.data.recuriter_search_core_skills ? data.data.recuriter_search_core_skills : '';
            this.certificationValues = data.data.recuriter_search_certifications ? data.data.recuriter_search_certifications : '';
            this.dontShowContractor = data.data.recuriter_search_dont_show_to_contractor ? data.data.recuriter_search_dont_show_to_contractor : '';
            //this.cityTownValue = data.data.recuriter_search_location;
            this.searchElementRef.nativeElement.value = data.data.recuriter_search_location ? data.data.recuriter_search_location : '';
            this.includeRelocators = data.data.recuriter_search_include_relocators === 1 ? true : false;
            this.minRate = data.data.recuriter_search_by_rate_min ? data.data.recuriter_search_by_rate_min : '';
            this.maxRate = data.data.recuriter_search_by_rate_max ? data.data.recuriter_search_by_rate_max : '';
            this.dailyHourlyValue = data.data.recuriter_search_by_rate_type ? data.data.recuriter_search_by_rate_type : '';
            this.timeLeftOnCutCont = data.data.recuriter_search_by_time_left ? data.data.recuriter_search_by_time_left : '';
            this.includeUnavailable = data.data.recuriter_search_by_updated_contractor_since ? data.data.recuriter_search_by_updated_contractor_since : '';
            this.showContractors = data.data.recuriter_search_dont_show_to_contractor ? data.data.recuriter_search_dont_show_to_contractor : '';
            this.contractorName = data.data.recuriter_search_by_contract_name ? data.data.recuriter_search_by_contract_name : '';
            this.educationValue = data.data.recuriter_search_by_education ? data.data.recuriter_search_by_education : '';
            this.industrySectorValue = data.data.recuriter_search_by_industry ? data.data.recuriter_search_by_industry : '';
            this.securityClearValue = data.data.recuriter_search_by_security_clearance ? data.data.recuriter_search_by_security_clearance : '';
            this.drivingLicenceValue = data.data.recuriter_search_by_driving_license === 1 ? 'yes' : 'no';
          } else if(data && data.status == 'FALSE') {
           this.commonService.goToRecruiterLogin(data);
         }
        }
    );
  }

  getSaveSearchList() {
    this.searchListDataFlag = true;
     this.searchListData = this.saveSearchDataListing;
  }

  getListOfSaveSearch() {
    this.searchListErrorMsg = "";
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
            this.saveSearchDataListing = data.data;
            this.searchListErrorMsg = "";
          } else if(data && data.status == 'FALSE'){
               this.commonService.goToRecruiterLogin(data);
               this.searchListErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
             
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
    this.industrySectorValue = [];
    this.securityClearValue = [];
  }

  saveSearch() {
    this.WSErrorMsg = "";
    var savedSearchSaveJson = {
      "email":"test@test8.com",
      "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
      "recuriter_saved_search_name":this.savedSearchName,
      "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 0,
      "recuriter_search_job_title":this.jobTitle?this.jobTitle:'',
      "recuriter_search_keywords":this.keywordSearch?this.keywordSearch:'',
      "recuriter_search_stemmed_terms":this.stemmedTerms === true ? 1 : 0,
      "recuriter_search_core_skills":this.coreSkills?this.coreSkills:'',
      "recuriter_search_certifications":this.certificationValues?this.certificationValues:'',
      "recuriter_search_dont_show_to_contractor":this.dontShowContractor?this.dontShowContractor:'',
      "recuriter_search_location": this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value :'',
      "recuriter_search_include_relocators":this.includeRelocators ? 1 : 0,
      "recuriter_search_by_rate_min":this.minRate?this.minRate:'',
      "recuriter_search_by_rate_max":this.maxRate?this.maxRate:'',
      "recuriter_search_by_rate_type":this.dailyHourlyValue?this.dailyHourlyValue:'',
      "recuriter_search_by_time_left":this.timeLeftOnCutCont?this.timeLeftOnCutCont:'',
      "recuriter_search_by_unavailable":this.includeUnavailable == true ? 1 : 0,
      "recuriter_search_by_updated_contractor_since":this.showContractors?this.showContractors:'',
      "recuriter_search_by_contract_name":this.contractorName?this.contractorName:'',
      "recuriter_search_by_education":this.educationValue?this.educationValue:"",
      "recuriter_search_by_industry":this.industrySectorValue?this.industrySectorValue:[],
      "recuriter_search_by_security_clearance":this.securityClearValue?this.securityClearValue:[],
      "recuriter_search_by_driving_license":this.drivingLicenceValue == 'yes' ? 1 : 0,
      "postcode": this.postcode ? this.postcode : '',
      "display_town" : this.displayTown ? this.displayTown : '',
      "display_county": this.displayCountry ? this.displayCountry : '',
      "display_name" : this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value :''
     
    }

    if(this.saveSearchDataListing && this.saveSearchDataListing.length > 0 && this.recentRecruiterSaveId == "") {
      for(var i=0;i<this.saveSearchDataListing.length;i++) {
        // console.log("this.saveSearchDataListing[i].recuriter_saved_search_name", this.saveSearchDataListing[i].recuriter_saved_search_name);
        // console.log("this.savedSearchName", this.savedSearchName, this.savedSearchName.toLowerCase().trim());
        if(this.saveSearchDataListing[i].recuriter_saved_search_name == this.savedSearchName.toLowerCase().trim()) {
          window.scroll(0,0);
          this.errorMessageFlag = true;
          this.errorSuccessMessage = "This Saved Search name is already exist.";
          this.sameSearchNameFlag = true;
          break;
        } else{

          this.sameSearchNameFlag = false;
          this.errorMessageFlag = false;
          this.errorSuccessMessage = "";

        }
      }
    }
    console.log("this.sameSearchNameFlag", this.sameSearchNameFlag);

    
      if (this.recentRecruiterSaveId) {
        savedSearchSaveJson["search_id"] = this.recentRecruiterSaveId ? this.recentRecruiterSaveId : '';
        console.log("savedSearchSaveJson00", savedSearchSaveJson)
        var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search/update";
         this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
          data => {
            this.responseData = data;
            window.scroll(0,0);
            if(this.responseData.status === "TRUE"){
                    this.succesMessageFlag =true;
                    this.WSErrorMsg = "";
                    this.errorSuccessMessage = "Update succesfully !";
                    this.showDeleteButtonFlag = false;
                    this.successMessageFlag  = true;
                    this.errorMessageFlag = false;
                    this.resetFields();
                    this.getListOfSaveSearch();
            //         this.ErrorMesageFlag =false
            // this.profileData={};
            // this.errorMsg = "";
            }
            else if(data && data.status == 'FALSE'){
                this.commonService.goToRecruiterLogin(data);
               this.succesMessageFlag =false;
               this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
               this.successMessageFlag  = false;
               this.errorMessageFlag = true;
                //this.ErrorMesageFlag =true;
                //this.errorMsg = this.responseData.error[0];
            }
      
            // console.log("keySkill: ", this.listSignUpData);
          }
      ); 
      } else {
         if(!this.sameSearchNameFlag) {
            var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search";
             this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
              data => {
                this.responseData = data;
                window.scroll(0,0);
                if(this.responseData.status === "TRUE"){
                        this.succesMessageFlag =true;
                        this.WSErrorMsg = "";
                        this.errorSuccessMessage = "Saved succesfully !";
                        this.showDeleteButtonFlag = false;
                        this.successMessageFlag  = true;
                        this.errorMessageFlag = false;
                        this.resetFields();
                        this.getListOfSaveSearch();
                //         this.ErrorMesageFlag =false
                // this.profileData={};
                // this.errorMsg = "";
                }
                else if(data && data.status == 'FALSE'){
                   this.succesMessageFlag =false;
                   this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
                   this.commonService.goToRecruiterLogin(data);
                   this.successMessageFlag  = false;
                   this.errorMessageFlag = true;
                    //this.ErrorMesageFlag =true;
                    //this.errorMsg = this.responseData.error[0];
                }
          
                // console.log("keySkill: ", this.listSignUpData);
              }
          ); 
      }
    }
    //console.log("savedSearchSaveJson", savedSearchSaveJson);

    
  }

  searchResult() {
    var savedSearchSaveJson = {
      // "email":"test@test8.com",
      // "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
      // "recuriter_saved_search_name":this.savedSearchName,
      // "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 2,
      "recuriter_search_job_title":this.jobTitle?this.jobTitle:'',
      "recuriter_search_keywords":this.keywordSearch?this.keywordSearch:'',
      "recuriter_search_stemmed_terms":this.stemmedTerms === true ? 1 : 0,
      "recuriter_search_core_skills":this.coreSkills ? this.coreSkills:'',
      "recuriter_search_certifications":this.certificationValues ? this.certificationValues:'',
      "recuriter_search_dont_show_to_contractor":this.dontShowContractor?this.dontShowContractor:'',
      "recuriter_search_location":this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value : '',
      "recuriter_search_include_relocators":this.includeRelocators ? 1 : 0,
      "recuriter_search_by_rate_min":this.minRate?this.minRate:'',
      "recuriter_search_by_rate_max":this.maxRate?this.maxRate:'',
      "recuriter_search_by_rate_type":this.dailyHourlyValue?this.dailyHourlyValue:'',
      "recuriter_search_by_time_left":this.timeLeftOnCutCont?this.timeLeftOnCutCont:'',
      "recuriter_search_by_unavailable":this.includeUnavailable ? 1 : 1,
      "recuriter_search_by_updated_contractor_since":this.showContractors?this.showContractors:'',
      "recuriter_search_by_contract_name":this.contractorName?this.contractorName:'',
      "recuriter_search_by_education":this.educationValue?this.educationValue:"",
      "recuriter_search_by_industry":this.industrySectorValue ? this.industrySectorValue.toString() : "",
      "recuriter_search_by_security_clearance":this.securityClearValue ? this.securityClearValue.toString() : "",
      "recuriter_search_by_driving_license":this.drivingLicenceValue == 'yes' ? 1 : 0,
      "postcode": this.postcode ? this.postcode : '',
      "display_town" : this.displayTown ? this.displayTown : '',
      "display_county": this.displayCountry ? this.displayCountry : '',
      "display_name" : this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value :''
      //"page":1,
      //"limit":12
      //"sort":8
    }

    this._router.navigate(['/recruiter/recruiter-home'], { skipLocationChange: true }).then(() =>
        this._router.navigate(['/recruiter/searchresult-loggedin'], { 'relativeTo': this.activateRoute, queryParams :  savedSearchSaveJson} )
      );

    //this._commonDataShareService.advancedSerahcResult.next(savedSearchSaveJson);
    // this.commonService.setSearchResult(savedSearchSaveJson);
    // this._router.navigate(['/recruiter/searchresult-loggedin']);
  }

}
