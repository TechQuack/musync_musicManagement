// Import essential libraries 
const express = require('express');
const app = express();
const router = express.Router();

//add the router 
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000'); 