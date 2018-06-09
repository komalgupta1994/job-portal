import { Component, OnInit } from '@angular/core';
import { CommonDataSharedService } from '../commonDataSharedService';
import * as $ from 'jquery';

@Component({
  selector: 'app-about-recruiter',
  templateUrl: './about-recruiter.component.html',
  styleUrls: ['./about-recruiter.component.css']
})
export class AboutRecruiterComponent implements OnInit {

  constructor(private _commonDataShareService: CommonDataSharedService) { }

  ngOnInit() {

    this._commonDataShareService.switchToDivSubject.subscribe((data) =>{
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
  	 //$(".roket").animate({top: '-10px'});
    
  	$(document).on('scroll', function() {
      let currentHeight = $(this).height();
    if($('.roket') && $('.roket').position() && $('.roket').position().top && $(this).scrollTop()>=$('.roket').position().top){
        $(".roket").animate({top: '55px'},'slow',function(){});
    }
    var isAnimating = $('.roket_arrow').is(':animated');
    //console.log('isAnimating--', isAnimating, $('.roket_arrow').css('top'));
    if ($('.roket_arrow').css('top') && parseInt($('.roket_arrow').css('top').split("px")[0]) <= 190)      {
    if($('.roket_arrow') && $('.roket_arrow').position()){
        $(".roket_arrow").animate({right: '+=10', top: '+=10'},'fast',function(){    
          //console.log($(this).css('top'));
          if ($('.roket_arrow').css('top') && parseInt($('.roket_arrow').css('top').split("px")[0]) >= 190)    	{
             $(this).stop(true,true);
          }
        });
    }

    }
    // var pTop = parseInt($('.roket_arrow').css('top'));
    //     console.log("pTop--", pTop);
    //     if (pTop === 80) {
    //       $(".roket_arrow").stop(true,true);
    //     }
    //console.log( parseInt($(this).scrollTop().toString()) , parseInt(($(document).height() - $(window).height() - $(".roket_arrow").height()).toString()));
    // if ( parseInt($(this).scrollTop().toString()) == parseInt(($(document).height() - $(window).height()).toString())) {
    //   $(".roket_arrow").stop(true,true);
    // }
    // if($(".footer_bottom")) {
    // 	$(".roket_arrow").stop(true,true);
    // 	// alert("in");
    // }
});
  }

}
