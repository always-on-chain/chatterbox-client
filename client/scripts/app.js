// YOUR CODE HERE:

var request = function(type, message) {
	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
	  type: type,
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
}

var app = {
	init: () => {

	},
	send: (message) => {
		request('POST', message);
		// console.log($.ajax.args[0][0].data)
		// var obj = JSON.parse($.ajax.args[0][0].data);
		// console.log(obj)
		// return obj;
	},
	fetch: (message) => {
		request('GET', message);
	}
};


