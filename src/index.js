const express = require('express');
const app = express();
const loadfunction = require('./getType.js'); // Import the loadfunction
const converter=require('./convert.js');
app.use(express.urlencoded({ extended: true }));


app.get('/', loadfunction);


app.post('/convert', converter);

app.listen(3001, () => {
    console.log("Server running at http://localhost:3000/");
});
