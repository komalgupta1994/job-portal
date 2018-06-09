import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
declare var google: any;
declare var $: any;
@Component({
  selector: 'app-contractor-profile',
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.css']
})
export class ContractorProfileComponent implements OnInit {
  lat;
  lng;
  polygonPath = [];
  selectedSkill;
  selectedSkillArray = [];
  selectedSkillObject;
  profileUrl: string;
  userName: string;
  emailAddress;
  securityClearance = 0;
  euDrivingLicence = 1;
  postCode = "";
  dayRate1 = 0;
  dayRate2 = 0;
  availability: string = "";
  webAddress: string = "";
  stackOverWebAdd: string = "";
  gitHubWebAdd: string = "";
  linkedinWebAdd: string = "";
  behanceWebAdd: string = "";
  preferredJobTitle: string = "";
  commutableValue: number;
  rate1; dataUrl;
  skillData;
  rate2;
  dailyHourlyValue = "daily";
  profileData;
  currentJobTitle: string = "";
  summary: string = "";
  certification: string = "";
  qualification: string = "";
  preferredJobTitleValue: string;
  commutable;
  currentPassword;
  newPassword;
  fileUploadForCV;
  fileUploadForCover;
  confirmNewPassword; contractorProfileJson; inputUrl; responseData; succesMessageFlag = false; fileUpload; industrySector;
  ErrorMesageFlag = false;
  fd;
  imageFile;
  CVFile;
  coverLetterFile;
  contratorCVList = [{ id: 0 }];
  coverLetterList = [{ id: 1 }];
  industrySectorData = [];
  securityClearenceData = [];
  uploadedCvArray = [];
  uploadedCoverLetter = [];
  successMsg = "";
  errorMsg = "";
  preferredJobTitleFlag = false;
  cropperSettings;
  data;
  @ViewChild('cropper') cropperEle;
  fileName;
  contractor_daily_hourly_value_relocatable = "daily";
  rate_min_commutable;
  rate_min_hr;
  contractor_rate_min_relocatable;
  contractor_rate_min_relocatable_hr;
  rate_max_commutable;
  rate_max_hr;
  contractor_rate_max_relocatable;
  contractor_rate_max_relocatable_hr;
  commutabledailyHourlyValue;
  polygon1;
  polygon2;
  map;
  drawingManager1: any;
  drawingManager2: any;
  commutablePolygun = [];
  relocateablePolygun = [];
  commutablePolygonInst;
  relocatablePolygonInst;
  display_town;
  display_county;
  display_name;
  constructor(public _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
    this.getKeySkillData();
    this.getIndustrySector();
    this.getSecurityClearenceData();
    this.getProfileDta();
    window.scroll(0, 0);
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 280;
    this.cropperSettings.height = 250;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 330;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.noFileInput = true;
    this.data = {};

  }

  ngAfterViewInit() {
    window.scroll(0, 0);
  }


  drawPloygon() {
    if (this.commutable == 'commutable') {

      if (this.commutablePolygun && this.commutablePolygun.length == 0) {
        this.drawingManager1 = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          polygonOptions: this.polygon1,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: []

          }

        });

        this.drawingManager1.setMap(this.map);
        let that = this;
        google.maps.event.addListener(this.drawingManager1, 'polygoncomplete', function(polygon) {
          for (var i = 0; i < polygon.getPath().getLength(); i++) {
            that.commutablePolygun.push({ 'lat': Number(polygon.getPath().getAt(i).toUrlValue(6).split(',')[0]), 'lng': Number(polygon.getPath().getAt(i).toUrlValue(6).split(',')[1]) });
          }
          console.log(that.commutablePolygun);
          that.commutablePolygonInst = polygon;
          that.drawingManager1.setMap(null);
        });
      } else {
        alert("you can draw only one map")
      }
    } else {
      if (this.relocateablePolygun && this.relocateablePolygun.length == 0) {
        this.drawingManager2 = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          polygonOptions: this.polygon2,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon']

          }
        });
        this.drawingManager2.setMap(this.map);
        let that = this;
        google.maps.event.addListener(this.drawingManager2, 'polygoncomplete', function(polygon) {
          for (var i = 0; i < polygon.getPath().getLength(); i++) {
            that.relocateablePolygun.push({ 'lat': Number(polygon.getPath().getAt(i).toUrlValue(6).split(',')[0]), 'lng': Number(polygon.getPath().getAt(i).toUrlValue(6).split(',')[1]) });
          }

          console.log(that.relocateablePolygun);
          that.relocatablePolygonInst = polygon;
          that.drawingManager2.setMap(null);
        });
      } else {
        alert("you can draw only one map")
      }


    }
  }


  editPolygun() {
    if (this.commutable == 'commutable' && this.commutablePolygonInst) {
      this.commutablePolygonInst.setEditable(true);
      this.relocatablePolygonInst.setEditable(false);
      let that = this;
      google.maps.event.addListener(this.commutablePolygonInst.getPath(), 'insert_at', function(index, obj) {
        that.commutablePolygun = [];
        for (var i = 0; i < that.commutablePolygonInst.getPath().getLength(); i++) {
          that.commutablePolygun.push({ 'lat': Number(that.commutablePolygonInst.getPath().getAt(i).toUrlValue(6).split(',')[0]), 'lng': Number(that.commutablePolygonInst.getPath().getAt(i).toUrlValue(6).split(',')[1]) });
        }

      });
      google.maps.event.addListener(this.commutablePolygonInst.getPath(), 'set_at', function(index, obj) {
        that.commutablePolygun = [];
        for (var i = 0; i < that.commutablePolygonInst.getPath().getLength(); i++) {
          that.commutablePolygun.push({ 'lat': Number(that.commutablePolygonInst.getPath().getAt(i).toUrlValue(6).split(',')[0]), 'lng': Number(that.commutablePolygonInst.getPath().getAt(i).toUrlValue(6).split(',')[1]) });
        }

      });
    } else if (this.commutable == 'relocatable' && this.relocatablePolygonInst) {
      this.commutablePolygonInst.setEditable(false);
      this.relocatablePolygonInst.setEditable(true);
      let that = this;
      google.maps.event.addListener(this.relocatablePolygonInst.getPath(), 'insert_at', function(index, obj) {
        that.relocateablePolygun = [];
        for (var i = 0; i < that.relocatablePolygonInst.getPath().getLength(); i++) {
          that.relocateablePolygun.push({ 'lat': Number(that.relocatablePolygonInst.getPath().getAt(i).toUrlValue(6).split(',')[0]), 'lng': Number(that.relocatablePolygonInst.getPath().getAt(i).toUrlValue(6).split(',')[1]) });
        }

      });
      google.maps.event.addListener(this.relocatablePolygonInst.getPath(), 'set_at', function(index, obj) {
        that.relocateablePolygun = [];
        for (var i = 0; i < that.relocatablePolygonInst.getPath().getLength(); i++) {
          that.relocateablePolygun.push({ 'lat': Number(that.relocatablePolygonInst.getPath().getAt(i).toUrlValue(6).split(',')[0]), 'lng': Number(that.relocatablePolygonInst.getPath().getAt(i).toUrlValue(6).split(',')[1]) });
        }

      });
    }
  }

  drawExistingMap() {
    if (this.commutablePolygun && this.commutablePolygun.length > 0) {
      this.commutablePolygonInst = new google.maps.Polygon({
        paths: this.commutablePolygun,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#ff0066",
        strokeColor: "#ff6bcd",
        fillOpacity: 0.35
      });
      this.commutablePolygonInst.setMap(this.map);
    }

    if (this.relocateablePolygun && this.relocateablePolygun.length > 0) {
      this.relocatablePolygonInst = new google.maps.Polygon({
        paths: this.relocateablePolygun,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#00ccff",
        strokeColor: "#09e4f9",
        fillOpacity: 0.35
      });
      this.relocatablePolygonInst.setMap(this.map);
    }
  }


  contractorImageFileChangeEvent(fileInput: any) {
    var reader = new FileReader();
    var image = new Image();
    var that = this;
    reader.onloadend = (loadEvent: any) => {
      this.profileUrl = reader.result;
      image.src = loadEvent.target.result;
      that.cropperEle.setImage(image);
      document.querySelector('.profile_image').classList.add('toggle_block');
    }

    this.imageFile = fileInput.target.files[0];
    this.fileName = this.imageFile.name;
    reader.readAsDataURL(this.imageFile);
  }
  contractorCoverLetterFileChangeEvent(fileInput: any) {
    this.coverLetterFile = fileInput.target.files[0];
    this.uploadedCoverLetter.push(this.coverLetterFile);
  }

  contractorCVFileChangeEvent(fileInput) {
    this.CVFile = fileInput.target.files[0];

    this.uploadedCvArray.push(this.CVFile);
  }

  saveContractorProfile(form: NgForm) {
    if (form.valid) {
      this.fd = new FormData();
      this.fd.append('loginToken', (localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem('loginDetail')).token) ? JSON.parse(localStorage.getItem('loginDetail')).token : "nsakdlallas1232mk123b2k1390iq2ekq");
      this.fd.append('email', (localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem('loginDetail')).email) ? JSON.parse(localStorage.getItem('loginDetail')).email : "test@gmail.com");
      this.fd.append('contractorProfileUrl', this.imageFile);
      this.fd.append('userName', this.userName);
      this.fd.append('emailAddress', this.emailAddress);
      this.fd.append('securityClearance', this.securityClearance);
      this.fd.append('euDrivingLicence', this.euDrivingLicence);
      this.fd.append('postCode', this.postCode);
      this.fd.append('dayRate_min', this.dayRate1 ? this.dayRate1 : 0);
      this.fd.append('dayRate_max', this.dayRate2 ? this.dayRate2 : 0);
      this.fd.append('availability', this.availability);
      this.fd.append('webAddress', this.webAddress);
      this.fd.append('stackOverWebAddress', this.stackOverWebAdd);
      this.fd.append('gitHubWebAddress', this.gitHubWebAdd);
      this.fd.append('linkedinWebAddress', this.linkedinWebAdd);
      this.fd.append('behanceWebAddress', this.behanceWebAdd);

      this.fd.append('yourPreferredJobTitle', this.preferredJobTitleValue);

      this.fd.append('commutable', this.commutable);


      this.fd.append('rate_min', this.rate_min_commutable || "");
      this.fd.append('rate_max', this.rate_max_commutable || "");

      this.fd.append('contractor_rate_min_relocatable', this.contractor_rate_min_relocatable || "");
      this.fd.append('contractor_rate_max_relocatable', this.contractor_rate_max_relocatable || "");
      this.fd.append('contractor_rate_min_hour', this.rate_min_hr || "");
      this.fd.append('contractor_rate_max_hr', this.rate_max_hr || "");
      this.fd.append('contractor_rate_min_relocatable_hr', this.contractor_rate_min_relocatable_hr || "");
      this.fd.append('contractor_rate_max_relocatable_hr', this.contractor_rate_max_relocatable_hr || "");



      this.fd.append('dailyHourlyValue', this.commutabledailyHourlyValue);

      this.fd.append('contractor_daily_hourly_value_relocatable', this.contractor_daily_hourly_value_relocatable);

      this.fd.append('currentJobTitle', this.currentJobTitle);

      this.fd.append('skill&Experience', this.selectedSkillArray.join(','));

      this.fd.append('summary', this.summary);

      this.fd.append('industrySector', JSON.stringify(this.industrySector));

      this.fd.append('certification', this.certification);
      this.fd.append('qualification', this.qualification);
      for (let i = 0; i < this.uploadedCvArray.length; i++) {
        this.fd.append('uploadCV[]', this.uploadedCvArray[i]);
      }

      for (let i = 0; i < this.uploadedCoverLetter.length; i++) {
        this.fd.append('uploadCoverLetter[]', this.uploadedCoverLetter[i]);
      }


      //this.fd.append('uploadCoverLetter',this.coverLetterFile);
      this.fd.append('longitude', this.lat);
      this.fd.append('latitude', this.lng);

      this.fd.append('commutablePolygon', JSON.stringify(this.commutablePolygun));
      this.fd.append('relocatablePolygon', JSON.stringify(this.relocateablePolygun))

      this.inputUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/submit";

      console.log(this.fd);


      this._commonRequestService.postData(this.inputUrl, this.fd).subscribe(
        data => {
          this.responseData = data;
          if (this.responseData.status === "TRUE") {
            this.succesMessageFlag = true;
            this.ErrorMesageFlag = false
            this.profileData = {};
            this.uploadedCvArray = [];
            this.uploadedCoverLetter = [];
            window.scroll(0, 0);
            this.successMsg = 'Profile updated';
            this._router.navigate(['../viewProfile'], { relativeTo: this._routes });
          }
          else {
            this.succesMessageFlag = false;
            this.ErrorMesageFlag = true;
            window.scroll(0, 0);
            this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
            // this.responseData.status=""
          }

          // console.log("keySkill: ", this.listSignUpData);
        }
      );
    } else {
      window.scroll(0, 0);
    }


  }

  accountDetailsSave() {
    // alert(121)
    var accountJson = {
      "email": "you@gmail.com",
      "loginToken": "$2y$10$1T6dX9rw93MoWgTKQmyNSeiyR43jwrXvOdFHYcWuXLD9oASXEx8vi",
      'newPassword': this.newPassword,
      "oldPassword": this.currentPassword,
      'confirmPassword': this.confirmNewPassword
    }
    this.inputUrl = " http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/password";
    this._commonRequestService.postData(this.inputUrl, accountJson).subscribe(
      data => {
        this.responseData = data;
        if (this.responseData.status === "TRUE") {
          this.succesMessageFlag = true;
          this.ErrorMesageFlag = false;
          this.successMsg = "Password change";
          this._router.navigate(['../../public/contractorLogin'], { 'relativeTo': this._routes });

        }
        else {
          this.succesMessageFlag = false;
          this.ErrorMesageFlag = true;
          this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
          window.scroll(0, 0);


        }


      }
    );
  }


  getKeySkillData() {
    this.dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/contractre/skillist";
    this._commonRequestService.getData(this.dataUrl).subscribe(
      data => {
        this.skillData = data.data;

      }
    );


  }

  selectSkill() {
    if (this.selectedSkill) {
      this.selectedSkillObject = this.getSkillObjectById(this.selectedSkill);
    }

  }

  addSkill(event) {

    if (event.keyCode === 188) {
      if (this.selectedSkill.split(',')[0] && this.selectedSkill.split(',')[0].trim() && this.selectedSkillArray.indexOf(this.selectedSkill.split(',')[0]) == -1) {
        this.selectedSkillArray.push(this.selectedSkill.split(',')[0].trim())
      }
      this.selectedSkill = "";
      //this.selectedSkillArray = this.skill.split(',')[0];
      // for(let i=this.selectedSkillArray.length-1; i>=0; i--){
      //   if(this.selectedSkillArray[i] === ''){
      //   this.selectedSkillArray.splice(i, 1);
      //   this.skill;
      // }
      // }

    }

    // if (this.selectedSkillObject && this.selectedSkillArray.indexOf(this.selectedSkillObject) == -1) {
    //   this.selectedSkillArray.push(this.selectedSkillObject);
    //   this.selectedSkill = "";
    // }

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


  getProfileDta() {
    this.profileData = this._commonRequestService.getDataWithoutObserval('contractorProfileData');
    if (this.profileData) {
      this.setProfileData()
    } else {
      var inputJson = {
        "email": "johnsmith21@gmail.com",
        "loginToken": "$2y$10$Wbps5L/ERbs.7sdCm.tAoO4tNWY6At/JtAibo6FhsoICKXUy4q7OS"
      }
      let dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/view";
      this._commonRequestService.postData(dataUrl, inputJson).subscribe(
        data => {
          console.log("profiledtaa", data.data)
          this.profileData = data.data;
          this.setProfileData();

          // this.drawExistingMap()
          this._commonRequestService.setDataWithoutObserval(this.profileData, "contractorProfileData")
        }
      );
    }
  }





  initializeMap() {
    this.polygon1 = {
      draggable: false,
      editable: false,
      fillColor: "#ff0066",
      strokeColor: "#ff6bcd"
    };

    this.polygon2 = {
      draggable: false,
      editable: false,
      fillColor: "#00ccff",
      strokeColor: "#09e4f9"
    };

    this.map = new google.maps.Map(document.getElementById('profileMap'), {
      center: { lat: this.lat, lng: this.lng },
      zoom: 10
    });

    var marker = new google.maps.Marker({
      position: { lat: this.lat, lng: this.lng }
    });
    marker.setMap(this.map);
    this.drawExistingMap();


  }


  setProfileData() {
    this.userName = this.profileData.userName;
    this.profileUrl = this.profileData && this.profileData.contractorProfileUrl[0] ? this.profileData.contractorProfileUrl[0].attachment_url + '/' + this.profileData.contractorProfileUrl[0].attachment_name : "";
    this.emailAddress = this.profileData.emailAddress;
    this.securityClearance = this.profileData.securityClearance ? this.profileData.securityClearance : 0;
    this.euDrivingLicence = this.profileData.euDrivingLicence;
    this.postCode = this.profileData.postcode && this.profileData.postcode !== 'null' ? this.profileData.postcode : '';
    this.dayRate1 = this.profileData.dayRate_min && this.profileData.dayRate_min !== 'null' ? this.profileData.dayRate_min : '';
    this.dayRate2 = this.profileData.dayRate_max && this.profileData.dayRate_max !== 'null' ? this.profileData.dayRate_max : '';
    this.availability = this.profileData.availability && this.profileData.availability !== 'null' ? this.profileData.availability : '';
    this.webAddress = this.profileData.webAddress && this.profileData.webAddress !== 'null' ? this.profileData.webAddress : '';
    this.stackOverWebAdd = this.profileData.stackOverWebAddress && this.profileData.stackOverWebAddress !== 'null' ? this.profileData.stackOverWebAddress : '';
    this.gitHubWebAdd = this.profileData.gitHubWebAddress && this.profileData.gitHubWebAddress !== 'null' ? this.profileData.gitHubWebAddress : '';
    this.linkedinWebAdd = this.profileData.linkedinWebAddress && this.profileData.linkedinWebAddress !== 'null' ? this.profileData.linkedinWebAddress : '';
    this.behanceWebAdd = this.profileData.behanceWebAddress && this.profileData.behanceWebAddress !== 'null' ? this.profileData.behanceWebAddress : '';
    this.preferredJobTitleValue = this.profileData.yourPreferredJobTitle && this.profileData.yourPreferredJobTitle !== 'null' ? this.profileData.yourPreferredJobTitle : '';
    //this.commutable = this.profileData.commutable && (this.profileData.commutable == 'commutable' || this.profileData.commutable == 'relocatable') ? this.profileData.commutable : 'commutable';
    this.commutable = "commutable";
    this.rate1 = this.profileData.rate_min;
    this.rate2 = this.profileData.rate_max;
    this.dailyHourlyValue = 'daily';
    this.commutabledailyHourlyValue = "daily";
    this.rate_min_commutable = this.rate1;
    this.rate_max_commutable = this.rate2;
    this.rate_min_hr = this.profileData.contractor_rate_min_hour;
    this.rate_max_hr = this.profileData.contractor_rate_max_hr;

    this.commutablePolygun = this.profileData.commutablePolygon ? JSON.parse(this.profileData.commutablePolygon) : [],
      this.relocateablePolygun = this.profileData.relocatablePolygon ? JSON.parse(this.profileData.relocatablePolygon) : [],

      this.contractor_rate_min_relocatable = this.profileData.contractor_rate_min_relocatable;
    this.contractor_rate_min_relocatable_hr = this.profileData.contractor_rate_min_relocatable_hr;
    this.contractor_rate_max_relocatable = this.profileData.contractor_rate_max_relocatable;
    this.contractor_rate_max_relocatable_hr = this.profileData.contractor_rate_max_relocatable_hr;

    //this.dailyHourlyValue = this.profileData.dailyHourlyValue ? this.profileData.dailyHourlyValue : 'daily';
    this.currentJobTitle = this.profileData.currentJobTitle && this.profileData.currentJobTitle !== 'null' ? this.profileData.currentJobTitle : '';
    this.summary = this.profileData.summary && this.profileData.summary !== 'null' ? this.profileData.summary : '';
    this.certification = this.profileData.certification && this.profileData.certification !== 'null' ? this.profileData.certification : '';
    this.qualification = this.profileData.qualification && this.profileData.qualification !== 'null' ? this.profileData.qualification : '';
    this.contratorCVList = (this.profileData.uploadCV && this.profileData.uploadCV.length > 0) ? this.profileData.uploadCV : this.contratorCVList;
    this.coverLetterList = (this.profileData.uploadCoverLetter && this.profileData.uploadCoverLetter.length > 0) ? this.profileData.uploadCoverLetter : this.coverLetterList;
    this.industrySector = this.profileData.industrySector;
    this.selectedSkillArray = this.profileData['skill&Experience'].split(',');
    this.lat = Number(this.profileData.latitude);
    this.lng = Number(this.profileData.longitude);
    this.display_town = this.profileData.display_town;
    this.display_county = this.profileData.display_county;
    this.display_name = this.profileData.display_name;
    this.initializeMap();

  }


  fileChangeEvent(fileInput: any) {
    var reader = new FileReader();
    var readerByte = new FileReader();
    this.fileUploadForCV = fileInput.target.files[0];
    this.fileUploadForCover = fileInput.target.files[0];
    // this.fileUpload =fileInput.target.files[0];
    reader.readAsDataURL(fileInput.target.files[0]);
    console.log(this.fileUploadForCV, this.fileUploadForCover, "file_select2")


  }

  addAnotherCV() {
    this.contratorCVList.push({ id: this.contratorCVList.length + 1 })
  }

  removeElement(array, index) {
    let dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/remove_attachment";
    let input = {
      "email": "john@gmail.com",
      "loginToken": "sdkndjhaKHK68768khkhYjU",
      "attachment_id": array[index].attachment_relation
    }
    this._commonRequestService.postData(dataUrl, input).subscribe(
      data => {
        console.log(data.data);
      }
    )
    array.splice(index, 1);

  }

  addAnotherCoverLetter() {
    this.coverLetterList.push({ id: this.coverLetterList.length + 1 })
  }

  getIndustrySector() {
    this.dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
    this._commonRequestService.getData(this.dataUrl).subscribe(
      data => {
        this.industrySectorData = data.data;

      }
    );
  }

  getSecurityClearenceData() {
    this.dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/security_clearance";
    this._commonRequestService.getData(this.dataUrl).subscribe(
      data => {
        this.securityClearenceData = data.data;

      }
    );
  }


  closeAccount() {
    let input = {
      "email": "test@gmail.com",
      "loginToken": "ndckajs546JGkknk"
    }


    let dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/account_close";
    this._commonRequestService.postData(dataUrl, input).subscribe(
      data => {
        if (data.status === "TRUE") {
          this._router.navigate(['../../public/contractorSignup'], { 'relativeTo': this._routes });
        }
        else {
          this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;;
          this.ErrorMesageFlag = true;
          window.scroll(0, 0);
        }
      }
    );

  }

  savePreferredJobTitle() {
    this.preferredJobTitleFlag = false;
    if (this.preferredJobTitle) {
      let input = {
        "email": "test@gmail.com",
        "loginToken": "ndckajs546JGkknk",
        "yourPreferredJobTitle": this.preferredJobTitle
      }


      let dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/preferred_job_title";
      this._commonRequestService.postData(dataUrl, input).subscribe(
        data => {
          if (data.status === "TRUE") {
            this.preferredJobTitle = "";
            this.successMsg = "Preferred job saved";
            this.succesMessageFlag = true;
            window.scroll(0, 0);
          } else {
            this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;;
            this.ErrorMesageFlag = true;
            window.scroll(0, 0);
          }

        }
      );
    } else {
      this.preferredJobTitleFlag = true;
    }

  }

  editcv(index) {
    this.contratorCVList[index] = { 'id': index + 1 }
  }

  editCover(index) {
    this.coverLetterList[index] = { 'id': index + 1 }
  }

  applyCrop() {
    this.profileUrl = this.data.image;
    let croppedImage = this.data.image;
    document.querySelector('.profile_image').classList.remove('toggle_block');
    this.imageFile;
    let block = croppedImage.split(";");
    let contentType = block[0].split(":")[1];
    let realData = block[1].split(",")[1];
    let blob = this.b64toBlob(realData, contentType, 256);
    this.imageFile = new File([blob], this.fileName);
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  minRateKeyup() {
    if (this.commutable == 'commutable' && this.dailyHourlyValue == 'daily') {
      this.rate_min_commutable = this.rate1;
    } else if (this.commutable == 'commutable' && this.dailyHourlyValue == 'hourly') {
      this.rate_min_hr = this.rate1;
    } else if (this.commutable == 'relocatable' && this.dailyHourlyValue == 'daily') {
      this.contractor_rate_min_relocatable = this.rate1;
    } else {
      this.contractor_rate_min_relocatable_hr = this.rate1;
    }
  }

  maxRateKeyup() {
    if (this.commutable == 'commutable' && this.dailyHourlyValue == 'daily') {
      this.rate_max_commutable = this.rate2;
    } else if (this.commutable == 'commutable' && this.dailyHourlyValue == 'hourly') {
      this.rate_max_hr = this.rate2;
    } else if (this.commutable == 'relocatable' && this.dailyHourlyValue == 'daily') {
      this.contractor_rate_max_relocatable = this.rate2;
    } else {
      this.contractor_rate_max_relocatable_hr = this.rate2;
    }
  }


  changeRateType() {
    if (this.dailyHourlyValue == 'daily') {
      this.rate1 = this.commutable == 'commutable' ? this.profileData.rate_min : this.profileData.contractor_rate_min_relocatable;
      this.rate2 = this.commutable == 'commutable' ? this.profileData.rate_max : this.profileData.contractor_rate_max_relocatable;
    } else {
      this.rate1 = this.commutable == 'commutable' ? this.profileData.contractor_rate_min_hour : this.profileData.contractor_rate_min_relocatable_hr;
      this.rate2 = this.commutable == 'commutable' ? this.profileData.contractor_rate_max_hr : this.profileData.contractor_rate_max_relocatable_hr;
    }

    if (this.commutable == 'commutable') {
      this.commutabledailyHourlyValue = this.dailyHourlyValue
    } else {
      this.contractor_daily_hourly_value_relocatable = this.dailyHourlyValue;
    }
  }


  changeRelocatable() {
    if (this.commutable == 'commutable') {
      this.rate1 = this.dailyHourlyValue == 'daily' ? this.profileData.rate_min : this.profileData.contractor_rate_min_hour;
      this.rate2 = this.dailyHourlyValue == 'daily' ? this.profileData.rate_max : this.profileData.contractor_rate_max_hr;
    } else {
      this.rate1 = this.dailyHourlyValue == 'daily' ? this.profileData.contractor_rate_min_relocatable : this.profileData.contractor_rate_min_relocatable_hr;
      this.rate2 = this.dailyHourlyValue == 'daily' ? this.profileData.contractor_rate_max_relocatable : this.profileData.contractor_rate_max_relocatable_hr;
    }
  }

  closeAccountClick() {
    $('#myModal').modal();
  }
}
