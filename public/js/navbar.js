/////////// nav bar clickdown //////////
$(document).ready(function(){
  $(".dropdown-toggle").on("click", function(){
    $(".dropdown-menu").toggle();
  });

  //my account
  $(".my-account").on("click", function(){
    $(".account-information").toggle();
  });
  
  //exiting account information
  $("#exit-button").on("click", function(){
    $(".account-information").toggle();
  });

  //editing account information
  $("#edit-button").on("click", function(){
    $(".account-information").toggle();
    alert("Your changes have been saved!")
  });

  //help
  $("#helpdesk").on("click", function(){
    $(".help-message").toggle();
  });

  //sign out
  $(".sign-out").on("click", function(){
  });

  //share link
  $(".share-link").on("click", function(){
    alert("your link is www.wanderlistforever.com/OG")
  });
})
