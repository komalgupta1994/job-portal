import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDataSharedService } from '../commonDataSharedService';

@Component({
  selector: 'app-about-contractor',
  templateUrl: './about-contractor.component.html',
  styleUrls: ['./about-contractor.component.css']
})
export class AboutContractorComponent implements OnInit {
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30
  }

  title;
  @ViewChild("search") public searchElementRef: ElementRef;
  postcode;
  displayTown;
  displayCountry;
  displayLocationName;

  constructor(private _router: Router, private _routes: ActivatedRoute, private ngZone: NgZone, private _commonDataSharedService: CommonDataSharedService) { }

  ngOnInit() {
    this._commonDataSharedService.switchToDivSubject.subscribe((data) =>{
          if(data) {
            //console.log("data--", data);

            if (data === 'contractRecruit') {
              setTimeout(function(){
              if ($('#contractrecurit') && $('#contractrecurit').offset())
              $(window).scrollTop($('#contractrecurit').offset().top);
             },100); 
            }
            if (data === "whoAreWe") {
              setTimeout(function(){
              if ($('#whoarewe') && $('#whoarewe').offset())
             $(window).scrollTop($('#whoarewe').offset().top);
             },100); 
            }
            if (data === "whatWeDo") {
              setTimeout(function(){
               if ($('#whatdowedo') && $('#whatdowedo').offset())
               $(window).scrollTop($('#whatdowedo').offset().top); 
              },100);
            }

            
          }
        });



    $(document).on('scroll', function() {
      let currentHeight = $(this).height();
      if ($('#contractorroket') && $('#contractorroket').position() && $('#contractorroket').position().top && $(this).scrollTop() >= $('#contractorroket').position().top) {
        $("#contractorroket").animate({ top: '50px' }, 'slow', function() { });
      }
      var isAnimating = $('#contractorroketarrow').is(':animated');
      console.log('isAnimating--', isAnimating, $('#contractorroketarrow').css('top'));
      if ($('#contractorroketarrow').css('top') && parseInt($('#contractorroketarrow').css('top').split("px")[0]) <= 80) {
        if ($('#contractorroketarrow') && $('#contractorroketarrow').position()) {
          $("#contractorroketarrow").animate({ right: '+=10', top: '+=10' }, 'fast', function() {
            console.log($(this).css('top'));
            if ($('#contractorroketarrow').css('top') && parseInt($('#contractorroketarrow').css('top').split("px")[0]) >= 80) {
              $(this).stop(true, true);
            }
          });
        }

      }





      // var isAnimating = $('.contractorroketarrow').is(':animated');
      // if (!isAnimating && $('.contractorroketarrow').css('top') <= '80px') {    	
      // if($('.contractorroketarrow') && $('.contractorroketarrow').position()){
      //     $(".contractorroketarrow").animate({right: '+=10', top: '+=10'},'slow',function(){    
      //       console.log($(this).css('top'));
      //       if ($(this).css('top') > '80px')    	{
      //          $(this).stop(true,true);
      //       }
      //     });
      // }


      // }
      // var pTop = parseInt($('.contractorroketarrow').css('top'));
      //     console.log("pTop--", pTop);
      //     if (pTop === 80) {
      //       $(".contractorroketarrow").stop(true,true);
      //     }
      //console.log( parseInt($(this).scrollTop().toString()) , parseInt(($(document).height() - $(window).height() - $(".contractorroketarrow").height()).toString()));
      // if ( parseInt($(this).scrollTop().toString()) == parseInt(($(document).height() - $(window).height()).toString())) {
      //   $(".contractorroketarrow").stop(true,true);
      // }
      // if($(".footer_bottom")) {
      // 	$(".contractorroketarrow").stop(true,true);
      // 	// alert("in");
      // }
    })
  }

  ngAfterViewInit() {
    this.loadLocationAutoData();
  }


  loadLocationAutoData() {

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

      });
    });


  }



  searchContract(title) {
    let inputJson = {
      contractor_search_by_job_title: title,
      contractor_search_by_keywords: "",
      contractor_search_by_exclude_words: "",
      contractor_search_by_miles: "",
      contractor_search_by_location: (this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) ? (this.displayLocationName || "") : "",
      contractor_search_by_rate_min: "",
      contractor_search_by_rate_max: "",
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


}
