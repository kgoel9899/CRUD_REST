const express = require("express");
const Ninja = require("../models/ninja");
const router = express.Router(); //router object
// const Ninja = require("../models/ninja");

//get a list of ninjas from the db
router.get("/ninjas", function(req, res, next){
    // res.send({type: "GET"});
    //{} will find all the ninjas
    Ninja.find({}).then(function(ninjas){
        res.send(ninjas);
    });
});

//add a new ninja to the db
router.post("/ninjas", function(req, res, next){
    // console.log(req.body);

    // var ninja = new Ninjareq.body();
    // ninja.save(); //saves it in mongodb

    //above 2 lines can be shortened to this -> line
    //creates and saves the object
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);

    //if there is an error like name not given but it is required then it will catch that and next will call the middleware next to 
    //current middleware (error handling in this case)

    // create takes time to complete execution and to wait for it to successfully execute and then send some response to the client 
    // we use the then function which ensures that the function following it fires only when it has been saved successfully
    // basically create returns a Promise

    // res.send({
    //     type: "POST",
    //     name: req.body.name,
    //     rank: req.body.rank
    // });
});

//update a ninja in the db
router.put("/ninjas/:id", function(req, res, next){
    // res.send({type: "PUT"});
    //second argument of findbyid.... is req.body the info that we want to update
    // Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(ninja){
    //     res.send(ninja);
    // });
    //the above whole thing sends the old ninja the outdated one therefore we have to find that ninja again in the callback function like this:
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    });
});

//delete a ninja in the db
router.delete("/ninjas/:id", function(req, res, next){
    // res.send({type: "DELETE"});
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });
});

module.exports = router;

//schema defines the structure
//model represents the collection