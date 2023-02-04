const mongodb = require('mongodb');

const MongoClient=mongodb.MongoClient;
let url="mongodb+srv://root:1234567890@cluster0.1posg.mongodb.net/TodoApp?retryWrites=true&w=majority"

const client = new MongoClient(url);

// Database Name
const dbName = 'myTodolist';

var dbInstance=null;

client.connect().then(function()
{
  console.log("db is on");
  dbInstance = client.db(dbName);
})

var express=require("express");
var fs=require("fs");

var app=express();

app.use(express.json());
app.use(express.static("Todo"));


app.get("/todo",function(req,res)
{
  readtodos(function(data)
  {
    // console.log(data);
    res.end(JSON.stringify(data));
  })
  
})

app.post("/save",function(req,res)
{
  const collection=dbInstance.collection("todolist");

  collection.insertOne(req.body).then(function(data)
  {
    console.log("data is saved");
    if(data)
    {
      res.status(200);
      res.end();
    }
    else{
      res.status(400);
      res.end();
    }
  })
})

app.post("/delete",function(req,res){

  const collection=dbInstance.collection("todolist");

  collection.deleteOne({"count":req.body.count}).then(function(data){
    console.log("deleted success");
    if(data)
    {
      res.status(200);
      res.end();
    }
    else{
      res.status(400);
      res.end();
    }
  })

})

app.post("/edit",function(req,res)
{
  const collection=dbInstance.collection("todolist");
  collection.update({})
})

function readtodos(callback)
{
  const collection=dbInstance.collection("todolist");

  collection.find({}).toArray().then(function(data){
    callback(data)
  })
}

// function deletetodo(todo_id,callback)
// {
//   const collection=dbInstance.collection("todolist");
  
//   console.log(todo_id);
//   collection.deleteOne({"id":todo_id}).then(function(){
//     callback();
//   })
// }



app.listen(3000,function()
{
  console.log("running at 3000....");
})

