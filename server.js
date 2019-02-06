var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var tasks = require("./routes/tasks");

const cors = require("cors");

var port = process.env.PORT || 5000;  

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use("/api", tasks);

app.listen(port, function() {
    console.log("Server started on port " + port);
})
