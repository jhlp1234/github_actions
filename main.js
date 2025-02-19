const cluster = require("cluster");
const os = require("os");
const express = require("express");
const app = express();

const totalCPUs = os.cpus().length;

app.get("/", function(req, res){
  let total = 0;
  for(let i = 0; i < 50000000; i++){
    total++;
  }
  res.json("Hello");
})

app.get("/test", function(req, res){
  res.json("Test");
})

if(cluster.isPrimary){
  for(let i = 0; i < totalCPUs; i++){
    cluster.fork();
  }

  cluster.on("exit", function(worker, code, signal){
    console.log(`${worker.process.pid} Died`);
    cluster.fork();
  })
}
else{
  app.listen(5000, function(){
    console.log("Server", process.pid);
  })
}