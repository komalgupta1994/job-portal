import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonRequestService } from '../common-request.service';
@Component({
  selector: 'app-contractor-view-profile',
  templateUrl: './contractor-view-profile.component.html',
  styleUrls: ['./contractor-view-profile.component.css']
})
export class ContractorViewProfileComponent implements OnInit {
  profileData;
  industrySectorData = [];
  skillArray = [];
  securityClearenceData;
  lat;
  lng;

  map;
  constructor(public _commonRequestService: CommonRequestService, ) { }

  ngOnInit() {
    this.getSecurityClearenceData();
    this.getIndustrySectorData();
    this.getProfileDta();
  }

  ngAfterViewInit() {
    window.scroll(0, 0);
  }

  getProfileDta() {
    var inputJson = {
      "email": "johnsmith21@gmail.com",
      "loginToken": "$2y$10$Wbps5L/ERbs.7sdCm.tAoO4tNWY6At/JtAibo6FhsoICKXUy4q7OS"
    }
    let dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/view";
    this._commonRequestService.postData(dataUrl, inputJson).subscribe(
      data => {
        console.log("profile", data.data)
        this.profileData = data.data;
        this.skillArray = (this.profileData['skill&Experience']).split(',');
        console.log("this.skillArray", this.skillArray);
        this._commonRequestService.setDataWithoutObserval(this.profileData, "contractorProfileData");
        this.initializeMap()
      }
    );
  }

  initializeMap() {
    this.map = new google.maps.Map(document.getElementById('profilePreviewMap'), {
      center: { lat: Number(this.profileData.latitude), lng: Number(this.profileData.longitude) },
      zoom: 10
    });

    var marker = new google.maps.Marker({
      position: { lat:Number(this.profileData.latitude), lng: Number(this.profileData.longitude) }
    });
    marker.setMap(this.map);
    this.drawExistingMap();
  }


  drawExistingMap() {

    if (this.profileData.commutablePolygon && this.profileData.commutablePolygon.length > 0) {

      let commutablePolygonInst = new google.maps.Polygon({
        paths: JSON.parse(this.profileData.commutablePolygon),
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#ff0066",
        strokeColor: "#ff6bcd",
        fillOpacity: 0.35
      });
      commutablePolygonInst.setMap(this.map);
    }

    if (this.profileData.relocatablePolygon && this.profileData.relocatablePolygon.length > 0) {
      let relocatablePolygonInst = new google.maps.Polygon({
        paths: JSON.parse(this.profileData.relocatablePolygon),
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#00ccff",
        strokeColor: "#09e4f9",
        fillOpacity: 0.35
      });
      relocatablePolygonInst.setMap(this.map);
    }
  }

  getSecurityClearenceData() {
    let URL = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/security_clearance";
    this._commonRequestService.getData(URL).subscribe(
      data => {
        this.securityClearenceData = data.data;

      }
    );
  }

  getSecurityClearnceName(profileData) {
    if (profileData.securityClearance) {
      for (let i = 0; i < this.securityClearenceData.length; i++) {
        if (profileData.securityClearance == this.securityClearenceData[i].id) {
          return this.securityClearenceData[i].name;
        }
      }
      return "";
    }
  }

  getIndustrySectorData() {
    let URL = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
    this._commonRequestService.getData(URL).subscribe(
      data => {
        this.industrySectorData = data.data;

      }
    );
  }

  getIndustrySectorName(industrySector) {
    if (industrySector) {
      for (let i = 0; i < this.industrySectorData.length; i++) {
        if (industrySector == this.industrySectorData[i].id) {
          return this.industrySectorData[i].industry;
        }
      }
      return "";
    }
  }
}
