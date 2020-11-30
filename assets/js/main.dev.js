"use strict";

$(window).scroll(function () {
  if ($(document).scrollTop() > 150) {
    $('.nav-header').addClass('backgroud-trans');
    console.log("OK");
  } else {
    $('.nav-header').removeClass('backgroud-trans');
  }
});
$(document).ready(function () {
  $("#vmap").vectorMap({
    map: 'world_en',
    backgroundColor: '#222',
    borderColor: '#555',
    color: '#555',
    hoverOpacity: 0.7,
    selectedColor: '#666666',
    enableZoom: true,
    enableDrag: true,
    showTooltip: true,
    normalizeFunction: 'polynomial',
    onLabelShow: function onLabelShow(event, label, code) {
      code = code.toUpperCase();
      country_name = countries[code];
      label.html('<strong>' + country_name + '</strong>');
    }
  });
});