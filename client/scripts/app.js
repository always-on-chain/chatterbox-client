// YOUR CODE HERE:

var request = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

var retrieve = function() {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function () {
      console.log('chatterbox: Message got');
    },
    error: function () {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get messages');
    }
  });
};


var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });       
  },
  
  fetch: function() {
    $.ajax({
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      success: function () {
        console.log('chatterbox: Message got');
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get messages');
      }
    });
  },
  
  clearMessages: function() {
    $('#chats').empty();
  },
  
  renderMessage: function(message) {
    var messageBox = $('<div class="messageBox"></div>');
    var userNameNode = $('<div class="username">' + message.username + '</div>');
    var messageNode = $('<p>' + message.text + '</p>');
    $(messageBox).append(userNameNode, messageNode);
    $('#chats').append(messageBox);
  },
  
  renderRoom: function(roomName) {
    var roomNode = $('<span>' + roomName + '</span>');
    $('#roomSelect').append(roomNode);
  },
  
  handleUsernameClick: function(username) {
    console.log(username);
  },
  
  handleSubmit: function() {
    console.log('button clicked');
  },
  
  // buttonHandlerOn: false,
  
  init: function() {
    // if (!this.buttonHandlerOn) {
      
    // }
    // this.buttonHandlerOn = true;
    $('#send').on('submit', app.handleSubmit);
    $('.username').on('click', function() {
      app.handleUsernameClick($(this).text());
    });
  }
  
};

app.init();
