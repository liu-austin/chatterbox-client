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
      if (App.showAll) {
        for (let j = App.previousLastIndex; j < data.results.length; j++) {
          MessagesView.renderMessage(data.results[j]);
          $('.chat:nth-child(' + j + ')').on('click', function() {
            for (let k = 0; k < data.results.length; k++) {
              if ($('.chat:nth-child(' + j + ') div:nth-child(2)').html() === $('.chat:nth-child(' + k + ') div:nth-child(2)').html()) {
                $('.chat:nth-child(' + k + ')').addClass('friend');
              }
            }
            // $('.chat:nth-child(' + j + ')').addClass('friend');
            console.log($('.chat:nth-child(' + j + ') div:nth-child(2)').html());

            // }
          });
        }
      } else {
        if (Messages[RoomsView.selectedRoom]) {
          for (let i = App.previousLastIndexForRoom; i < Messages[RoomsView.selectedRoom].length; i++) {
            MessagesView.renderMessage(Messages[RoomsView.selectedRoom][i]);
            $('.chat:nth-child(' + i + ')').on('click', function() {
              for (let k = 0; k < Messages[RoomsView.selectedRoom].length; k++) {
                if ($('.chat:nth-child(' + j + ') div:nth-child(2)').html() === $('.chat:nth-child(' + k + ') div:nth-child(2)').html()) {
                  $('.chat:nth-child(' + k + ')').addClass('friend');
                }
              }
              // $('.chat:nth-child(' + j + ')').addClass('friend');
              console.log($('.chat:nth-child(' + j + ') div:nth-child(2)').html());

            });
          }
          App.previousLastIndexForRoom = Messages[RoomsView.selectedRoom].length;
        }
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
  },

  showAll: true,

  previousLastIndexForRoom: 0
};
