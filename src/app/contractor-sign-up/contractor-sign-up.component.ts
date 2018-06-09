import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-contractor-sign-up',
  templateUrl: './contractor-sign-up.component.html',
  styleUrls: ['./contractor-sign-up.component.css']

})

export class ContractorSignUpComponent implements OnInit {

  inputData;
  contractor_first_name;
  contractor_last_name;
  contractor_email;
  contractor_tel_no;
  contractor_current_password;
  contractor_job_title;
  contractor_key_skills;
  fileForCV: any; contractor_employment_situation: any = ""; contractService: any;
  contractor_rate_min = 200; contractor_rate_max = 400; checkAgree;
  valid;
  fileForCv;
  dataForService: any;
  data;
  ErrorMesageFlag = false;
  contractor_agree_terms_status;
  contractor_services;
  keySkill; completeUrl; url; dataUrl; skillData = []; listSignUpData; inputUrl; fileUpload; succesMessageFlag = false; validateMsg;
  fd;
  categoryData = [];
  selectedSkill = "";
  selectedSkillObject;
  selectedSkillArray = [];
  selectedSkillIdArray = [];
  CVFile = null;
  noticePeriodList = [];
  submitClicked = false;
  noticePeriod = "Immediate";
  contractEndDate = "";
  useNoticePeriod = "no";
  detailsLiveFrom = "1";
  contractor_post_code = "";
  //formInvalidFlag = false;
  skill;
  passwordInvalid = false;
  cvInvalid = false;
  employmentSituation = false;
  contractorServicesInavlid = false;
  contractorInvalid = false;
  contractorEndDateInvalid = false;
  postalCodeInvalid = false;
  invalidFile = false;
  currentEmploymentSituationCheck;
  fileName;
  @ViewChild('myInput') myInputVariable;
  @ViewChild('permanent') permanentVariable;
  @ViewChild('inContract') inContractVariable;
  @ViewChild('outOfContract') outOfContractVariable;
  postcode;
  displayTown;
  displayCountry;
  displayLocationName;
  marker;
  defaultDatePickerStatus = false;
  constructor(public _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
    this.getKeySkillData();
    this.getContractorServices();
    this.getNoticePeriodData();
   
    //$("#datepicker").datepicker();
  }

  ngAfterViewInit() {
    window.scroll(0, 0);
    var currentDate = new Date();

    
    
  }

   showDatePicker(){
  // //  $("#datepicker").datepicker();
   
    // $('#datepicker').datepicker({
    //     format: "dd/mm/yyyy",
    //     autoclose: true
    // });
    let that = this;
    this.defaultDatePickerStatus = !this.defaultDatePickerStatus;
    if (this.defaultDatePickerStatus) {
      $('#datepicker').show();
       $('#datepicker').datepicker({
        format: "dd-mm-yyyy"
      }).on('change', function(){

        that.defaultDatePickerStatus = false;
        that.contractEndDate = $('#datepicker').val();
          $('#datepicker').hide();
      });
    } else {
      $('#datepicker').hide();
    }
    
   

   }

   // hideDatePicker(){
   //    $('#datepicker').hide();
   // }

  onFormSubmit(userForm) {
    console.log("this.permanentVariable--", this.permanentVariable);

    if (userForm.valid && !this.checkOtherFieldValidation()) {
      this.fd = new FormData();
      // this.fd.append('loginToken', (localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem('loginDetail')).token) ? JSON.parse(localStorage.getItem('loginDetail')).token : "nsakdlallas1232mk123b2k1390iq2ekq");
      // this.fd.append('email', (localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem('loginDetail')).email) ? JSON.parse(localStorage.getItem('loginDetail')).email : "test@gmail.com");
      this.fd.append('contractor_first_name', this.contractor_first_name);
      this.fd.append('contractor_last_name', this.contractor_last_name);
      this.fd.append('contractor_email', this.contractor_email);
      this.fd.append('contractor_tel_no', this.contractor_tel_no);
      this.fd.append('contractor_current_password', this.contractor_current_password);
      this.fd.append('contractor_rate_min', this.contractor_rate_min ? this.contractor_rate_min : "200");
      this.fd.append('contractor_rate_max', this.contractor_rate_max ? this.contractor_rate_max : "400");
      this.fd.append('fileForCv', this.CVFile);
      this.fd.append('contractor_job_title', this.contractor_job_title);
      this.fd.append('contractor_key_skills', this.selectedSkillArray.join(',') ? this.selectedSkillArray.join(',') : (this.skill ? this.skill : ''));
      this.fd.append('contractor_employment_situation', this.contractor_employment_situation ? this.contractor_employment_situation : "permanant");
      this.fd.append('contractor_services', JSON.stringify(this.getSelecetdContractorServices()));
      this.fd.append('contractor_agree_terms_status', this.contractor_agree_terms_status);
      this.fd.append('contract_end_date', (this.contractor_employment_situation == 'in contract' && this.contractEndDate) ? this.contractEndDate : "");
      this.fd.append('details_live', (this.contractor_employment_situation == 'in contract' && this.detailsLiveFrom) ? this.detailsLiveFrom : "");
      this.fd.append('notice_period', ((this.contractor_employment_situation == 'in contract' || this.contractor_employment_situation == "permanant") && this.detailsLiveFrom) ? this.noticePeriod : "");
      this.fd.append('happy_notice', (this.contractor_employment_situation == 'in contract' && this.useNoticePeriod) ? this.useNoticePeriod : "");
      this.fd.append('longitude', this.marker.lng);
      this.fd.append('latitude', this.marker.lat);
      
      this.fd.append('postcode', this.postcode);
      this.fd.append('display_town', this.displayTown);
      this.fd.append('display_county', this.displayCountry);
      this.fd.append('display_name', this.displayLocationName);

      // this.fd.append('details_live_date',(this.contractor_employment_situation == 'in contract' && this.detailsLiveFrom) ? this.detailsLiveFrom ? null);
      this.inputUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/signup";
      this._commonRequestService.postData(this.inputUrl, this.fd).subscribe(
        data => {
          this.listSignUpData = data;
          if (this.listSignUpData.status === "TRUE") {
            this.succesMessageFlag = true;
            this.ErrorMesageFlag = false
            this.inputData = {};
            this.resetForm();
            userForm.resetForm();
            window.scroll(0, 0);
            this.contractorInvalid = false;
            this._router.navigate(['../contractorLogin'], { 'relativeTo': this._routes });

          }
          else {
            this.validateMsg = this.listSignUpData.error[0];
            this.succesMessageFlag = false;
            this.ErrorMesageFlag = true;
            window.scroll(0, 0);
          }

          // console.log("keySkill: ", this.listSignUpData);
        }
      );
    } else {
      window.scroll(0, 0);
      this.checkOtherFieldValidation();
    }


  }


  resetForm() {
    this.contractor_first_name = "";
    this.contractor_last_name = "";
    this.contractor_current_password = "";
    this.contractor_email = "";
    this.contractor_tel_no = "";
    this.contractor_job_title = "";
    this.contractor_post_code = "";
    this.selectedSkillArray = [];
    this.contractor_employment_situation = "";
    for (var i = 0; i < this.categoryData.length; i++) {
      this.categoryData[i].checked = false;
    }
    this.contractor_agree_terms_status = false;
    this.myInputVariable.nativeElement.value = "";

    this.currentEmploymentSituationCheck = "";
  }

  logRadio(value): void {
    this.contractor_employment_situation = value;
  }


  checkOtherFieldValidation() {
    this.passwordInvalid = false;
    this.cvInvalid = false;
    this.employmentSituation = false;
    this.contractorServicesInavlid = false;
    this.contractorInvalid = false;
    this.contractorEndDateInvalid = false;
    if (this.contractor_current_password && this.contractor_current_password.length > 0 && this.contractor_current_password.length < 6) {
      this.passwordInvalid = true;
      this.contractorInvalid = true;
    }


    if (!this.CVFile) {
      this.cvInvalid = true;
      this.contractorInvalid = true;
    }

    if (this.CVFile && this.checkFileValid(this.CVFile.name)) {
      this.contractorInvalid = true;
    }

    if (!this.contractor_employment_situation) {
      this.employmentSituation = true;
      this.contractorInvalid = true;
    }

    if (this.getSelecetdContractorServices().length == 0) {
      this.contractorServicesInavlid = true;
      this.contractorInvalid = true;
    }

    if (this.contractor_employment_situation == 'in contract' && !this.contractEndDate) {
      this.contractorEndDateInvalid = true;
      this.contractorInvalid = true;
    }
    return this.contractorInvalid;
  }



  getKeySkillData() {
    this.dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/contractre/skillist";
    this._commonRequestService.getData(this.dataUrl).subscribe(
      data => {
        this.skillData = data.data;
        console.log("keySkill: ", this.skillData);
      }
    );


  }


  fileChangeEvent(fileInput: any) {
    this.CVFile = fileInput.target.files[0];
    this.fileName = this.CVFile.name;
  }


  checkFileValid(file) {
    let accetpableFile = ['doc', 'docx', 'pdf', 'rtf', 'odt'];
    let fileExtention = file.split('.');
    fileExtention = fileExtention[fileExtention.length - 1];
    this.invalidFile = false;
    if (accetpableFile.indexOf(fileExtention.toLowerCase()) == -1) {
      this.invalidFile = true;
      return true;
    } else {
      this.invalidFile = false;
      return false;
    }

  }
  getRangeSliderValue(event) {
    this.contractor_rate_min = event.from;
    this.contractor_rate_max = event.to;
  }


  getContractorServices() {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/cont_services";
    var inputJson = {
      "email": "test@gmail.com",
      "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"
    }
    this._commonRequestService.getData(url).subscribe(
      data => {
        console.log("categoryData", data.data)
        this.categoryData = data.data;

      }
    );
  }


  getSelecetdContractorServices() {
    var selectedArray = [];
    for (var i = 0; i < this.categoryData.length; i++) {
      if (this.categoryData[i].checked) {
        selectedArray.push(this.categoryData[i].id.toString())
      }
    }
    console.log("selectedArray", selectedArray);
    return selectedArray;
  }

  selectSkill() {
    if (this.selectedSkill) {

      this.selectedSkillObject = this.getSkillObjectById(this.selectedSkill);
      this.addSkill();
    }

  }

  addSkill() {
    if (this.selectedSkillObject && this.selectedSkillArray.indexOf(this.selectedSkillObject) == -1) {
      this.selectedSkillIdArray.push(this.selectedSkillObject.skill_id.toString())
      this.selectedSkillArray.push(this.selectedSkillObject);
      this.selectedSkill = "";
    }

  }

  removeSelectedSkill(index) {
    this.selectedSkillArray.splice(index, 1);
  }

  getSkillObjectById(skill_id) {
    for (var i = 0; i < this.skillData.length; i++) {
      if (this.skillData[i].skill_id == skill_id) {
        return this.skillData[i];
      }
    }
  }
  clickTermsUse() {
    this._router.navigate(['../terms_use'], { relativeTo: this._routes });
  }

  getNoticePeriodData() {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/notice_period";
    this._commonRequestService.getData(url).subscribe(
      data => {
        this.noticePeriodList = data.data;

      }
    );
  }

  rateChange(event) {
    this.contractor_rate_min = event.from;
    this.contractor_rate_max = event.to;
  }

  getLocation() {
    this.postalCodeInvalid = false;
    this.contractorInvalid = false;
    if (this.contractor_post_code) {
      let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.contractor_post_code + "&key=AIzaSyCcc7ZyRGjRbAuDgsLSQGdTuFxvLW9FGiI&components=country:GB"
      this._commonRequestService.getData(url)
        .subscribe(data => {
          if (data && data.results && data.status == 'OK') {
            if (data.results[0].formatted_address !== 'United Kingdom') {
              let place = data.results[0];
              // let locationJson = {
              //   "postcode" : this.contractor_post_code,
                 //,
              //   "city" :  data.results[0].address_components.filter(item=>{
              //     return item.types.indexOf('postal_town') > -1
              //   })
              // }
              this.marker  = place.geometry.location;

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


              console.log(this.postcode);
              console.log(this.displayTown);
              console.log(this.displayCountry);
              console.log(this.displayLocationName);
              console.log(this.marker);


              //console.log("locationJson", locationJson);
            } else {
              this.postalCodeInvalid = true;
              this.contractorInvalid = true;
            }
          } else {
            this.postalCodeInvalid = true;
            this.contractorInvalid = true;
          }
        })
    }

  }

  serviceChange(category) {
    if (category.name === 'NONE OF THE ABOVE') {
      this.categoryData = this.categoryData.filter(item => {
        item.checked = false;
        return item;
      })
    } else {
      this.categoryData = this.categoryData.filter(item => {
        if (item.name === 'NONE OF THE ABOVE') {
          item.checked = false;
        }
        return item;
      })
    }
    category.checked = !category.checked;
  }


  skillKeyUp(event) {
    if (event.keyCode === 188) {
      if (this.skill.split(',')[0] && this.selectedSkillArray.indexOf(this.skill.split(',')[0]) == -1) {
        this.selectedSkillArray.push(this.skill.split(',')[0])
      }
      this.skill = "";


    }
  }

  chooseFromDropBox(){
//     let dropbox = new Dropbox({})
//    let options = {

//     // Required. Called when a user selects an item in the Chooser.
//     success: function(files) {
//         alert("Here's the file link: " + files[0].link)
//     },

//     // Optional. Called when the user closes the dialog without selecting a file
//     // and does not include any parameters.
//     cancel: function() {

//     },

//     // Optional. "preview" (default) is a preview link to the document for sharing,
//     // "direct" is an expiring link to download the contents of the file. For more
//     // information about link types, see Link types below.
//     linkType: "preview", // or "direct"

//     // Optional. A value of false (default) limits selection to a single file, while
//     // true enables multiple file selection.
//     multiselect: false, // or true

//     // Optional. This is a list of file extensions. If specified, the user will
//     // only be able to select files with these extensions. You may also specify
//     // file types, such as "video" or "images" in the list. For more information,
//     // see File types below. By default, all extensions are allowed.
//     extensions: ['.pdf', '.doc', '.docx'],
// };


//     Dropbox.choose(options);

   // let dbx = new Dropbox({accessToken: 'sp6wj9n6kf6r0ma'})
  }




}
