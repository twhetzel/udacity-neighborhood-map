
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
    var streetName = $('#street').val();
    var cityName = $('#city').val();

    var address = streetName + ', ' + cityName;

    $greeting.text('So you want to live at ' + address + '?');

    // Build Google Streetview Web service call
    var streetviewUrl = "https://maps.googleapis.com/maps/api/streetview";
    var size = "size=600x400";
    var streetviewApiKey = "&key=AIzaSyBSt5zMFbNasn8gKdGIhwaJ5ny6vw7S9ug";
    var location = "&location="+ address
    streetviewUrl += '?' + size + location + streetviewApiKey;
    console.log(streetviewUrl)
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // Build New York Times Web service call
    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + streetName + "&sort=newest";
    var nytApiKey = "c0455864d47141d29259369461fa578";

    nytimesUrl += '&' + $.param({
        'api-key': nytApiKey
    });

    $.getJSON( nytimesUrl, function( data ) {
        $nytHeaderElem.text('New York Times articles about ' + address);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            console.log(article)
            $('#form-container').submit(loadData);
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };

    }).error(function(e) {
        $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
    });


    return false;
};

$('#form-container').submit(loadData);
