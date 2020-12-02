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
        onLabelShow: function (event, label, code) {
            code = code.toUpperCase();
            country_name = countries[code];
            label.html('<strong>' + country_name + '</strong>');
        }
    });

    fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(data => {
        let obj =JSON.parse(JSON.stringify(data));
        let global = data.Global;
        let arr = ['TotalConfirmed', 'TotalRecovered', 'TotalDeaths'];
        //thực hiện set data cho thanh Overview
        for(var key of arr){
            document.getElementById(key).innerHTML = String(global[key]).replace(/(.)(?=(\d{3})+$)/g, '$1,');
        }
        //thưc hiện set data ta cho totalcònỉmedob
        document.getElementById('TotalConfirmedOV').innerHTML = String(global["TotalRecovered"]).replace(/(.)(?=(\d{3})+$)/g, '$1,');
        //thưc hiển xử lý dữ  liệu trở về dạng cơ bản hơn chỉ có 3 tham số 
        var countries = data.Countries.map((country)=>{
            let obj = {
                Country : country["Country"],
                Slug : country["Slug"],
                TotalRecovered: country["TotalRecovered"]
            };
            return obj
        });
        renderNational(countries);
    });
});
//hàm so sánh số liệu 2 quốc gia phục vụ cho hàm sort sắp xếp từ cao xuống thấp
var compare = (a, b)=> {
    if (a.TotalRecovered < b.TotalRecovered) {
        return 1;
    }
    if (a.TotalRecovered > b.TotalRecovered) {
        return -1;
    }
    return 0;
};
//hàm thực hiện add các phần tư vào phần list items
var renderNational = (countries) => {
    let result='';
    countries.sort(compare);
    for(var national of countries){
        result +=   `<div class="item">
                        <div> 
                            <img src="../image/country/${national.Slug}.svg" class="img-fluid" alt="${national.Country}">
                            <span>${national.Country}</span>
                        </div>
                        <p>${String(national.TotalRecovered).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</p>
                    </div>`;
    }
    document.getElementById('listItems').innerHTML = result;
};
