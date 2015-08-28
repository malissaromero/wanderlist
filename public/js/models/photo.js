var Photo = function(pinId, photoId){
  var self = this;
  $.getJSON("/pins/"+pinId+"/photos/"+photoId)
  .done(function(response){
    self.photoUrl = response.photoUrl;
    self.pinId = response.pinId;
  })
}
