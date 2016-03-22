var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var games = {};

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
