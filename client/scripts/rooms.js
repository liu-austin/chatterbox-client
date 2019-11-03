var Rooms = {
  add: function() {
    if (!Rooms[RoomsView.$roomInput.val()]) { // if the rooms obj doesn't have this roomname
      Rooms[RoomsView.$roomInput.val()] = 1; // populate the rooms obj with the roomname
      RoomsView.renderRoom(RoomsView.$roomInput.val());
    }
    RoomsView.$roomInput.val('');
  }
};