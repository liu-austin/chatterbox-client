var RoomsView = {

  $button: $('#rooms button'),
  $roomInput: $('#room'),
  $select: $('#rooms select'),
  $options: $('.optionclass'),

  initialize: function () {

    RoomsView.$select.on('change', function () {
      RoomsView.selectedRoom = $(this).children('option:selected').val();
      App.showAll = false;
      App.previousLastIndexForRoom = 0;
      MessagesView.$chats.empty();
    });

    RoomsView.$button.on('click', function () {
      Rooms.add();
    });
  },

  selectedRoom: null,

  includedInSelect: [],

  renderRoom: function (roomname) {
    if (!RoomsView.includedInSelect.includes(roomname)) {
      RoomsView.includedInSelect.push(roomname);
      RoomsView.$select.prepend(RoomsView.render({ roomname: roomname }));
    }
  },

  // adds options to our room dropdown
  render: _.template(`

    <option class='optionclass' value="<%= roomname %>"><%= roomname %></option>

  `)

};
