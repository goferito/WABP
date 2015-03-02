
io.on('connection', function(socket){

  //TODO find a way to make the browser know that the server
  //has just started and old clients should reload the page
  //or at least resubscribe
  console.log('User connected!');

  socket.on('subscribe', function(room){
    socket.join(room);
  });

  socket.on('disconnect', function(){
    console.log('User disconnected.');
  });

});


// Require io modules. 
// Separate modules by room, so clients subscribed to a room
// get the updates. A client may be subscribed to several
// rooms, to get several types of updates.
