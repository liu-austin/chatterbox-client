var MessagesView = {

  $chats: $('#chats'),
  $submit: $('.submit'),
  $message: $('#message'),
  $username: $('.username'),

  initialize: function() {
    setInterval(function() {
      App.fetch(App.stopSpinner);
    }, 6000);
    MessagesView.$submit.on('submit', function() {
      var message = {
        username: App.username,
        text: MessagesView.$message.val(),
        roomname: RoomsView.selectedRoom
      };
      Parse.create(message);
      MessagesView.$message.val('');
    });
    $('#chats .username').on('click', function() {
      Friends.toggleStatus(this.innerHTML);
    });
  },

  renderMessage: function(msg) {
    if (Friends[msg.username]) {
      MessagesView.$chats.append(MessageView.friendRender({username: msg.username, text: msg.text, roomname: msg.roomname}));
    } else {
      MessagesView.$chats.append(MessageView.render({username: msg.username, text: msg.text, roomname: msg.roomname}));
    }

  }
};