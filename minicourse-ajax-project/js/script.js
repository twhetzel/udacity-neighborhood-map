
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview


    // YOUR CODE GOES HERE!
    var street_name = $('#street').val();

    var city_name = $('#city').val();
    console.log(city_name);

    var address = street_name + ', ' + city_name;

    $greeting.text('So you want to live at ' + address + '?');

    var streetview_url = "https://maps.googleapis.com/maps/api/streetview?";
    var size = "size=600x400";
    var api_key = "&key=AIzaSyBSt5zMFbNasn8gKdGIhwaJ5ny6vw7S9ug";
    var location = "&location="+address
    var streetview_ws_call = streetview_url+size+location+api_key
    console.log(streetview_ws_call)
    $body.append('<img class="bgimg" src="' + streetview_ws_call + '">');
    return false;
};

$('#form-container').submit(loadData);
