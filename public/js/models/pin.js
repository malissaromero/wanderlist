var Pin = function(info){
  this.id = info.id;
  this.title = info.title;
  this.latitude = info.latitude || 13.5333;
  this.longitude = info.longitude || 2.0833;
  this.userId = info.userId || current_user;
  this.isRed = info.isRed || "t";
  this.description = info.description || "What is on the agenda...";
};


Pin.whichUser = function(){
  var request = $.getJSON("http://localhost:3000/auth/twitter/show")
  .then(function(response){
    if(response.userId){
      var userId = response.userId
    }
    else {
      var userId = 1;
    }
    return userId;
  })
  return request
}
Pin.fetch = function(userId){
  var request = $.getJSON("http://localhost:3000/auth/twitter/show")
  .then(function(response){
    if(response.userId){
      var userId = response.userId
    }
    else {
      var userId = 1;
    }
    return userId;
  }).then(function(userId){
    var request = $.getJSON("http://localhost:3000/users/"+userId+"/pins/")
    .then(function(response) {
      var pins = [];
      for(var i = 0; i < response.length; i++){
        pins.push(new Pin(response[i]));
      }
      return pins;
    })
    .fail(function(response){
      console.log("failed to fetch pins from user with id: "+userId);
    });
    return request;
  })
  return request;
}
Pin.show = function(pinId){
  var request = $.getJSON("http://localhost:3000/pins/"+pinId)
  .then(function(response) {
    return response
  }).fail(function(response){
    console.log("failed to fetch pins with id: "+pinId);
  })
  return request;
}
Pin.getPhotos = function(pinId){
  var request = $.getJSON("http://localhost:3000/pins/"+pinId+"/photos/")
  .then(function(response) {
    return response
  }).fail(function(response){
    console.log("failed to fetch photos from pin with id: "+pinId);
  })
  return request;
}
