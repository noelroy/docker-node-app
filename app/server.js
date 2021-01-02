const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const { ObjectId } = require('mongodb');
const app = express();

app.use(bodyParser.json());

// use when starting application locally
// let mongoUrlLocal = "mongodb://admin:admin@localhost:27017";

// use when starting application through docker compose
let mongoUrlLocal = "mongodb://admin:admin@mongodb:27017";


app.use(express.static(path.join(__dirname,"/static")))

app.get('/items',(req,res) => {
    MongoClient.connect(mongoUrlLocal, (err, client) => {
        if (!err) {
            var db = client.db('my-db')
            db.collection('todo').find().toArray(function(err,result){
                res.send(result);
                client.close();
            })
        }
    })
    // res.send("No idea")
})

app.post('/items', (req,res) => {
    MongoClient.connect(mongoUrlLocal, (err, client) => {
        if (!err) {
            var db = client.db('my-db')
            db.collection('todo').insertOne(req.body, (err, resp)=>{
                res.send(resp)
                client.close()
            })
        }
    })
})

app.put('/items/:itemId', (req,res) => {
    MongoClient.connect(mongoUrlLocal, (err, client) => {
        if (!err) {
            var db = client.db('my-db')
            var myquery = { "_id": ObjectId(req.params.itemId) };
            var newvalues = { $set: req.body };
            db.collection('todo').updateOne(myquery,newvalues,(err,resp)=>{
                res.send(resp)
                client.close();
            })
        }
    })
})

app.delete('/items/:itemId', (req,res) => {
    MongoClient.connect(mongoUrlLocal, (err, client) => {
        if (!err) {
            var db = client.db('my-db')
            db.collection('todo').deleteOne({"_id":ObjectId(req.params.itemId)},(err,resp)=>{
                res.send(resp)
                client.close();
            })
        }
    })
})

app.listen(3000,() => {
    console.log('Listening on 3000')
})
