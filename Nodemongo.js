const express = require('express');
const app = express();
app.use(express.json());
const mongo =require('mongodb');



app.get('/api/collection',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("salsesmongo");
dbo.listCollections().toArray(function(err, collInfos) {
    if (err) throw err;
    console.log(collInfos);
	res.send(collInfos);
    db.close();
  });
  });
});

app.get('/api/books', (req,res)=> {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("salsesmongo");
 dbo.collection("books").find({}, {}).toArray(function(err, result) {
if (err) throw err;
console.log(result);
res.send(result);
db.close();
 });
});
});

app.get('/api/student',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("salsesmongo");
  dbo.collection("student").find({},{projection: {sid : 1,sname : 1}}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
	res.send(result);
    db.close();
  });
  });
});

app.put('/api/employee/update',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("salsesmongo");
  var myquery = { ename: "ajimol" };
  var newvalues = { $set: {ename: "UpdatedAji"} };
  dbo.collection("employee").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
	res.send(result);
    db.close();
  });
});
});
app.get('/api/updatedemployee',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("salsesmongo");
  dbo.collection("employee").find({},{projection: {eid : 1,ename : 1}}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
	res.send(result);
    db.close();
  });
  });
});

app.get('/api/Afterinsertcustomers',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("salsesmongo");
  dbo.collection("customers").find({},{projection: {firstname : 1,lastname: 1,city:1}}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
	res.send(result);
    db.close();
  });
  });
});
app.put('/api/updatedcustomers',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/";
   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("salsesmongo");
   var myquery = { firstname: "Achu" };
   var newvalues = { $set: {lastname: "Dev", city:"kochi" } };
   dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
});

// post service to insert data into student collection data
app.post('/api/Newstudent',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("salsesmongo");
 var myobj = { sid: "11",sname: "Simranjit",course:"Enterprise",GPA:3.9};
 dbo.collection("student").insertOne(myobj, function(err, res) {
if (err) throw err;
console.log("1 document inserted into student collection");
   
 });
});
});

// post service to insert data into customers collection data
app.post('/api/NewCustomer',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("salsesmongo");
 var myobj = { cid: "9",firstname: "Ranju", lastname:"Akhil", email:"bal@gmail.com", city:"Ernakulam"};
 dbo.collection("customers").insertOne(myobj, function(err, res) {
if (err) throw err;
console.log("1 document inserted into customers collection");
   
 });
});
});

// delete service
app.delete('/api/deleteStudent',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("salsesmongo");
   var myquery = { sid: "11" };
   dbo.collection("student").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted from student collection");
    db.close();
  });
});
});

// delete service
app.delete('/api/deleteCustomer',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("salsesmongo");
   var myquery = { cid: "7" };
   dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted from customers collection");
    db.close();
  });
});
});


// Get using parameter

app.get('/api/student/:sid', (req, res) => {
var MongoClient = require('mongodb').MongoClient;
      var url ="mongodb://localhost:27017/";
      MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("salsesmongo");
      dbo.collection("student").find({}).toArray( function(err, result) {
      if (err) throw err;
      console.log(result);     
 const student1=result;
const stu = student1.find( c=> c.sid === parseInt(req.params.sid));
if(!stu) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
res.send(stu);
});
 });
});

app.get('/api/customers/:firstname', (req, res) => {
var MongoClient = require('mongodb').MongoClient;
      var url ="mongodb://localhost:27017/";
      MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("salsesmongo");
      dbo.collection("customers").find({}).toArray( function(err, result) {
      if (err) throw err;
      console.log(result);     
 const customers1=result;
const cstu = customers1.find( c=> c.firstname === (req.params.firstname));
if(!cstu) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
res.send(cstu);
});
 });
});
const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening on port ${port}..'));










