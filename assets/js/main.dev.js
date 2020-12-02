"use strict";

//fuction thực hiện khi kéo con lăn chuột xuống thì thanh header đổi màu
$(window).scroll(function () {
  if ($(document).scrollTop() > 150) {
    $('.nav-header').addClass('backgroud-trans');
    console.log("OK");
  } else {
    $('.nav-header').removeClass('backgroud-trans');
  }
});
$(document).ready(function () {
  //fuction sử dụng đổ data vào bản đồ map
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
  fetch('https://api.covid19api.com/summary').then(function (response) {
    return response.json();
  }).then(function (data) {
    var obj = JSON.parse(JSON.stringify(data));
    var global = data.Global;
    var arr = ['TotalConfirmed', 'TotalRecovered', 'TotalDeaths']; //thực hiện set data cho thanh Overview

    for (var _i = 0, _arr = arr; _i < _arr.length; _i++) {
      var key = _arr[_i];
      document.getElementById(key).innerHTML = String(global[key]).replace(/(.)(?=(\d{3})+$)/g, '$1,');
    } //thưc hiện set data ta cho totalcònỉmedob


    document.getElementById('TotalConfirmedOV').innerHTML = String(global["TotalRecovered"]).replace(/(.)(?=(\d{3})+$)/g, '$1,'); //thưc hiển xử lý dữ  liệu trở về dạng cơ bản hơn chỉ có 3 tham số 

    var countries = data.Countries.map(function (country) {
      var obj = {
        Country: country["Country"],
        Slug: country["Slug"],
        TotalRecovered: country["TotalRecovered"]
      };
      return obj;
    });
    renderNational(countries);
  });
}); //hàm so sánh số liệu 2 quốc gia phục vụ cho hàm sort sắp xếp từ cao xuống thấp

var compare = function compare(a, b) {
  if (a.TotalRecovered < b.TotalRecovered) {
    return 1;
  }

  if (a.TotalRecovered > b.TotalRecovered) {
    return -1;
  }

  return 0;
}; //hàm thực hiện add các phần tư vào phần list items


var renderNational = function renderNational(countries) {
  var result = '';
  countries.sort(compare);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = countries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var national = _step.value;
      result += "<div class=\"item\">\n                        <div> \n                            <img src=\"/assets/image/country/".concat(national.Slug, ".svg\" class=\"img-fluid\" alt=\"").concat(national.Country, "\">\n                            <span>").concat(national.Country, "</span>\n                        </div>\n                        <p>").concat(String(national.TotalRecovered).replace(/(.)(?=(\d{3})+$)/g, '$1,'), "</p>\n                    </div>");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  document.getElementById('listItems').innerHTML = result;
};