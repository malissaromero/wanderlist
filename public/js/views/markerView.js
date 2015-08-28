//this page renders the markers to be sent to mapview render marker


var MarkerView = function(pin){
  //define pin images
  var redPin = L.icon({
    iconUrl: '../public/images/PinDown1.png',
    iconSize: [22, 27],
    iconAnchor: [4, 25],
  });
  var greenPin = L.icon({
    iconUrl: '../public/images/PinDown1Green.png',
    iconSize: [22, 27],
    iconAnchor: [4, 25],
  })

  this.pin = pin;

  if(pin.isRed == "t"){
    this.marker = L.marker([pin.latitude, pin.longitude], {
      icon: redPin,
      draggable: true,
      clickable: true,
      title: pin.title + " id" + pin.id,
      longDesc: "[pin.latitude, pin.longitude]"
    })
  }
  else {
    this.marker = L.marker([pin.latitude, pin.longitude], {
      icon: greenPin,
      clickable: true,
      draggable: true,
      title: pin.title + " id" + pin.id,
    })
  }

}

MarkerView.prototype = {
  render: function() {

  }
}
