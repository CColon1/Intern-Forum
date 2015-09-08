// export function for listening to the socket
module.exports = function (socket) {

  // send the new user their name and a list of users
  socket.emit('init', {
    message : 'You\ve connected!'
  });

  
};
