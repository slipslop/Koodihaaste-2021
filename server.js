'use strict';

let express = require('express');
let bodyParser = require('body-parser')
let app = express();


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

let port = 3000;

app.listen(port);

console.log('Listening on port ' + port);