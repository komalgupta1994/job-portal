import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { MapsAPILoader } from '@agm/core';
// import { } from 'googlemaps';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title;
  @ViewChild("search") public searchElementRef: ElementRef;
  postcode;
  displayTown;
  displayCountry;
  displayLocationName;
  constructor(private _router: Router, private _routes: ActivatedRoute,  private ngZone: NgZone) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.loadLocationAutoData();
  }

  searchContract(title,  minRate = "", maxRate = "") {
    let inputJson = {
      contractor_search_by_job_title: title,
      contractor_search_by_keywords: "",
      contractor_search_by_exclude_words: "",
      contractor_search_by_miles: "",
      contractor_search_by_location: (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayLocationName || "") : "",
      contractor_search_by_rate_min: minRate,
      contractor_search_by_rate_max: maxRate,
      contractor_search_by_rate_type: "",
      contractor_search_by_job_reference_number: "",
      contractor_search_by_posted_contact_since: "",
      contractor_search_by_industry_sector: "",
      postcode : (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.postcode || "") : "",
      display_town : (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayTown || "") : "",
      display_county : (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayCountry || "") : "",
      display_name : (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayLocationName || "") : "",
      page: 1,
      limit: 10,
      sort: 1
    }

    localStorage.setItem("jobSearch", JSON.stringify(inputJson));
    //this._router.navigate(['../searchResult'], { 'relativeTo': this._routes })
    this._router.navigate(['../contractor_search'], { 'relativeTo': this._routes, queryParams :  inputJson} )
  }

  loadLocationAutoData() {
   // this.mapsAPILoader.load().then(() => {
      //console.log("this.searchElementRef.nativeElement", this.searchElementRef.nativeElement);
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"],
        componentRestrictions: { 'country': 'GB' }
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
          console.log("this.postcode", this.postcode);
          console.log("this.displayTown", this.displayTown);
          console.log("this.displayCountry", this.displayCountry);
          console.log("this.displayLocationName", this.displayLocationName);
        });
      });
     
    //});
  }

}
