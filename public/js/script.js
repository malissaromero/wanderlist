$(document).ready(function() {
//define current_user variable through ajax
Pin.whichUser().then(function(userId){
  current_user = userId;
})


  $(".popup_bar").hide();
  $(".saveButton").hide();
  $(".deletePhotoButton").hide();

  var pinId;

  //load map
  var WorldMap = new MapView();

  $("body").click(function(){
    $(".overlay").hide();
    $(".help_window").hide();
  });

  //fetch pins from user defined by session with default of 1 if no session

  Pin.fetch().then(function(pins){
    pins.forEach(function(pin){
      var marker = new MarkerView(pin);
      WorldMap.renderMarker(marker)
      // WorldMap.renderMarker(view.marker)
    })
  })

  //  add search bar functionality to add red pin

  $(".form-control").on("keypress", function(e){
    if(e.which == 13){
      e.preventDefault();
      var user_search = $(".form-control").val()
      var request = $.getJSON("https://api.mapbox.com/v4/geocode/mapbox.places/"+user_search+".json?access_token=pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog")
      .then(function(response){
        var search_location = response.features[0].geometry.coordinates
        var lat = search_location[1];
        var long = search_location[0];
        var pin = new Pin({
          "latitude": lat,
          "longitude": long,
        })
        current_latitude = lat;
        current_longitude = long;

        var marker = new MarkerView(pin);
        WorldMap.renderMarker(marker)
      }).fail(function(response){
        console.log("failed to load coordinates from search");
      })
      $(".form-control").val("")
      pinIsRed = "t";
    }
  })

  $("#redPinBtn").click(function(){
    var pin = new Pin({})
    var marker = new MarkerView(pin);
    pinIsRed = "t";
    WorldMap.renderMarker(marker)
    current_latitude = 13.5333;
    current_longitude = 2.0833;
  });
  $("#greenPinBtn").click(function() {
    var pin = new Pin({"isRed": "false"})
    var marker = new MarkerView(pin);
    WorldMap.renderMarker(marker)
    pinIsRed = "f";
    current_latitude = 13.5333;
    current_longitude = 2.0833;
  });

  $(".saveButton").on("click", function() {
    var title = $(".title").children().eq(0).val()
    var latitude = current_latitude;
    var longitude = current_longitude;
    var isRed = pinIsRed;
    var description = $(".description").val()
    $.ajax({
      url: "http://localhost:3000/users/"+current_user+"/pins",
      type: "POST",
      dataType: "json",
      data: {"title": title, "latitude": latitude, "longitude": longitude, "userId": current_user, "isRed": isRed, "description": description}
    }).done(function(response){
      $(".saveButton").hide;
      $(".title").html(response.title);
      $(".description").html(response.description);
      whichPin[0].title = response.title + " id"+response.id
      var pinId = response.id;
      var pict = $(".changeUrl").val();
      $.ajax({
        url: "/pins/" + pinId + "/photos",
        type: "POST",
        dataType: "json",
        data: {"photoUrl": pict, "pinId": pinId}
      }).done(function(response){
        $(".photos").html("<img src='"+ response.photoUrl +"' >")
      }).fail(function(response){
        console.log("post to pin failed");
      })
    })
  })
})
