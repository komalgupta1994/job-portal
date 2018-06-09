import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contractor-job-search-saved',
  templateUrl: './contractor-job-search-saved.component.html',
  styleUrls: ['./contractor-job-search-saved.component.css']
})
export class ContractorJobSearchSavedComponent implements OnInit {
  industrySectorData = [];
  savedSearchList = [];
  timeSlotList = [];
  rateType = "daily";
  searchName: string;
  distance = "0";
  excludingWords;
  jobRefNumber;
  jobTitle;
  keywords;
  maxRate;
  minRate;
  location;
  postDuration = "0";
  industrySector = [];
  seletecSearchId;
  showList = false;
  saveClicked = false;
  showSuccessMsg = false;
  showErrorMsg = false;
  errorMsg = "";
  successMsg = "";
  searchNameExist = false;
  @ViewChild("search") public searchElementRef: ElementRef;
  postcode;
  displayTown;
  displayCountry;
  displayLocationName;
  isPublic = false;
  constructor(private _commonRequestService: CommonRequestService,private _router: Router, private _routes: ActivatedRoute,  private ngZone: NgZone) { }

  ngOnInit() {
    this.gettimeSlotList();
    this.getIndustrySector();
    this.getListOfSavedSearch();
    
     if (this._router.url.split('/')[1] == "public") {
      this.isPublic = true;
    }
  }

  ngAfterViewInit(){
   window.scroll(0,0);
   this.loadLocationAutoData();
  }

  getIndustrySector() {
    let dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
    this._commonRequestService.getData(dataUrl).subscribe(
      data => {
        this.industrySectorData = data.data;

      }
    );
  }


  getListOfSavedSearch() {
    let input = {
      "email": "johnsmith21@gmail.com",
      "loginToken": "$2y$10$U2wRqqX16ZU5/bno9773M.79k5Pag7h9njwxC7Bk6aqgB1NyElP0m",
    };
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search/list";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        this.savedSearchList = data.data;
        console.log("savedSearchList", this.savedSearchList);
      }
    );
  }

  saveSearch(form) {

    if (form.valid && this.isSearchAlreadyExist(this.searchName)) {
      let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search";
      let inputJson = {
        "email": "johnsmith21@gmail.com",
        "loginToken": "$2y$10$U2wRqqX16ZU5/bno9773M.79k5Pag7h9njwxC7Bk6aqgB1NyElP0m",
        "contractor_search_name": this.searchName ? this.searchName : null,
        "contractor_search_by_miles": this.distance ? this.distance : null,
        "contractor_search_by_exclude_words": this.excludingWords ? this.excludingWords : null,
        "contractor_search_by_job_reference_number": this.jobRefNumber ? this.jobRefNumber : null,
        "contractor_search_by_job_title": this.jobTitle ? this.jobTitle : null,
        "contractor_search_by_keywords": this.keywords ? this.keywords : null,
        "contractor_search_by_rate_max": this.maxRate ? this.maxRate : null,
        "contractor_search_by_rate_min": this.minRate ? this.minRate : null,
        "contractor_search_by_location": (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayLocationName || "") : "",
        "contractor_search_by_rate_type": this.rateType,
        "contractor_search_by_posted_contact_since": this.postDuration ? this.postDuration : null,
        "contractor_search_by_industry_sector": this.industrySector,
        "postcode": (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.postcode || "") : "",
        "display_town": (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayTown || "") : "",
        "display_county": (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayCountry || "") : "",
        "display_name": (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayLocationName || "") : "",
      }
      if (this.seletecSearchId) {
        inputJson['contractor_search_id'] = this.seletecSearchId;
        url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search/update";
      }
      console.log("saveSearchInput", inputJson);

      this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          if (data.status == 'TRUE') {
            this.saveClicked = false
            this.resetForm();
            this.getListOfSavedSearch();
            this.showSuccessMsg = true;
            this.successMsg = "Search Saved";
            window.scroll(0, 0);
          } else {
            this.showErrorMsg = true;
            this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
            window.scroll(0, 0);
          }


        }
      );
    } else {
      window.scroll(0, 0)
    }


  }

  isSearchAlreadyExist(searchName) {
    this.searchNameExist = false;
    if (searchName && !(this.seletecSearchId > 0)) {
      for (let i = 0; i < this.savedSearchList.length; i++) {
        if ((this.savedSearchList[i].contractor_search_name).trim().toLowerCase() == searchName.trim().toLowerCase()) {
          this.searchNameExist = true;
          return false;

        }
      }
      return true;;
    }
    else {
      return true;
    }

  }

  resetForm() {
    this.rateType = "daily";
    this.searchName = "";
    this.distance = "0";
    this.excludingWords = "";
    this.jobRefNumber = "";
    this.jobTitle = "";
    this.keywords = "";
    this.maxRate = "";
    this.minRate = "";
    this.searchElementRef.nativeElement.value = "";
    this.postDuration = "";
    this.industrySector = [];
    this.seletecSearchId = 0;
  }

  searchSelect(id) {
    this.seletecSearchId = id;
    let input = {
      "email": "johnsmith21@gmail.com",
      "loginToken": "$2y$10$U2wRqqX16ZU5/bno9773M.79k5Pag7h9njwxC7Bk6aqgB1NyElP0m",
      "contractor_search_id": this.seletecSearchId
    };
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search/detail";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        let searchData = data.data;
        console.log("searchDetail", data.data);
        this.rateType = searchData.contractor_search_by_rate_type;
        this.searchName = searchData.contractor_search_name;
        this.distance = searchData.contractor_search_by_miles;
        this.excludingWords = searchData.contractor_search_by_exclude_words;
        this.jobRefNumber = searchData.contractor_search_by_job_reference_number;
        this.jobTitle = searchData.contractor_search_by_job_title;
        this.keywords = searchData.contractor_search_by_keywords;
        this.maxRate = searchData.contractor_search_by_rate_max;
        this.minRate = searchData.contractor_search_by_rate_min;
        this.searchElementRef.nativeElement.value = searchData.display_name;
        this.postcode = searchData.postcode;
        this.displayTown = searchData.display_town;
        this.displayCountry = searchData.display_county;
        this.displayLocationName = searchData.display_name;
        this.postDuration = searchData.contractor_search_by_posted_contact_since;
        this.industrySector = searchData.contractor_search_by_industry_sector;
      }
    );
  }


  deleteSearch() {
    if (this.seletecSearchId) {
      let input = {
        "email": "johnsmith21@gmail.com",
        "loginToken": "$2y$10$U2wRqqX16ZU5/bno9773M.79k5Pag7h9njwxC7Bk6aqgB1NyElP0m",
        "contractor_search_id": this.seletecSearchId
      };
      let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search/delete";
      this._commonRequestService.postData(url, input).subscribe(
        data => {
          if (data.status == 'TRUE') {
            this.seletecSearchId = "";
            this.resetForm();
            this.getListOfSavedSearch();
            this.successMsg = "Search deleted";
            this.showSuccessMsg = true;
            window.scroll(0, 0);
          } else {
            this.showErrorMsg = true;
            this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
            window.scroll(0, 0);
          }
        }
      );
    }

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
          this.postcode = "";
          this.displayTown = "";
          this.displayCountry = "";
          this.displayLocationName = "";
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          if (place && place.address_components && place.address_components.length > 0 && place.formatted_address) {
            for (var i = 0; i < place.address_components.length; i++) {
              for (var j = 0; j < place.address_components[i].types.length; j++) {
                if (place.address_components[i].types[j] == "postal_code") {
                  this.postcode = place.address_components[i].long_name;
                }
                if (place.address_components[i].types[j] == "postal_town") {
                  this.displayTown = place.address_components[i].long_name;
                }
                if (place.address_components[i].types[j] == "country") {
                  this.displayCountry = place.address_components[i].long_name;
                }
                this.displayLocationName = this.displayTown + " " + this.postcode + "," + this.displayCountry;
              }
            }
          }
        });
      });

    //});
  }

  runSearch() {
    var inputJson = {
        contractor_search_by_job_title: this.jobTitle ? this.jobTitle : "",
        contractor_search_by_keywords: this.keywords ? this.keywords : "",
        contractor_search_by_exclude_words: this.excludingWords ? this.excludingWords : "",
        contractor_search_by_miles: this.distance && this.distance != '0' ? this.distance : "",
        contractor_search_by_location:  (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayLocationName || "") : "",
        contractor_search_by_rate_min: this.minRate ? this.minRate : "",
        contractor_search_by_rate_max: this.maxRate ? this.maxRate : "",
        contractor_search_by_rate_type: this.rateType ? this.rateType : "",
        contractor_search_by_job_reference_number: this.jobRefNumber ? this.jobRefNumber : "",
        contractor_search_by_posted_contact_since: this.postDuration && this.postDuration !== '0' ? this.postDuration : "",
        contractor_search_by_industry_sector: this.industrySector ? this.industrySector : "",
        postcode: (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.postcode || "") : "",
        display_town: (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayTown || "") : "",
        display_county: (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayCountry || "") : "",
        display_name: (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayLocationName || "") : "",
        page: 1,
        limit: 10,
        sort: 1
      }

      if (!this.isPublic) {
        inputJson['email'] = "david@gmail.com";
        inputJson['loginToken'] = "zbdkjasdJJJ41saloijdoailkL"
      }

      localStorage.setItem("jobSearch", JSON.stringify(inputJson));
      //this._router.navigate(['../searchResult'], { 'relativeTo': this._routes });
      this._router.navigate(['../contractor_search'], { 'relativeTo': this._routes, queryParams :  inputJson} )
  }

  gettimeSlotList() {
    let dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/time_slot_contractor_search";
    this._commonRequestService.getData(dataUrl).subscribe(
      data => {
        this.timeSlotList = data.data;

      }
    );
  }

}
