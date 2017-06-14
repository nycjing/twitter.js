const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', {title:'Twitter.js', tweets: tweets , 
  	          showForm : true} );
});



router.get('/users/:name', function(req, res) {
  //var name = req.params.name;
  var list = tweetBank.find( {name: req.params.name} );
  res.render( 'index', { title:'Twitter.js', tweets: list, showForm : true, name: name  } );
});

router.get('/tweets/:id', function(req, res) {
  var tweetWithThatId = tweetBank.find({id: Number(req.params.id)});
  res.render( 'index', {title:'Twitter.js', tweets:tweetWithThatId } );

});

router.post('/tweets',function(req,res){
     tweetBank.add(req.body.name,req.body.text);
     res.redirect('/');
});

io.sockets.emit('newTweet', { /* tweet info */ });

module.exports = function (io) {
  // ...
  // route definitions, etc.
  // ...
  return router;
};