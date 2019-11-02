var RoomsView = {

  $button: $('#rooms button'),
  $roomInput: $('#room'),
  $select: $('#rooms select'),
  $options: $('.optionclass'),

  initialize: function() {
    RoomsView.$button.on('click', function() {
      if (!Rooms[RoomsView.$roomInput.val()]) { // if the rooms obj doesn't have this roomname
        Rooms[RoomsView.$roomInput.val()] = 1; // populate the rooms obj with the roomname
        RoomsView.renderRoom(RoomsView.$roomInput.val());
      }
      RoomsView.$roomInput.val('');
    });
  },

  includedInSelect: [],

  renderRoom: function(roomname) {
    if (!RoomsView.includedInSelect.includes(roomname)) {
      RoomsView.includedInSelect.push(roomname);
      RoomsView.$select.prepend(RoomsView.render({roomname: roomname}));
    }
  },

  // adds options to our room dropdown
  render: _.template(`

    <option class='optionclass' value="#"><%= roomname %></option>

  `)

};
