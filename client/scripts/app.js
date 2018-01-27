// YOUR CODE HERE:
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  storage: [],
  roomList: [],
  room: undefined,
  friends: [],
  
  send: function(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: message,
      success: function (result) {
        console.log(result);
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
      data: {order: '-createdAt', limit: 100, where: {roomname: this.room}},
      success: function (result) {
        app.updateMessages(result);
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get messages');
      }
    });
  },

  fetchEveryTen: function() {
    app.fetch();
    setTimeout(app.fetchEveryTen.bind(app), 10000);
  },
  
  clearMessages: function() {
    $('#chats').empty();
  },
  
  addRooms: function() {
    app.storage.forEach(function(message) {
      if (!app.roomList.includes(message.roomname)) {
        app.roomList.push(message.roomname);
        app.renderRoom(message.roomname);
      }
    });
  },
  
  renderRoom: function(roomName) {
    var roomNode = '<option class = "roomChoice" value="' + roomName + '">' + roomName + '</option>';
    $('#roomSelect').append(roomNode);
  },
  
  updateMessages: function(response) {
    this.storage = [];
    $('#chats').empty();
    response.results.forEach(function(message) {
      message.username = xssFilters.inHTMLData(message.username);
      message.text = xssFilters.inHTMLData(message.text);
      app.renderMessage(message);
      app.storage.push(message);
    });
    this.addRooms();
    // response.results.forEach(this.renderMessage);
  },
  
  renderMessage: function(message) {
    var messageBox = $('<div class="messageBox"></div>');
    if (app.friends.includes(message.username)) {
      messageBox.css('font-weight', 'bold');
    }
    var userNameNode = $('<div class="username">' + message.username + '</div>');
    $(userNameNode).on('click', function() {
      app.handleUsernameClick($(this).text());
    });
    var roomNode = $('<div class="roomname">' + message.roomname + '</div>');
    var headerBox = $('<div class="headerBox"></div>');
    var messageNode = $('<p>' + message.text + '</p>');
    $(headerBox).append(userNameNode, roomNode);
    $(messageBox).append(headerBox, messageNode);
    $('#chats').append(messageBox);
  },
  
  handleUsernameClick: function(username) {
    if (!app.friends.includes(username)) {
      app.friends.push(username);
      $('#friendsList').append('<li>' + username + '</li>');
    }
  },
  
  handleSubmit: function() {
    var text = $('#messageText').val();
    var username = location.search.split('=')[1];
    var roomname = app.room;
    var message = {
      text: text,
      username: username,
      roomname: roomname
    };
    app.send(message);
    app.fetch();
  },
  
  makeRoom: function() {
    app.room = prompt('What is your room?');
    app.roomList.push(app.room);
    app.renderRoom(app.room);
    $('#roomSelect').val(app.room);
    app.fetch();
  },
  
  // buttonHandlerOn: false,
  
  init: function() {
    app.fetchEveryTen();
    $('#roomSelect').change(function() {
      var index = $('#roomSelect')[0].options.selectedIndex;
      if ($('#roomSelect')[0].options[index].value === 'all') {
        app.room = undefined;
      } else {
        app.room = $('#roomSelect')[0].options[index].value;
      }
      app.fetch();
    });
    $('#send').on('click', app.handleSubmit);
    $('#makeRoom').on('click', app.makeRoom);
  }
};

app.init();
