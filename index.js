const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//set up express app
const app = express();

// app.get("/", function(req, res){ //request and response
//     console.log("GET Request");
//     res.send({a: "a"});
// });

//connect to mongodb
mongoose.connect("mongodb://localhost/ninjago"); //automatically created if not exists.
mongoose.Promise = global.Promise; //mongoose's promise is deprecated thats why global

app.use(bodyParser.json()); //will parse the json data and attach it to the body of req

//initialize routes
app.use("/api", routes);

//error handling middleware
app.use(function(err, req, res, next){
    // console.log(err);
    // res.send({error: err._message}); //but this still shows 200 status code, therefore to change this do ->
    res.status(422).send({error: err._message});
});

//listen for requests
app.listen(process.env.port || 4000, function(){
    console.log("Listening on port 4000");
});