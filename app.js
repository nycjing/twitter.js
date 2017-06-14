const express = require( 'express' );
const chalk = require( 'chalk' );
const nunjucks = require('nunjucks');
const app = express(); // creates an instance of an express application
const routes = require('./routes');
var  fs = require('fs');
var  mime = require('mime');
var   bodyParser = require(body-parser);

var socketio = require('socket.io');
// ...
var server = app.listen(3000);
var io = socketio.listen(server);

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views',{noCache: true});

 var locals = {
    title: 'The Best Team Ever',
    people: [
        { name: 'Lina'},
        { name: 'Jing' },
        { name: 'Shayne'}
    ],
    pGraph: 'So duh, Ofcourse'
};
//nunjucks.configure('views', {noCache: true});
// nunjucks.render('index.html', locals, function (err, output) {
//     console.log(output);
// });
app.use('/', routes(io));

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
    // do your logging here
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    next();
})

// app.get('/', function(req, res) {
//   // res.send('this is a sample!');

//   res.render( 'index', {title: locals.title , people: locals.people, pGraph: locals.pGraph} );
//   // res.render(nunjucks.render('index.html', locals, function (err, output) {
//   //   console.log(output);
//   // }));
// });

// app.get('/is-anybody-in-there', function(req, res) {
//   res.send('this is someone else');
// });
// app.get('/modernism', function (req, res) {
//   res.send('this is the get')
// })
// app.post('/modernism', function (req, res) {
//   res.send('POST request to the homepage')
// })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
