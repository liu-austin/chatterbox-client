var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    setInterval(function() {
      App.fetch(App.stopSpinner);

    }, 6000);
  },

  renderMessage: function(msg) {
    MessagesView.$chats.prepend(MessageView.render({username: msg.username, text: msg.text}));
  }
};