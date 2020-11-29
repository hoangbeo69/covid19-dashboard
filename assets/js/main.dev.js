"use strict";

$(window).scroll(function () {
  if ($(document).scrollTop() > 150) {
    $('.nav-header').addClass('backgroud-trans');
    console.log("OK");
  } else {
    $('.nav-header').removeClass('backgroud-trans');
  }
});