const express = require('express');
// const recv=require('./recieve.js');

const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
  });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  