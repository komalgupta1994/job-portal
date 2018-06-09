import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router } from '@angular/router';
import { FormsModule,NgForm, FormControl } from '@angular/forms';
import { CommonService } from '../commonService.service';
// import { } from 'googlemaps';
// import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-recruiter-job-posting',
  templateUrl: './recruiter-job-posting.component.html',
  styleUrls: ['./recruiter-job-posting.component.css']
})
export class RecruiterJobPostingComponent implements OnInit {

  public searchControl: FormControl;
  @ViewChild("search")
  public searchElementRef: ElementRef;

jobPostingJobTitle: string;
jobPostingDuration;
startDate;
industrySector = "0";
workEligibility = "0";
cityTownValue;
minRate: number;
maxRate: number;
dailyHourlyValue;
jobSpecificationTitle: any;
jobSpecificationBody: any;
recruiterName = "";
saveTemplateAs;
jobReference;
input;
jobPostingDetails;
recruiterNameArray;
jobPostFlag = false;
jobPostingJobId = '';
editJobId = '';
industryDataArray;
postJobSuccessMsg = '';
jobPostingTiteFlag = false;
jobPostingDurationFlag = false;
startDateFlag = false;
industrySectorFlag = false;
workEliFlag = false;
templateData;
allErrorFlag = false;
renderTemmplateData;
currentTemplate = "";
cityFlag = false;
minRateFlag = false;
maxRateFlag = false;
jobSpecificationFlag = false;
WSErrorMsg = "";
placeSearch;
autocomplete;
postcode = '';
displayTown = '';
displayCountry = '';
displayLocationName = '';
jobSpecificationValue = '';
public froalaOptionsPreview: any = {
    placeHolderText: 'Edit Your Content Here',
    charCounterCount: false,
    toolbarButtons: ['bold', 'fullscreen', 'italic', 'strikeThrough', 'subscript', 'superscript', 'L', 'underline', 'paragraphFormat', 'alert', 'undo', 'redo', 'outdent', 'indent', 'clearFormatting', 'insertTable', 'html', 'fontFamily', 'fontSize', 'color', 'formatBlock', 'blockStyle', 'inlineStyle', 'align', 'insertOrderedList', 'insertUnorderedList', 'formatUL', 'formatOL', 'selectAll', 'createLink', 'insertImage', 'insertVideo', 'table', 'save', 'insertHorizontalRule', 'uploadFile', 'removeFormat', 'specialCharacters', 'spellChecker', 'insertHR', '-', 'quote', 'selectAll', 'insertLink', 'help', 'print', 'clearFormatting'],
    toolbarButtonsXS: ['bold', 'fullscreen', 'italic', 'strikeThrough', 'subscript', 'superscript', 'L', 'underline', 'paragraphFormat', 'alert', 'undo', 'redo', 'outdent', 'indent', 'clearFormatting', 'insertTable', 'html', 'fontFamily', 'fontSize', 'color', 'formatBlock', 'blockStyle', 'inlineStyle', 'align', 'insertOrderedList', 'insertUnorderedList', 'formatUL', 'formatOL', 'selectAll', 'createLink', 'insertImage', 'insertVideo', 'table', 'save', 'insertHorizontalRule', 'uploadFile', 'removeFormat', 'specialCharacters', 'spellChecker', 'insertHR', '-', 'quote', 'selectAll', 'insertLink', 'help', 'print', 'clearFormatting'],
    toolbarButtonsSM: ['bold', 'fullscreen', 'italic', 'strikeThrough', 'subscript', 'superscript', 'L', 'underline', 'paragraphFormat', 'alert', 'undo', 'redo', 'outdent', 'indent', 'clearFormatting', 'insertTable', 'html', 'fontFamily', 'fontSize', 'color', 'formatBlock', 'blockStyle', 'inlineStyle', 'align', 'insertOrderedList', 'insertUnorderedList', 'formatUL', 'formatOL', 'selectAll', 'createLink', 'insertImage', 'insertVideo', 'table', 'save', 'insertHorizontalRule', 'uploadFile', 'removeFormat', 'specialCharacters', 'spellChecker', 'insertHR', '-', 'quote', 'selectAll', 'insertLink', 'help', 'print', 'clearFormatting'],
    toolbarButtonsMD: ['bold', 'fullscreen', 'italic', 'strikeThrough', 'subscript', 'superscript', 'L', 'underline', 'paragraphFormat', 'alert', 'undo', 'redo', 'outdent', 'indent', 'clearFormatting', 'insertTable', 'html', 'fontFamily', 'fontSize', 'color', 'formatBlock', 'blockStyle', 'inlineStyle', 'align', 'insertOrderedList', 'insertUnorderedList', 'formatUL', 'formatOL', 'selectAll', 'createLink', 'insertImage', 'insertVideo', 'table', 'save', 'insertHorizontalRule', 'uploadFile', 'removeFormat', 'specialCharacters', 'spellChecker', 'insertHR', '-', 'quote', 'selectAll', 'insertLink', 'help', 'print', 'clearFormatting']
  };
  constructor(private router: Router, public _commonRequestService: CommonRequestService, 
    private commonService: CommonService,
    private ngZone: NgZone) { }

  ngOnInit() {
    window.scroll(0,0);
    this.recruiterNameList();
    this.getIndustry();
    this.getTemplateData();
    //this.loadLocationAutoData();
    var localStorageData = JSON.parse(localStorage.getItem('recruiterJobData'));
    console.log("localStorageData--", localStorageData);
    // if(localStorageData && localStorageData.jobId) {
    //   this.jobPostingJobId = localStorageData.jobId;
    //   this.jobPostingData(localStorageData.jobId);
    // }
     if(this.commonService.getJobIdForJobPosting()) {
       console.log("this.commonService.getJobIdForJobPosting()", this.commonService.getJobIdForJobPosting());
      this.jobPostingJobId = this.commonService.getJobIdForJobPosting();
      this.jobPostingData(this.jobPostingJobId);
    }
    console.log("this.jobPostingJobId", this.jobPostingJobId);
    if(this.jobPostingJobId && typeof this.jobPostingJobId == 'object') {
      this.jobPostingJobTitle = this.jobPostingJobId['jobTitle'];
       this.jobPostingDuration = this.jobPostingJobId['duration'];
       this.startDate = this.jobPostingJobId['startDate'];
       this.industrySector = this.jobPostingJobId['industrySectorId'];
       this.workEligibility = this.jobPostingJobId['workEligibilityId'];
       this.cityTownValue = this.jobPostingJobId['cityTown'];
       this.minRate = this.jobPostingJobId && this.jobPostingJobId['prefereedRate'] && this.jobPostingJobId['prefereedRate'].minRate ? this.jobPostingJobId['prefereedRate'].minRate : 0;
       this.maxRate = this.jobPostingJobId && this.jobPostingJobId['prefereedRate'] && this.jobPostingJobId['prefereedRate'].maxRate ? this.jobPostingJobId['prefereedRate'].maxRate : 0
       this.dailyHourlyValue = this.jobPostingJobId && this.jobPostingJobId['prefereedRate'] && this.jobPostingJobId['prefereedRate'].dailyHourlyRate ? this.jobPostingJobId['prefereedRate'].dailyHourlyRate : '';
       // this.jobSpecificationTitle = this.jobPostingJobId['jobSpecificationTitle'];
       // this.jobSpecificationBody = this.jobPostingJobId['jobSpecification'];
       this.jobSpecificationValue = this.jobPostingJobId['jobSpecificationTitle'] + ' ' + this.jobPostingJobId['jobSpecification'];
       this.recruiterName = this.jobPostingJobId['recruiter_Id'];
       this.saveTemplateAs = this.jobPostingJobId['saveTempleteAs'];
       this.jobReference = this.jobPostingJobId['jobReference'];
       this.editJobId = this.jobPostingJobId['jobId'];
     } else if(this.jobPostingJobId){
       this.editJobId = this.jobPostingJobId;
       this.jobPostingData(this.jobPostingJobId);
     }
    var editJoblocalStorageData = JSON.parse(localStorage.getItem('editJobPost'));
    console.log("editJoblocalStorageData", editJoblocalStorageData);
    // if(editJoblocalStorageData && editJoblocalStorageData.jobPreviewData) {
    //   this.jobPostingJobTitle = editJoblocalStorageData.jobPreviewData.jobTitle;
    //    this.jobPostingDuration = editJoblocalStorageData.jobPreviewData.duration;
    //    this.startDate = editJoblocalStorageData.jobPreviewData.startDate;
    //    this.industrySector = editJoblocalStorageData.jobPreviewData.industrySectorId;
    //    this.workEligibility = editJoblocalStorageData.jobPreviewData.workEligibilityId;
    //    this.cityTownValue = editJoblocalStorageData.jobPreviewData.cityTown;
    //    this.minRate = editJoblocalStorageData.jobPreviewData && editJoblocalStorageData.jobPreviewData.prefereedRate && editJoblocalStorageData.jobPreviewData.prefereedRate.minRate ? editJoblocalStorageData.jobPreviewData.prefereedRate.minRate : 0;
    //    this.maxRate = editJoblocalStorageData.jobPreviewData && editJoblocalStorageData.jobPreviewData.prefereedRate && editJoblocalStorageData.jobPreviewData.prefereedRate.maxRate ? editJoblocalStorageData.jobPreviewData.prefereedRate.maxRate : 0
    //    this.dailyHourlyValue = editJoblocalStorageData.jobPreviewData && editJoblocalStorageData.jobPreviewData.prefereedRate && editJoblocalStorageData.jobPreviewData.prefereedRate.dailyHourlyRate ? editJoblocalStorageData.jobPreviewData.prefereedRate.dailyHourlyRate : '';
    //    this.jobSpecificationTitle = editJoblocalStorageData.jobPreviewData.jobSpecificationTitle;
    //    this.jobSpecificationBody = editJoblocalStorageData.jobPreviewData.jobSpecification;
    //    this.recruiterName = editJoblocalStorageData.jobPreviewData.recruiter_Id;
    //    this.saveTemplateAs = editJoblocalStorageData.jobPreviewData.saveTempleteAs;
    //    this.jobReference = editJoblocalStorageData.jobPreviewData.jobReference;
    //    this.editJobId = editJoblocalStorageData.jobPreviewData.jobId;
    // }
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
 
  // getTemplateData() {
  //    var input = {
  //    "email":"test@test7.com",
  //   "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

  //  };
  //  console.log("input--", input);
  //  var wsUrl="http://dev.contractrecruit.co.uk/contractor_site/api/post/recruiter/job/template_list";
  //      this._commonRequestService.postData(wsUrl, input).subscribe(
  //       data => {
  //         console.log("templateData--", data);
  //         this.templateData = data.data;
  //         //this.recruiterNameArray = data.data;
  //       }
  //   );
  // }

  getTemplateData() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/template_list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          if(data && data.status == 'TRUE') {
            this.templateData = data.data;
            this.currentTemplate = this.templateData[0].id;
            console.log("templateData--", data);
          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
        }
    );
  }

  renderTemplateDate() {
    var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "templateId": this.currentTemplate ? this.currentTemplate : ''
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/template_by_id";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          if(data && data.status == 'TRUE') {
            this.renderTemmplateData = data.data;
            console.log("templateData--", data);

           this.jobPostingJobTitle = this.renderTemmplateData.job_title;
           this.jobPostingDuration = this.renderTemmplateData.duration;
           this.startDate = this.renderTemmplateData.date_added ? this.renderTemmplateData.date_added.split(' ')[0] : '';
           this.industrySector = this.renderTemmplateData.industry;
           this.workEligibility = this.renderTemmplateData.WorkEligibility;
           this.cityTownValue = this.renderTemmplateData.show_location;
           this.minRate = this.renderTemmplateData && this.renderTemmplateData.rate_from  ? this.renderTemmplateData.rate_from : 0;
           this.maxRate = this.renderTemmplateData && this.renderTemmplateData.rate_to  ? this.renderTemmplateData.rate_to : 0
           this.dailyHourlyValue = this.renderTemmplateData && this.renderTemmplateData.rate_type ? this.renderTemmplateData.rate_type : '';
           // this.jobSpecificationTitle = this.renderTemmplateData.job_title;
           // this.jobSpecificationBody = this.renderTemmplateData.job_description;
           this.jobSpecificationValue = this.renderTemmplateData.job_title + ' ' + this.renderTemmplateData.job_description;
           this.recruiterName = this.renderTemmplateData.recruiter_Id;
           this.saveTemplateAs = this.renderTemmplateData.template_name;
           this.jobReference = this.renderTemmplateData.jobReference;
           this.editJobId = this.renderTemmplateData.id;
           this.recruiterName = this.renderTemmplateData.consultant_id;
         } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }

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
            this.industryDataArray = data.data;
          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
          //this.recruiterNameArray = data.data;
        }
    );
  }

   recruiterNameList() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          if(data && data.status == 'TRUE') {
            this.recruiterNameArray = data.data;
            this.recruiterName = this.recruiterNameArray[0].recuriter_id;
          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
        }
    );
       return this.recruiterName;
  }

  jobPostingData(jobId) {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "jobid":jobId

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/view";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          this.jobPostFlag = false;
         console.log("jobList--", data);
         if(data && data.data && data.status == "TRUE") {
           this.jobPostingDetails = data.data;

             this.jobPostingJobTitle = this.jobPostingDetails.jobTitle;
             this.jobPostingDuration = this.jobPostingDetails.duration;
             this.startDate = (this.jobPostingDetails.startDate).split(' ')[0];
             this.industrySector = this.jobPostingDetails.industrySectorId;
             this.workEligibility = this.jobPostingDetails.workEligibilityId;
             //this.cityTownValue = this.jobPostingDetails.cityTown;
             this.searchElementRef.nativeElement.value = this.jobPostingDetails.location && this.jobPostingDetails.location.display_name ? this.jobPostingDetails.location.display_name : ''; 
             this.displayLocationName = this.jobPostingDetails.display_name ? this.jobPostingDetails.display_name : ''; 
             this.minRate = this.jobPostingDetails && this.jobPostingDetails.prefereedRate && this.jobPostingDetails.prefereedRate.minRate ? this.jobPostingDetails.prefereedRate.minRate : 0;
             this.maxRate = this.jobPostingDetails && this.jobPostingDetails.prefereedRate && this.jobPostingDetails.prefereedRate.maxRate ? this.jobPostingDetails.prefereedRate.maxRate : 0
             this.dailyHourlyValue = this.jobPostingDetails && this.jobPostingDetails.prefereedRate && this.jobPostingDetails.prefereedRate.dailyHourlyRate ? this.jobPostingDetails.prefereedRate.dailyHourlyRate : '';
             // this.jobSpecificationTitle = this.jobPostingDetails.jobSpecificationTitle;
             // this.jobSpecificationBody = this.jobPostingDetails.jobSpecification;
             this.jobSpecificationValue = this.jobPostingDetails.jobSpecificationTitle + ' ' + this.jobPostingDetails.jobSpecification;
             this.recruiterName = this.jobPostingDetails.recruiter_Id;
             this.saveTemplateAs = this.jobPostingDetails.saveTempleteAs;
             this.jobReference = this.jobPostingDetails.jobReference;
         } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
        }
    );
  }

  resetData() {
    this.jobPostFlag = true;
    this.jobPostingDetails = "";
     this.jobPostingJobTitle = "";
     this.jobPostingDuration = "";
     this.startDate = "";
     this.industrySector = "0";
     this.workEligibility = "0";
     this.displayLocationName = "";
     this.minRate = 0;
     this.maxRate = 0;
     this.dailyHourlyValue = "";
     // this.jobSpecificationTitle = "";
     // this.jobSpecificationBody = "";
     this.jobSpecificationValue = "";
     this.recruiterName = "0";
     this.saveTemplateAs = "";
     this.jobReference = "";
     this.searchElementRef.nativeElement.value = "";
  }

  onJobPostSave(f:NgForm) {
    console.log("this.searchElementRef.nativeElement.value", this.searchElementRef.nativeElement.value);
    this.WSErrorMsg = "";
    window.scroll(0,0);
    if(this.jobPostingJobTitle) {
      this.jobPostingTiteFlag = false;
    } else {
      this.jobPostingTiteFlag = true;
    }

    if(this.jobPostingDuration) {
      this.jobPostingDurationFlag = false;
    } else {
      this.jobPostingDurationFlag = true;
    }

    if(this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value) {
      this.cityFlag = false;
    } else {
      this.cityFlag = true;
    }

    if(this.minRate) {
      this.minRateFlag = false;
    } else {
      this.minRateFlag = true;
    }

    if(this.maxRate) {
      this.maxRateFlag = false;
    } else {
      this.maxRateFlag = true;
    }

    if(this.startDate) {
      this.startDateFlag = false;
    } else {
      this.startDateFlag = true;
    }

    if(this.industrySector !== "0") {
      this.industrySectorFlag = false;
    } else {
      this.industrySectorFlag = true;
    }

    if(this.workEligibility !== "0") {
      this.workEliFlag = false;
    } else {
      this.workEliFlag = true;
    }

    if(!this.jobPostingDurationFlag && !this.jobPostingTiteFlag && !this.startDateFlag && 
      !this.cityFlag) {
      if(this.jobSpecificationValue) {
        this.jobSpecificationFlag = false;
      } else {
        this.jobSpecificationFlag = true;
      }
    }

    if(this.jobPostingDurationFlag || this.jobPostingTiteFlag || this.startDateFlag || 
      this.cityFlag || this.jobSpecificationFlag) {
      this.allErrorFlag = true;
    } else {
      this.allErrorFlag = false;
    }

    if(!this.allErrorFlag) {
    	this.input={
          //"email":this.email,
          // "password":this.password,
          //"loginToken": this.getData.data.loginToken,
  			"email":"test@test7.com",
  			"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
  			"jobTitle": this.jobPostingJobTitle,
  			"duration": this.jobPostingDuration,
  			"startDate": this.startDate,
  			"industrySectorId": this.industrySector,
  			"workEligibilityId" : this.workEligibility,
  			"cityTown": this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value : '',
        "postcode": this.postcode,
        "display_town" : this.displayTown,
        "display_county": this.displayCountry,
        "display_name" : this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value : '',
  			"prefereedRate": {
  				"minRate": this.minRate,
  				"maxRate": this.maxRate,
  				"dailyHourlyRate": this.dailyHourlyValue
  			},
  			"jobSpecification": this.jobSpecificationValue,
  			"jobSpecificationTitle": this.jobSpecificationValue,
  			"recruiterNameId": this.recruiterName ? this.recruiterName : '',
  			"saveTempleteAs": this.recruiterName ? this.recruiterName : '',
  			"jobReference": this.jobReference ? this.jobReference : '',
        "recuriter_job_is_featured": "0"        
        }

        if (this.currentTemplate) {
          this.input["saveTempleteAs_id"] = this.currentTemplate;
        }

        var wsUrl;
        //alert(0);
        if(!this.jobPostingJobId) {
        console.log("this.input", this.input);
          wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/add";
             this._commonRequestService.postData(wsUrl,this.input).subscribe(
              data => {
              	console.log("data result", data);
                window.scroll(0,0);
                if(data && data.status === "TRUE") {
                  this.resetData();
                  this.WSErrorMsg = "";
                  this.jobPostingJobId = "";
                  this.postJobSuccessMsg = 'Post Job Save succesfully!';
                  //  var obj = {'jobId' : ''};
                  // localStorage.setItem('recruiterJobData', JSON.stringify(obj));

                  // var obj1 = {'jobPreviewData' : ''};
                  // localStorage.setItem('editJobPost', JSON.stringify(obj1));
                } else if(data && data.status == 'FALSE'){
                  this.commonService.goToRecruiterLogin(data);
                  this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
                }
                }
          );
        } else {
          this.input['jobid'] = this.editJobId;
          wsUrl=" http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/submit/edit";
          console.log("input with job id-", this.input);
             this._commonRequestService.postData(wsUrl,this.input).subscribe(
              data => {
                console.log("data result", data);
                if(data && data.status === "TRUE") {
                   window.scroll(0,0);
                  this.resetData();
                  this.getTemplateData();
                  this.WSErrorMsg = "";
                  this.jobPostingJobId = "";
                  this.postJobSuccessMsg = 'Post Job Update succesfully!'
                  // var obj = {'jobId' : ''};
                  // localStorage.setItem('recruiterJobData', JSON.stringify(obj));

                  // var obj1 = {'jobPreviewData' : ''};
                  // localStorage.setItem('editJobPost', JSON.stringify(obj1));
                  //this.jobPostFlag = false;
                  //this.router.navigate(['/recruiter/manage-jobs']);
                } else if(data && data.status == 'FALSE'){
                  //this.previewJobErrorMsg = data.error;
                  //this.jobPostFlag = true;
                  this.commonService.goToRecruiterLogin(data);
                  this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
                }
                //this.jobPostFlag = true;
              }
          );
        }
      }
  }

  previewJob() {
    var input={
      "jobTitle": this.jobPostingJobTitle ? this.jobPostingJobTitle : '',
      "duration": this.jobPostingDuration ? this.jobPostingDuration : '',
      "startDate": this.startDate ? this.startDate : '',
      "industrySectorId": this.industrySector ? this.industrySector : '0',
      "workEligibilityId" : this.workEligibility ? this.workEligibility : '0',
      "cityTown": this.searchElementRef && this.searchElementRef.nativeElement && this.searchElementRef.nativeElement.value ? this.searchElementRef.nativeElement.value : '',
      "prefereedRate": {
        "minRate": this.minRate ? this.minRate : '0',
        "maxRate": this.maxRate ? this.maxRate : '0',
        "dailyHourlyRate": this.dailyHourlyValue ? this.dailyHourlyValue : ''
      },
      "jobSpecification": this.jobSpecificationValue ? this.jobSpecificationValue : '',
      "jobSpecificationTitle": '',
      "recruiterNameId": this.recruiterName ? this.recruiterName : '0',
      "saveTempleteAs": this.saveTemplateAs ? this.saveTemplateAs : '',
      "jobReference": this.jobReference ? this.jobReference : '',
      "recuriter_job_is_featured": "0",
      "jobId": this.jobPostingJobId ? this.jobPostingJobId : '',
      "templateId": this.currentTemplate ? this.currentTemplate : ''
      }
      console.log("input--", input);
    var obj = {'jobPreviewData' : input};
    localStorage.setItem('jobPostingData', JSON.stringify(obj));
  }

}
