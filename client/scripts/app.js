// jshint esversion:6
var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  previousLastIndex: 0,

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:

      // iterate through data.results
      // if our rooms obj does not have data.results[i].roomname
      // add key-val pair i: roomname

      // console.log(data);
      for (let i = App.previousLastIndex; i < data.results.length; i++) {
        // debugger;
        if (!Rooms[data.results[i]['roomname']]) {
          Rooms[data.results[i]['roomname']] = 1;
        }
      }
      // console.log(Rooms);
      for (let i = App.previousLastIndex; i < data.results.length; i++) {
        // debugger;
        if (!Messages[data.results[i]['roomname']]) {
          Messages[data.results[i]['roomname']] = [];
        }
        Messages[data.results[i]['roomname']].push({
          username: data.results[i]['username'],
          text: data.results[i]['text'],
          roomname: data.results[i]['roomname']
        });
      }
      // console.log(Messages);
      for (let i = App.previousLastIndex; i < data.results.length; i++) {
        MessagesView.renderMessage(data.results[i]);
      }

      App.previousLastIndex = data.results.length;

      for (let i = 0; i < Object.keys(Rooms).length; i++) {

        RoomsView.renderRoom(Object.keys(Rooms)[i]);
      }
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
