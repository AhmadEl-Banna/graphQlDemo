var mongo = require('mongodb');
var express = require('express');
var logger = require('express_logger');
var monk = require('monk');
var db =  monk('localhost:27017/test');
var app = new express();
app.use(logger('simple'));
app.use(express.static(__dirname + '/public'));
const users = db.get('users')

app.get('/users',function(req,res){
  users.find({},{},function(err,docs){
    const result = docs.map((item) =>{
      return {
        id: item._id,
        firstName :item.firstName,
        lastName :item.lastName,
        friends : item.friends.map((f) => {
          return '/users/'+f
        })
      }
    })
    res.json(result);
  })
});
app.get('/users/:id',function(req,res){
  const id = req.params.id;
  users.findOne({_id:id},{},function(e,doc){
    const result = {
        id: doc._id,
        firstName :doc.firstName,
        lastName :doc.lastName,
        friends : doc.friends.map((f) => {
          return '/users/'+f
        })
    }
    res.json(result);
  })
});
app.listen(4000)