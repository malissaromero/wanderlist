var express = require("express");
var router = express.Router();
var Pin = require("../db/connection").models.Pin;
var User = require("../db/connection").models.User;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/pins", function(req,res){
  Pin.findAll().then(function(pins){
    res.json(pins);
  });
});

router.get("/pins/:id", function(req, res){
  Pin.findById(req.params.id).then(function(pin){
    if(!pin) return error(res, "not found");
    res.json(pin);
  });
});

router.get("/users/:userId/pins", function(req, res){
  User.findById(req.params.userId).then(function(user){
    if(!user) return error(res, "not found");
    user.getPins().then(function(pins){
      res.send(pins);
    });
  });
});

router.post("/users/:userId/pins", function(req,res){
  Pin.create(req.body).then(function(pin){
    res.json(pin);
  });
})

router.get("/users/:userId/pins/:id", function(req,res){
  Pin.findById(req.params.id).then(function(pin){
    if(!pin) return error(res, "not found");
    res.json(pin);
  });
});

router.patch("/pins/:id", function(req, res){
  Pin.findById(req.params.id).then(function(pin){
    if(!pin) return error(res, "not found");
    pin.updateAttributes(req.body).then(function(updatedPin){
      res.json(updatedPin);
    });
  });
});

router.delete("/pins/:id", function(req, res){
  Pin.findById(req.params.id).then(function(pin){
    if(!pin) return error(res, "not found");
    pin.destroy().then(function(){
      res.json({success: true});
    });
  });
});

module.exports = router;
