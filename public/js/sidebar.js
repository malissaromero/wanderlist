$(document).ready(function(){
  //hide sidebar and save
  $(".leaflet-tile-pane").on("click", savePinAndHide)
  function savePinAndHide() {
    var data = {}
    var checkId = $("#pinId").html()
    data["notes"] = $(".editbox").val();
    if($(".editTitle").val()){
      data["titleValue"] = $(".editTitle").val();
    }
    $.ajax({
      url: "http://localhost:3000/pins/"+checkId,
      type: "PATCH",
      dataType: "json",
      data: data
    })
    $(".popup_bar").hide();
    console.log("map clicked, pin saved, bar hid. Pin: "+checkId)
  }

  //show sidebar
  $(".leaflet-marker-pane").on("click", function() {
    $(".popup_bar").show();

    //parse information built into marker and put in hidden div
    whichPin = $(event.target);
    var temp = event.target.title.split(" id")
    $(".hiddenInfo").html("<span id='pinId'>"+temp[1]+"</span><span id='pinTitle'>"+temp[0]+"</span>")
    pinId = temp[1]
    if(pinId != "undefined"){

      //show pin and make title editable

      Pin.show(pinId).then(function(response){
        $(".title").html("<span class='clickable_title'>"+response.title+"</span>");
        $(".description").val(response.description);
        $(".clickable_title").one("click", function() {
          var value = $(".clickable_title").html();
          $(".clickable_title").html("<input class='editTitle' type='text' value='"+value+"'>")
          $(".editTitle").on("keypress", function(e){
            if(e.which == 13){
              var value = $(".editTitle").val();
              $.ajax({
                url: "http://localhost:3000/pins/"+pinId,
                type: "PATCH",
                dataType: "json",
                data: {"title": value}
              }).done(function(response){
                $(".clickable_title").html(response.title)
              })
            }
          })
        })
      })
      // delete on trash click

      $(".glyphicon-trash").on("click", function(){
        $.ajax({
          url: "http://localhost:3000/pins/" + pinId,
          type: "DELETE",
          dataType: "json"
          // success: function(data){
          //   $(this).remove();
          // }
        }).done(function(response){
          whichPin.hide();
          $(".popup_bar").hide();
        })
      })
    }
  })
})
