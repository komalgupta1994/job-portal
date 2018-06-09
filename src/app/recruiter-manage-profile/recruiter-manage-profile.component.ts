import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { CommonRequestService } from '../common-request.service';
import * as jquery from 'jquery';
import { CommonService } from '../commonService.service';

@Component({
  selector: 'app-recruiter-manage-profile',
  templateUrl: './recruiter-manage-profile.component.html',
  styleUrls: ['./recruiter-manage-profile.component.css']
})
export class RecruiterManageProfileComponent implements OnInit {
  recruiterProfileUrl: string;
  companyName: string;
  companySize = "";
  addressName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  postCode;
  telephone = '';
  postalAddressLine1: string;
  postalAddressLine2: string;
  postalCity: string;
  postalCountry: string;
  postalPostCode;
  postalTelephone = '';
  companyDescription: string;
  webAddress;
  emailAddress;
  rssUrl;
  fullUrlRssFeed;
  rssDisplayFeed;
  socialLinkName;
  fullUrlTwitterFeed;
  twitterDisplayFeed;
  linkedinUrl;
  fullUrlLinkedinFeed;
  linkedinDisplayFeed;
  fileArray;profileData;
  inputUrl;
responseData;
succesMessageFlag=false;
ErrorMesageFlag=false;
showMultipleAddress = false;
telephoneValidationFlag = false;
postalTelephoneValidationFlag = false;
otherTelephoneValidationFlag = false;
webAddValidationFlag = false;
emailAddValidationFlag = false;
rssUrlValidationFlag = false;
rssFeedUrlValidationFlag = false;
socialLinkValidationFlag = false;
twitterValidationFlag = false;
linkedinValidationFlag = false;
fullLinkedinValidationFlag = false;
sameAsPerAddFlag = false;
otherAddress =  {
  'addressLine1': '',
  'addressLine2': '',
  'city': '',
  'country': '',
  'postCode': '',
  'telephone': ''
};
profileUrl;
imageFile;
errorMsg = "";
//list = [];
//i = 0;
companySizeArray;
countryValueArray;
companyNameFlag = false;
companySizeFlag = false;
addressNameFlag = false;
addressLine1Flag = false;
addressLine2Flag = false;
cityFlag = false;
countryFlag = false;
postCodeFlag = false;
telephoneFlag = false;
companyDescFlag = false;
companyUrlFlag = false;
companyEmailFlag = false;
allErrorMsgFlag = false;
addMulAddArray = [{'addresslLine1': 'line1', 'addressLine1Name': 'address1', 'addressLine2': 'line2', 'addressLine2Name': 'address2', 'city': 'city', 'cityName': 'cityN', 'country': 'cou', 'countryName': 'country1', 'postCode': '12', 'postName': 'postN', 'telephone': '134', 'telephone1': 'teleP'}]
addMulSocialArray = [{'otherSocialLink': '', 'otherSocialFeed': '', 'otherRadio': '', 'otherName':''}];
fd;
companyEditableId;
WSErrorMsg = "";
  constructor(public _commonRequestService: CommonRequestService, private commonService: CommonService) {
    this.addMulAddArray.splice(0,1);
    this.addMulSocialArray.splice(0,1);
   }

  ngOnInit() {
    this.companySizeList();
    this.countryList();
    this.getProfileDta()
    let localStorageData = localStorage.getItem("loginDetail") ?  JSON.parse(localStorage.getItem("loginDetail")) : ""; 
    this.companyEditableId = localStorageData.isCompanyEditable;
  }

  companySizeList() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/company_sizes";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("company size--", data);
          if(data && data.status == 'TRUE') {
            this.companySizeArray = data.data;
          } else if(data && data.status == 'FALSE'){
             this.commonService.goToRecruiterLogin(data);
           }
          //this.recruiterNameArray = data.data;
        }
    );
  }

  countryList() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/nationalities";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("country size--", data);
          if(data && data.status == 'TRUE') {
            this.countryValueArray = data.data;
          } else if(data && data.status == 'FALSE'){
             this.commonService.goToRecruiterLogin(data);
           }
          //this.recruiterNameArray = data.data;
        }
    );
  }

  addMultiplePhone() {
    // this.i++;
    // this.list.push(this.i);
    // console.log("this.list--", this.list);
    var newItem = this.addMulAddArray.length + 1;
    console.log("this.addMulAddArray before", this.addMulAddArray)
    this.addMulAddArray.push({'addresslLine1': '', 'addressLine1Name': 'address1'+newItem, 'addressLine2': '', 'addressLine2Name': 'address2'+newItem, 'city': '', 'cityName': 'cityN'+newItem, 'country': '', 'countryName': 'country1'+newItem, 'postCode': '', 'postName': 'postN'+newItem, 'telephone': '', 'telephone1': 'teleP'+newItem})
    //newItem + 1;
    //this.showMultipleAddress = true;
    console.log("this.addMulAddArray afetr", this.addMulAddArray)
  }

  addAnotherSocialLink() {
    var newItem = this.addMulSocialArray.length + 1;
    console.log("this.addMulAddArray before", this.addMulSocialArray);
    this.addMulSocialArray.push({'otherSocialLink': '', 'otherSocialFeed': '', 'otherRadio': '', 'otherName': 'other'+newItem});
  }

  removeFunction(myObjects,prop,valu){
     return myObjects.filter(function (val) {
          return val[prop] !== valu;
      });
    }

  removeAddress(value) {
    console.log("value--", value);
    console.log("this.addMulAddArray", this.addMulAddArray)
    this.addMulAddArray = this.removeFunction(this.addMulAddArray,"addressLine1Name",value.addressLine1Name);
  }

  removeSocialLink(value) {
    console.log("value--", value);
    console.log("this.addMulSocialArray", this.addMulSocialArray)
    this.addMulSocialArray = this.removeFunction(this.addMulSocialArray,"otherName",value.otherName);
  }

  samePermanentAdd() {
    if(this.sameAsPerAddFlag) {
      this.postalAddressLine1 = this.addressLine1;
      this.postalAddressLine2 = this.addressLine2;
      this.postalCity = this.city;
      this.postalCountry = this.country;
      this.postalPostCode = this.postCode;
      this.postalTelephone = this.telephone;
    } else {
      this.postalAddressLine1 = '';
      this.postalAddressLine2 = '';
      this.postalCity = '';
      this.postalCountry = '';
      this.postalPostCode = '';
      this.postalTelephone = '';
    }
  }

   recruiterFileChangeEvent(fileInput: any) {
    //  var reader = new FileReader();
    // var readerByte = new FileReader();
    // reader.readAsDataURL(fileInput.target.files[0]);
    // reader.onload = (event:any) => {
    //   var arrayBuffer = reader.result;
    //   this.recruiterProfileUrl = arrayBuffer;
    // }
    // readerByte.onload = (event:any) => {
    //   var arrayBuffer = readerByte.result;  
    //   var fileBytes = new Uint8Array(arrayBuffer);
    //   this.fileArray = fileBytes;     
    // }
    // readerByte.readAsArrayBuffer(fileInput.target.files[0]);

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.profileUrl = reader.result;
    }
    this.imageFile = fileInput.target.files[0];
    reader.readAsDataURL(this.imageFile);
    console.log("this.imageFile", this.imageFile);
  }

  // telephoneValidation(value) {
  //   if(!value.match(/^\d{10}$/)) {
  //     this.telephoneValidationFlag = true;
  //   } else {
  //     this.telephoneValidationFlag = false;
  //   }
  // }

  postalTelephoneValidation(value) {
    if(!value.match(/^\d{10}$/)) {
      this.postalTelephoneValidationFlag = true;
    } else {
      this.postalTelephoneValidationFlag = false;
    }
  }

  otherTelephoneValidation(value) {
    console.log("value", value);
    if(!value.match(/^\d{10}$/)) {
      this.otherTelephoneValidationFlag = true;
    } else {
      this.otherTelephoneValidationFlag = false;
    }
  }

  // webAddressValidation(value) {
  //   if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
  //     this.webAddValidationFlag = true;
  //   } else {
  //     this.webAddValidationFlag = false;
  //   }
  // }

  // emailAddressValidation(value) {
  //   if(!value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
  //     this.emailAddValidationFlag = true;
  //   } else {
  //     this.emailAddValidationFlag = false;
  //   }
  // }

  rssUrlValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.rssUrlValidationFlag = true;
    } else {
      this.rssUrlValidationFlag = false;
    }
  }

  rssFeedUrlValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.rssFeedUrlValidationFlag = true;
    } else {
      this.rssFeedUrlValidationFlag = false;
    }
  }

  socialLinkValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.socialLinkValidationFlag = true;
    } else {
      this.socialLinkValidationFlag = false;
    }
  }

  twitterValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.twitterValidationFlag = true;
    } else {
      this.twitterValidationFlag = false;
    }
  }

  linkedinValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.linkedinValidationFlag = true;
    } else {
      this.linkedinValidationFlag = false;
    }
  }

  linkedinFeedValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.fullLinkedinValidationFlag = true;
    } else {
      this.fullLinkedinValidationFlag = false;
    }
  }

  saveRecruiterProfile(form : NgForm) {
    this.WSErrorMsg = "";
    window.scroll(0,0);
    if(this.emailAddress) {
      this.companyEmailFlag = false;
    } else {
      this.companyEmailFlag = true;
    }

    if(this.emailAddress) {
      if(!this.emailAddress.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
        this.emailAddValidationFlag = true;
      } else {
        this.emailAddValidationFlag = false;
      }
    }

    if(this.telephone) {
      if(this.telephone.match(/^[0]\d{10}$/) || this.telephone.match(/^\d{10}$/)) {
        this.telephoneValidationFlag = false;
      } else {
        this.telephoneValidationFlag = true;
      }
    }

    if(this.webAddress) {
      this.companyUrlFlag = false;
    } else {
      this.companyUrlFlag = true;
    }

    if(this.webAddress) {
      if(!this.webAddress.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
        this.webAddValidationFlag = true;
      } else {
        this.webAddValidationFlag = false;
      }
    }

    if(this.companyDescription) {
      this.companyDescFlag = false;
    } else {
      this.companyDescFlag = true;
    }

    if(this.telephone) {
      this.telephoneFlag = false;
    } else {
      this.telephoneFlag = true;
    }

    if(this.addressLine2) {
      this.addressLine2Flag = false;
    } else {
      this.addressLine2Flag = true;
    }

    if(this.postCode) {
      this.postCodeFlag = false;
    } else {
      this.postCodeFlag = true;
    }

    if(this.country) {
      this.countryFlag = false;
    } else {
      this.countryFlag = true;
    }

    if(this.city) {
      this.cityFlag = false;
    } else {
      this.cityFlag = true;
    }

    if(this.addressLine1) {
      this.addressLine1Flag = false;
    } else {
      this.addressLine1Flag = true;
    }

    if(this.companyName) {
      this.companyNameFlag = false;
    } else {
      this.companyNameFlag = true;
    }

    if(this.companySize !== "") {
      this.companySizeFlag = false;
    } else {
      this.companySizeFlag = true;
    }

    if(this.addressName) {
      this.addressNameFlag = false;
    } else {
      this.addressNameFlag = true;
    }

    var otherSocial = {}, otherAdd = {};
  //  alert(4)
  this.fd = new FormData();
  
  if(this.companyNameFlag || this.companySizeFlag || this.addressNameFlag || this.addressLine1Flag 
    || this.addressLine2Flag || this.cityFlag || this.countryFlag || this.postCodeFlag || this.telephoneFlag 
    || this.companyDescFlag || this.companyUrlFlag || this.companyEmailFlag || this.telephoneValidationFlag
    || this.emailAddValidationFlag || this.webAddValidationFlag) {
    this.allErrorMsgFlag = true;
  } else {
    this.allErrorMsgFlag = false;
  }
  if(!this.allErrorMsgFlag) {
  let companyDetail = {
      'companyName': this.companyName,
      'companySize': this.companySize,
      'companyAddress': this.addressName,
      'addressLine1': this.addressLine1,
      'addressLine2': this.addressLine2,
      'city': this.city,
      'country': this.country.toString(),
      'postCode': this.postCode,
      'telephone': this.telephone,
      'sameAsPermanentAddress': this.sameAsPerAddFlag.toString(),
      'postalAddressLine1': this.postalAddressLine1,
      'postalAddressLine2': this.postalAddressLine2,
      'postalCity': this.postalCity,
      'postalCountry': this.postalCountry.toString(),
      'postalPostCode': this.postalPostCode,
      'postalTelephoneNo': this.postalTelephone,      
      'companyUrl':  {"url":this.webAddress}
    };
    
  let companySocial = {
      'webAddress': this.webAddress,
      'emailAddress': this.emailAddress,
      'rssData' : {
        'rssUrl': this.rssUrl,
        'fullUrlRssFeed': this.fullUrlRssFeed,
        'rssDisplayFeed': this.rssDisplayFeed
      },
      'twitterData' : {
        'twitterUrl': this.socialLinkName,
        'fullUrlTwitterFeed': this.fullUrlTwitterFeed,
        'twitterDisplayFeed': this.twitterDisplayFeed
      },
      'linkedinData' : {
        'linkedinUrl': this.linkedinUrl,
        'fullUrlLinkedinFeed': this.fullUrlLinkedinFeed,
        'linkedinDisplayFeed': this.linkedinDisplayFeed
      },
      'otherSocialData' : []
    };
    let otherAddressDataObj = {'otherAddress': []};
    console.log("this.socialLinkName", this.socialLinkName);
  console.log("this.addMulAddArray before", this.addMulSocialArray);
  if(this.addMulSocialArray && this.addMulSocialArray.length > 0) {
    for(var i = 0; i<this.addMulSocialArray.length; i++) {
      if(this.addMulSocialArray[i].otherSocialLink) {
        otherSocial = {
          'Url': this.addMulSocialArray[i].otherSocialLink,
          'fullUrl': this.addMulSocialArray[i].otherSocialFeed,
          'displayFeed': this.addMulSocialArray[i].otherRadio
        }
        companySocial.otherSocialData.push(otherSocial);
      }
    }
  }
  console.log("this.addMulAddArray", this.addMulAddArray);
  if(this.addMulAddArray && this.addMulAddArray.length > 0) {
    for(var i = 0; i<this.addMulAddArray.length; i++) {
      if(this.addMulAddArray[i].addresslLine1) {
        otherAdd = {
          'addressLine1': this.addMulAddArray[i].addresslLine1,
          'addressLine2': this.addMulAddArray[i].addressLine2,
          'city': this.addMulAddArray[i].city,
          'country': this.addMulAddArray[i].country.toString(),
          'postCode': this.addMulAddArray[i].postCode,
          'telephone': this.addMulAddArray[i].telephone
        }
        otherAddressDataObj.otherAddress.push(otherAdd);
      } 
    }
  } else {
    otherAddressDataObj.otherAddress.push(this.otherAddress);
  }

  console.log("this.imageFile--", this.imageFile);

 
  this.fd.append('loginToken',(localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem('loginDetail')).token )? JSON.parse(localStorage.getItem('loginDetail')).token:  "nsakdlallas1232mk123b2k1390iq2ekq");
  this.fd.append('email',(localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem('loginDetail')).email )? JSON.parse(localStorage.getItem('loginDetail')).email:  "test@gmail.com");
  this.fd.append('companyDetails', JSON.stringify(companyDetail));
  this.fd.append('companyDescription',this.companyDescription);
  this.fd.append('companySocial', JSON.stringify(companySocial));
  this.fd.append('otherAddress',JSON.stringify(otherAddressDataObj.otherAddress ));
  this.fd.append('ProfileUrl', this.imageFile ? this.imageFile : '' );
  console.log("companyDetail--", companyDetail);
  console.log("this.companyDescription--", this.companyDescription);
  console.log("companySocial--", companySocial);
  console.log("otherAddress--", otherAddressDataObj.otherAddress);
	console.log("recruiterProfileJson", this.fd);
     this.inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/profile/submit";
       this._commonRequestService.postData(this.inputUrl, this.fd).subscribe(
        data => {
          this.responseData = data;
          window.scroll(0,0);
          if(this.responseData.status === "TRUE"){
                  this.succesMessageFlag =true;
                  this.ErrorMesageFlag =false
          this.profileData={};
          this.errorMsg = "";
          this.WSErrorMsg = "";
          this.getProfileDta();
          }
          else if(data && data.status == 'FALSE'){
             this.commonService.goToRecruiterLogin(data);
             this.succesMessageFlag =false;
              this.ErrorMesageFlag =true;
              this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;;
          }
    
          // console.log("keySkill: ", this.listSignUpData);
        }
    ); 
   }
  };




getProfileDta(){
   this.profileData =  this._commonRequestService.getDataWithoutObserval('recruiter-profile-view-data');
   console.log("this.pro--", this.profileData);
   var input={
        "email":"test@test7.com",
        "loginToken": ":$2y$10$AUQhfigHBiNAzCG9aSYZe.WEbqDIBNVxl6aBoSHJs8.oEuPFWMkHm"
      }
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/profile/view";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("profiledta--", data);
          var companySocialData;
          if(data && data.data) {
            this.profileData = data.data;
            if(this.profileData['companySocial'] && this.profileData['companySocial'].length > 0) {
              console.log("comapny social--", JSON.parse(this.profileData['companySocial']));
              companySocialData = JSON.parse(this.profileData['companySocial']);
            }
            this.companyName =this.profileData['companyDetails'] && this.profileData['companyDetails'].companyName ? this.profileData['companyDetails'].companyName : "";
          this.companySize =this.profileData['companyDetails'] && this.profileData['companyDetails'].companySize ? this.profileData['companyDetails'].companySize : "";
          this.addressName =this.profileData['companyDetails'] && this.profileData['companyDetails'].companyAddress ? this.profileData['companyDetails'].companyAddress : "";
          this.addressLine1 =this.profileData['companyDetails'] && this.profileData['companyDetails'].addressLine1 ? this.profileData['companyDetails'].addressLine1 : "";
          this.addressLine2 =this.profileData['companyDetails'] && this.profileData['companyDetails'].addressLine2 ? this.profileData['companyDetails'].addressLine2 : "";
          this.city =this.profileData['companyDetails'] && this.profileData['companyDetails'].city ? this.profileData['companyDetails'].city : "";
          this.country =this.profileData['companyDetails'] && this.profileData['companyDetails'].country ? this.profileData['companyDetails'].country : "";
          this.postCode =this.profileData['companyDetails'] && this.profileData['companyDetails'].postCode ? this.profileData['companyDetails'].postCode : "";
          this.telephone =this.profileData['companyDetails'] && this.profileData['companyDetails'].telephone ? this.profileData['companyDetails'].telephone : "";
          this.sameAsPerAddFlag = this.profileData['companyDetails'] && this.profileData['companyDetails'].sameAsPermanentAddress === "true" ? true : false;
          //this.profileUrl = this.profileData['companyDetails'] && this.profileData['companyDetails'].companyUrl ? this.profileData['companyDetails'].companyUrl : "";
          this.postalAddressLine1 =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalAddressLine1 ? this.profileData['companyDetails'].postalAddressLine1 : "";
          this.postalAddressLine2 =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalAddressLine2 ? this.profileData['companyDetails'].postalAddressLine2 : "";
          this.postalCity =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalCity ? this.profileData['companyDetails'].postalCity : "";

          this.postalCountry =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalCountry ? this.profileData['companyDetails'].postalCountry : "";
          this.postalPostCode =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalPostCode ? this.profileData['companyDetails'].postalPostCode : "";
          this.postalTelephone =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalTelephoneNo ? this.profileData['companyDetails'].postalTelephoneNo : ""; 
          this.fileArray =this.profileData['companyDetails'] && this.profileData['companyDetails'].fileArray ? this.profileData['companyDetails'].fileArray : "";
          this.companyDescription= this.profileData && this.profileData.companyDescription ? this.profileData.companyDescription : "";
          this.webAddress= companySocialData && companySocialData.webAddress ? companySocialData.webAddress : "";
          this.emailAddress= companySocialData && companySocialData.emailAddress ? companySocialData.emailAddress : "";

          this.rssUrl= companySocialData && companySocialData.rssData && companySocialData.rssData.rssUrl ? companySocialData.rssData.rssUrl : "";
          this.fullUrlRssFeed= companySocialData && companySocialData.rssData && companySocialData.rssData.fullUrlRssFeed ? companySocialData.rssData.fullUrlRssFeed : "";
          this.rssDisplayFeed= companySocialData && companySocialData.rssData && companySocialData.rssData.rssDisplayFeed ? companySocialData.rssData.rssDisplayFeed : "";

          this.socialLinkName= companySocialData && companySocialData.twitterData && companySocialData.twitterData.twitterUrl ? companySocialData.twitterData.twitterUrl : "";
          this.fullUrlTwitterFeed= companySocialData && companySocialData.twitterData && companySocialData.twitterData.fullUrlTwitterFeed ? companySocialData.twitterData.fullUrlTwitterFeed : "";
          this.twitterDisplayFeed= companySocialData && companySocialData.twitterData && companySocialData.twitterData.twitterDisplayFeed ? companySocialData.twitterData.twitterDisplayFeed : "";

          this.linkedinUrl= companySocialData && companySocialData.linkedinData && companySocialData.linkedinData.linkedinUrl ? companySocialData.linkedinData.linkedinUrl : "";
          this.fullUrlLinkedinFeed= companySocialData && companySocialData.linkedinData && companySocialData.linkedinData.fullUrlLinkedinFeed ? companySocialData.linkedinData.fullUrlLinkedinFeed : "";
          this.linkedinDisplayFeed= companySocialData && companySocialData.linkedinData && companySocialData.linkedinData.linkedinDisplayFeed ? companySocialData.linkedinData.linkedinDisplayFeed : "";
          
          if(companySocialData && companySocialData.otherSocialData && companySocialData.otherSocialData.length > 0) {
            for(var i = 0; i< companySocialData.otherSocialData.length; i++) {
              if(companySocialData.otherSocialData[i].Url) {
                var newItem = i;
                this.addMulSocialArray.push({'otherSocialLink': companySocialData.otherSocialData[i].Url, 'otherSocialFeed': companySocialData.otherSocialData[i].fullUrl, 'otherRadio': companySocialData.otherSocialData[i].displayFeed, 'otherName': 'other'+newItem});
              }
            }
          }
          console.log("this.profileData['otherAddress']", this.profileData['otherAddress']);
          if(this.profileData['otherAddress'] && this.profileData['otherAddress'].length > 0) {
            for(var i = 0; i< this.profileData['otherAddress'].length; i++) {
              if(this.profileData['otherAddress'][i].addressLine1) {
                var newItem = i;
                this.addMulAddArray.push({'addresslLine1': this.profileData['otherAddress'][i].addressLine1, 'addressLine1Name': 'address1'+newItem, 'addressLine2': this.profileData['otherAddress'][i].addressLine2, 'addressLine2Name': 'address2'+newItem, 'city': this.profileData['otherAddress'][i].city, 'cityName': 'cityN'+newItem, 'country': this.profileData['otherAddress'][i].country, 'countryName': 'country1'+newItem, 'postCode': this.profileData['otherAddress'][i].postCode, 'postName': 'postN'+newItem, 'telephone': this.profileData['otherAddress'][i].telephone, 'telephone1': 'teleP'+newItem})
              }
            }
            console.log('this.addMulAddArray--', this.addMulAddArray);
          }

          } else if(data && data.status == 'FALSE') {
            this.commonService.goToRecruiterLogin(data);
          }
        }
    );

   if(this.profileData) {
  
}

// this.profileData.
  console.log(this.profileData,"view_data_recru");
}
}
