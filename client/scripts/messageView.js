var MessageView = {
  render: _.template(`
      <div class="chat">
        <div class='<%- roomname %>'></div>
        <div class="username"><%- username %></div>
        <div><%- text %></div>
      </div>
    `),

  friendRender: _.template(`
  <div class="chat">
    <div class='<%- roomname %>'></div>
    <div class="username"><%- username %></div>
    <div><strong><%- text %></strong></div>
  </div>
`)
};