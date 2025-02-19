const express = require("express");
const app = express();

app.get("/", function(req, res){
  let total = 0;
  for(let i = 0; i < 30000000; i++){
    total++;
  }
  res.json("Hello2");
})

app.listen(5000, function(){
  console.log("Server");
})