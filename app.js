const express = require('express');
const app = express();
var cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');



const port = process.env.PORT || 5050;
const logger = require('./config/logger')


app.use(express.json());
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(bodyParser.json());




mongoose.connect('mongodb://localhost:27017/FournisseurSafi' , {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
 console.log('Could not connect to the database. Exiting now...', err);
  logger.exit();
});















// _______________import router_______________ 
const SuperAdminRoutes = require("./routes/SuperAdmin.router");
const FournisseurRoutes = require("./routes/Fournisseur.router");
const CustomerRoutes = require("./routes/Customer.router");



app.use('/superAdmin',SuperAdminRoutes);
app.use('/fournisseur',FournisseurRoutes);
app.use('/Customer',CustomerRoutes);
// app.use('/Product',ProductRoutes);













module.exports =app;


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  }) 
